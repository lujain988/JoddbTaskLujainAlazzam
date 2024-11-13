using JoddbTaskLujainAlazzam.Models;
using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace JoddbTaskLujainAlazzam.Controllers
{
    public class UserListController : Controller
    {
        private UserManagementDBEntities db = new UserManagementDBEntities();  // Database context
        [HttpGet]
        public async Task<ActionResult> UserList(int pageNumber = 1, int pageSize = 100)
        {
            try
            {
                // Calculate the number of records to skip
                var skip = (pageNumber - 1) * pageSize;

                // Fetch users for the specified page
                var pagedUsers = await db.Users
                    .OrderBy(u => u.Id) // Ensure consistent ordering
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();

                // Calculate total number of pages
                var totalRecords = await db.Users.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                return Json(new
                {
                    success = true,
                    data = pagedUsers,
                    pageInfo = new
                    {
                        pageNumber,
                        pageSize,
                        totalPages,
                        totalRecords
                    }
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred while retrieving the user list." }, JsonRequestBehavior.AllowGet);
            }
        }



        // POST: AddUser
        [HttpPost]
        public ActionResult AddUser(User user, HttpPostedFileBase PhotoPath)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (PhotoPath != null && PhotoPath.ContentLength > 0)
                    {
                        var imagesFolderPath = Server.MapPath("~/Content/Images");

                        // Ensure the images folder exists
                        if (!Directory.Exists(imagesFolderPath))
                        {
                            Directory.CreateDirectory(imagesFolderPath);
                        }

                        // Generate a unique filename to avoid overwrites
                        var fileName = Path.GetFileName(PhotoPath.FileName);
                        var filePath = Path.Combine(imagesFolderPath, fileName);
                        PhotoPath.SaveAs(filePath);

                        // Store the relative path to the image
                        user.PhotoPath = Path.Combine("Content/Images", fileName);
                    }
                    else
                    {
                        // For Excel-imported users without a photo, set a default image
                        user.PhotoPath = "Content/Images/default-profile.png";
                    }

                    db.Users.Add(user);
                    db.SaveChanges();

                    return Json(new { success = true, message = "User added successfully!" });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, message = "An error occurred while adding the user." });
                }
            }

            return Json(new { success = false, message = "Invalid data." });
        }
    }
}
