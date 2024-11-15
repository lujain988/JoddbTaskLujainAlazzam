using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using JoddbTaskLujainAlazzam.Models;
using OfficeOpenXml;

namespace YourNamespace.Controllers
{
    public class UserImportController : Controller
    {
        private readonly string entityFrameworkConnectionString = ConfigurationManager.ConnectionStrings["UserManagementDBEntities"].ConnectionString;

   

        [HttpPost]
        public ActionResult ImportUsers(HttpPostedFileBase excelFile)
        {
            if (excelFile == null || excelFile.ContentLength == 0)
            {
                return Json(new { success = false, message = "No file selected." });
            }

            try
            {
                if (!excelFile.FileName.EndsWith(".xlsx"))
                {
                    return Json(new { success = false, message = "Please upload a valid Excel file." });
                }

                var usersToAdd = new List<User>();
                using (var package = new ExcelPackage(excelFile.InputStream))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    for (int row = 2; row <= worksheet.Dimension.End.Row; row++)
                    {
                        // Read and validate data
                        string name = worksheet.Cells[row, 2].Text.Trim();
                        string email = worksheet.Cells[row, 3].Text.Trim();
                        string mobileNo = worksheet.Cells[row, 4].Text.Trim();

                        // Truncate name and email if they exceed limits
                        name = name.Length > 50 ? name.Substring(0, 50) : name;
                        email = email.Length > 100 ? email.Substring(0, 100) : email;

                        // Validate MobileNo
                        if (!IsValidMobileNumber(mobileNo))
                        {
                            // Skip invalid mobile numbers
                            continue;
                        }

                        // Create user instance
                        var user = new User
                        {
                            Name = name,
                            Email = email,
                            MobileNumber = mobileNo,
                            Password = GenerateRandomPassword(),
                            PhotoPath = ""
                        };

                        usersToAdd.Add(user);

                        if (usersToAdd.Count == 1000)
                        {
                            BulkInsert(usersToAdd);
                            usersToAdd.Clear();
                        }
                    }

                    if (usersToAdd.Any())
                    {
                        BulkInsert(usersToAdd);
                    }
                }

                return Json(new { success = true, message = "Users imported successfully." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred during the import: " + ex.Message });
            }
        }

        private void BulkInsert(List<User> users)
        {
            var sqlConnectionString = ExtractSqlConnectionString(entityFrameworkConnectionString);
            var dataTable = ConvertToDataTable(users);

            using (var sqlBulkCopy = new SqlBulkCopy(sqlConnectionString))
            {
                sqlBulkCopy.DestinationTableName = "Users";
                sqlBulkCopy.ColumnMappings.Add("Name", "Name");
                sqlBulkCopy.ColumnMappings.Add("Email", "Email");
                sqlBulkCopy.ColumnMappings.Add("MobileNumber", "MobileNumber");
                sqlBulkCopy.ColumnMappings.Add("Password", "Password");
                sqlBulkCopy.ColumnMappings.Add("PhotoPath", "PhotoPath");

                sqlBulkCopy.WriteToServer(dataTable);
            }
        }

        private string ExtractSqlConnectionString(string entityFrameworkConnectionString)
        {
            var efConnection = new EntityConnectionStringBuilder(entityFrameworkConnectionString);
            return efConnection.ProviderConnectionString;
        }

        private DataTable ConvertToDataTable(List<User> users)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("Name", typeof(string));
            dataTable.Columns.Add("Email", typeof(string));
            dataTable.Columns.Add("MobileNumber", typeof(string));
            dataTable.Columns.Add("Password", typeof(string));
            dataTable.Columns.Add("PhotoPath", typeof(string));

            foreach (var user in users)
            {
                dataTable.Rows.Add(user.Name, user.Email, user.MobileNumber, user.Password, user.PhotoPath);
            }

            return dataTable;
        }

        private string GenerateRandomPassword()
        {
            var length = 8;
            var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
            var random = new Random();
            return new string(Enumerable.Repeat(validChars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

 
        private bool IsValidMobileNumber(string mobileNo)
        {
            var regex = new Regex(@"^(\+|00)?\d{10,15}$");  
            return !string.IsNullOrEmpty(mobileNo) && regex.IsMatch(mobileNo);
        }
    }
}
