using JoddbTaskLujainAlazzam.Controllers;
using System.Web;
using System.Web.Optimization;

namespace JoddbTaskLujainAlazzam
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap.css",
                        "~/Content/site.css",
                         "~/Content/css/sidebar.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/app/app.js",
                        "~/Scripts/app/controllers/LoginController.js",
                        "~/Scripts/app/controllers/HomeController.js",
                       "~/Scripts/app/controllers/UserListController.js",
                         "~/Scripts/app/controllers/UserService .js",
                         "~/Scripts/app/controllers/AddUserController.js",
                         "~/ Scripts / app / controllers / UserImportController.js"


                 ));

            BundleTable.EnableOptimizations = false;
        }
    }
}
