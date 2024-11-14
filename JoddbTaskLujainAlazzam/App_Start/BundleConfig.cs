using JoddbTaskLujainAlazzam.Controllers;
using System.Web;
using System.Web.Optimization;

namespace JoddbTaskLujainAlazzam
{
    public class BundleConfig
    {
        // Registering bundles
        public static void RegisterBundles(BundleCollection bundles)
        {
            // jQuery bundle
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // jQuery validation bundle
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Modernizr bundle
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            // Bootstrap JavaScript bundle
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js"));

            // Bootstrap CSS and site CSS bundle
            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap.css",
                        "~/Content/site.css",
                         "~/Content/css/sidebar.css"));

            // AngularJS bundle
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular.min.js",
                        "~/Scripts/angular-route.min.js"));

            // AngularJS Application Scripts
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/app/app.js",
                        "~/Scripts/app/controllers/LoginController.js",
                        "~/Scripts/app/controllers/HomeController.js",
                       "~/Scripts/app/controllers/UserListController.js",
                         "~/Scripts/app/controllers/UserService .js",
                         "~/Scripts/app/controllers/AddUserController.js",
                         "~/ Scripts / app / controllers / UserImportController.js"


                 // Add any other controllers or services here
                 ));

            // Disable optimizations for debugging
            BundleTable.EnableOptimizations = false;
        }
    }
}
