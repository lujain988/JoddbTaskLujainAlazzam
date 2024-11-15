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
        private UserManagementDBEntities db = new UserManagementDBEntities(); 
        [HttpGet]
        public async Task<ActionResult> UserList(int pageNumber = 1, int pageSize = 100)
        {
            try
            {
              
                var skip = (pageNumber - 1) * pageSize;

               
                var pagedUsers = await db.Users
                    .OrderBy(u => u.Id) 
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();

              
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

                        if (!Directory.Exists(imagesFolderPath))
                        {
                            Directory.CreateDirectory(imagesFolderPath);
                        }

                        var fileName = Path.GetFileName(PhotoPath.FileName);
                        var filePath = Path.Combine(imagesFolderPath, fileName);
                        PhotoPath.SaveAs(filePath);

                        user.PhotoPath = Path.Combine("Content/Images", fileName); 
                    }
                    else
                    {
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
