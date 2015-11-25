using System.Web;
using System.Web.Optimization;

namespace TrainTicketsBooking.Web
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/epg").Include(
                        "~/Scripts/jquery.epg.js"));

            bundles.Add(new ScriptBundle("~/bundles/wysihtml5").Include(
                "~/Content/themes/sean/wysihtml5-0.3.0.js",
                "~/Content/themes/sean/bootstrap-wysihtml5.js"));

            bundles.Add(new ScriptBundle("~/bundles/themes/sean/crossbrowserjs").Include(
                "~/Content/themes/sean/crossbrowserjs/html5shiv.js",
                "~/Content/themes/sean/crossbrowserjs/respond.js",
                "~/Content/themes/sean/crossbrowserjs/excanvas.js"));

            bundles.Add(new ScriptBundle("~/bundles/themes/sean/js").Include(
                        "~/Content/themes/sean/jquery-1.8.2.js",
                        "~/Content/themes/sean/jquery-ui.js",
                        "~/Content/themes/sean/bootstrap.js",

                        //"~/Content/themes/sean/dashboard-v2.js",
                        "~/Content/themes/sean/jquery.gritter.js",
                        "~/Content/themes/sean/jquery.slimscroll.js",
                        "~/Content/themes/sean/morris.js",
                        "~/Content/themes/sean/raphael.js",
                        
                        "~/Content/themes/sean/apps.js"));

            // 使用要用于开发和学习的 Modernizr 的开发版本。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new StyleBundle("~/Content/themes/sean/css").Include(
                        "~/Content/themes/sean/jquery-ui.css",
                        "~/Content/themes/sean/bootstrap.css",
                        "~/Content/themes/sean/font-awesome/css/font-awesome.css",
                        "~/Content/themes/sean/animate.css",
                        "~/Content/themes/sean/style.css",
                        "~/Content/themes/sean/style-responsive.css",
                        "~/Content/themes/sean/default.css",
                        "~/Content/themes/sean/jquery.gritter.css"));

            bundles.Add(new ScriptBundle("~/bundles/themes/frontend/js").Include(
                        "~/Content/themes/sean/jquery-1.8.2.js",
                        "~/Content/themes/sean/jquery-ui.js",
                        "~/Content/themes/sean/bootstrap.js",
                        "~/Content/themes/frontend/scrollMonitor.js",
                        "~/Content/themes/frontend/jquery.gritter.js",
                        "~/Content/themes/frontend/apps.js"));

            bundles.Add(new StyleBundle("~/Content/themes/frontend/css").Include(
                        "~/Content/themes/sean/jquery-ui.css",
                        "~/Content/themes/sean/bootstrap.css",
                        "~/Content/themes/sean/font-awesome/css/font-awesome.css",
                        "~/Content/themes/frontend/animate.css",
                        "~/Content/themes/frontend/style.css",
                        "~/Content/themes/frontend/style-responsive.css",
                        "~/Content/themes/frontend/default.css",
                        "~/Content/themes/frontend/jquery.gritter.css"));

            bundles.Add(new StyleBundle("~/Content/Render").Include("~/Content/Render.css"));

            // flot
            //bundles.Add(new ScriptBundle("~/bundles/chart/js").Include(
            //            "~/Content/flot/jquery.flot.js",
            //            "~/Content/flot/jquery.flot.stack.js",
            //            "~/Content/flot/jquery.flot.categories.js",
            //            "~/Content/flot/jquery.flot.resize.js",
            //            "~/Content/flot/jquery.flot.pie.js"));

            // highcharts
            bundles.Add(new ScriptBundle("~/bundles/chart/js").Include(
                        "~/Content/highcharts/highcharts.js",
                        "~/Content/highcharts/highcharts-3d.js"));

            // file upload

            bundles.Add(new StyleBundle("~/Content/fileupload/css").Include(
                        "~/Content/file-upload/css/jquery.fileupload.css",
                        "~/Content/file-upload/css/jquery.fileupload-ui.css"));

            bundles.Add(new ScriptBundle("~/bundles/fileupload/js").Include(
                        "~/Content/file-upload/js/vendor/jquery.ui.widget.js",
                        "~/Content/file-upload/js/vendor/tmpl.js",
                        "~/Content/file-upload/js/vendor/load-image.js",
                        "~/Content/file-upload/js/vendor/canvas-to-blob.js",
                        "~/Content/file-upload/js/vendor/jquery.blueimp-gallery.js",
                        
                        "~/Content/file-upload/js/jquery.iframe-transport.js",
                        "~/Content/file-upload/js/jquery.fileupload.js",
                        "~/Content/file-upload/js/jquery.fileupload-process.js",
                        "~/Content/file-upload/js/jquery.fileupload-image.js",
                        "~/Content/file-upload/js/jquery.fileupload-audio.js",
                        "~/Content/file-upload/js/jquery.fileupload-video.js",
                        "~/Content/file-upload/js/jquery.fileupload-validate.js",
                        "~/Content/file-upload/js/jquery.fileupload-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/hen/js").Include(
                        "~/Content/hen/image.js",
                        "~/Content/hen/video.js",
                        "~/Content/hen/contextMenu.js",
                        "~/Content/hen/js/jquery.contextmenu.r2.packed.js",
                        "~/Content/hen/js/jquery-migrate-1.1.0.js"));
        }
    }
}