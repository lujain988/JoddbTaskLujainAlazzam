using JoddbTaskLujainAlazzam.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace JoddbTaskLujainAlazzam.Controllers
{
    public class AccountController : Controller
    {
        private UserManagementDBEntities db = new UserManagementDBEntities();

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            var user = db.Users.FirstOrDefault(u => u.Email == username && u.Password == password);
            if (user != null)
            {
                Session["UserId"] = user.Id;
                return Json(new { success = true, message = "Login successful" });
            }
            return Json(new { success = false, message = "Invalid username or password" });
        }

        [HttpGet]
        public JsonResult Logout()
        {
            try
            {
                Session.Clear();
                return Json(new { success = true, message = "Logged out successfully" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error during logout: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult CheckLogin()
        {
            bool isLoggedIn = Session["UserId"] != null;
            return Json(new { isLoggedIn = isLoggedIn }, JsonRequestBehavior.AllowGet);
        }
    }
}
