using JoddbTaskLujainAlazzam.Models;
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
    

    }
}