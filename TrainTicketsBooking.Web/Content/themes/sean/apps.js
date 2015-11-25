/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.2.0
Version: 1.4.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v1.4/
*/var handleSlimScroll=function(){"use strict";$("[data-scrollbar=true]").each(function(){generateSlimScroll($(this))})};var generateSlimScroll=function(e){var t=$(e).attr("data-height");t=!t?$(e).height():t;var n={height:t,alwaysVisible:true};if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){n.wheelStep=1;n.touchScrollStep=100}$(e).slimScroll(n)};var handleSidebarMenu=function(){"use strict";$(".sidebar .nav > .has-sub > a").click(function(){var e=$(this).next(".sub-menu");var t=".sidebar .nav > li.has-sub > .sub-menu";if($(".page-sidebar-minified").length===0){$(t).not(e).slideUp(250);$(e).slideToggle(250)}});$(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function(){if($(".page-sidebar-minified").length===0){var e=$(this).next(".sub-menu");$(e).slideToggle(250)}})};var handleMobileSidebarToggle=function(){var e=false;$(".sidebar").on("click touchstart",function(t){if($(t.target).closest(".sidebar").length!==0){e=true}else{e=false;t.stopPropagation()}});$(document).on("click touchstart",function(t){if($(t.target).closest(".sidebar").length===0){e=false}if(!t.isPropagationStopped()&&e!==true){if($("#page-container").hasClass("page-sidebar-toggled")){$("#page-container").removeClass("page-sidebar-toggled")}if($(window).width()<979){if($("#page-container").hasClass("page-with-two-sidebar")){$("#page-container").removeClass("page-right-sidebar-toggled")}}}});$("[data-click=right-sidebar-toggled]").click(function(e){e.stopPropagation();var t="#page-container";var n="page-right-sidebar-collapsed";n=$(window).width()<979?"page-right-sidebar-toggled":n;if($(t).hasClass(n)){$(t).removeClass(n)}else{$(t).addClass(n)}if($(window).width()<480){$("#page-container").removeClass("page-sidebar-toggled")}});$("[data-click=sidebar-toggled]").click(function(e){e.stopPropagation();var t="page-sidebar-toggled";var n="#page-container";if($(n).hasClass(t)){$(n).removeClass(t)}else{$(n).addClass(t)}if($(window).width()<480){$("#page-container").removeClass("page-right-sidebar-toggled")}})};var handleSidebarMinify=function(){$("[data-click=sidebar-minify]").click(function(e){e.preventDefault();var t="page-sidebar-minified";var n="#page-container";if($(n).hasClass(t)){$(n).removeClass(t);if($(n).hasClass("page-sidebar-fixed")){generateSlimScroll($('#sidebar [data-scrollbar="true"]'))}}else{$(n).addClass(t);if($(n).hasClass("page-sidebar-fixed")){$('#sidebar [data-scrollbar="true"]').slimScroll({destroy:true});$('#sidebar [data-scrollbar="true"]').removeAttr("style")}$("#sidebar [data-scrollbar=true]").trigger("mouseover")}$(window).trigger("resize")})};var handlePageContentView=function(){"use strict";$.when($("#page-loader").addClass("hide")).done(function(){$("#page-container").addClass("in")})};var handlePanelAction=function(){"use strict";$("[data-click=panel-remove]").hover(function(){$(this).tooltip({title:"Remove",placement:"bottom",trigger:"hover",container:"body"});$(this).tooltip("show")});$("[data-click=panel-remove]").click(function(e){e.preventDefault();$(this).tooltip("destroy");$(this).closest(".panel").remove()});$("[data-click=panel-collapse]").hover(function(){$(this).tooltip({title:"Collapse / Expand",placement:"bottom",trigger:"hover",container:"body"});$(this).tooltip("show")});$("[data-click=panel-collapse]").click(function(e){e.preventDefault();$(this).closest(".panel").find(".panel-body").slideToggle()});$("[data-click=panel-reload]").hover(function(){$(this).tooltip({title:"Reload",placement:"bottom",trigger:"hover",container:"body"});$(this).tooltip("show")});$("[data-click=panel-reload]").click(function(e){e.preventDefault();var t=$(this).closest(".panel");if(!$(t).hasClass("panel-loading")){var n=$(t).find(".panel-body");var r='<div class="panel-loader"><span class="spinner-small"></span></div>';$(t).addClass("panel-loading");$(n).prepend(r);setTimeout(function(){$(t).removeClass("panel-loading");$(t).find(".panel-loader").remove()},2e3)}});$("[data-click=panel-expand]").hover(function(){$(this).tooltip({title:"Expand / Compress",placement:"bottom",trigger:"hover",container:"body"});$(this).tooltip("show")});$("[data-click=panel-expand]").click(function(e){e.preventDefault();var t=$(this).closest(".panel");if($("body").hasClass("panel-expand")&&$(t).hasClass("panel-expand")){$("body, .panel").removeClass("panel-expand");$(".panel").removeAttr("style");$("[class*=col]").sortable("enable")}else{$("body").addClass("panel-expand");$(this).closest(".panel").addClass("panel-expand");$("[class*=col]").sortable("disable")}$(window).trigger("resize")})};var handleDraggablePanel=function(){"use strict";var e="[class*=col]";var t=".panel-heading";var n=".row > [class*=col]";$(e).sortable({handle:t,connectWith:n})};var handelTooltipPopoverActivation=function(){"use strict";$("[data-toggle=tooltip]").tooltip();$("[data-toggle=popover]").popover()};var handleScrollToTopButton=function(){"use strict";$(document).scroll(function(){var e=$(document).scrollTop();if(e>=200){$("[data-click=scroll-top]").addClass("in")}else{$("[data-click=scroll-top]").removeClass("in")}});$("[data-click=scroll-top]").click(function(e){e.preventDefault();$("html, body").animate({scrollTop:$("body").offset().top},500)})};var handleThemePageStructureControl=function(){if($.cookie&&$.cookie("theme")){if($(".theme-list").length!==0){$(".theme-list [data-theme]").closest("li").removeClass("active");$('.theme-list [data-theme="'+$.cookie("theme")+'"]').closest("li").addClass("active")}var e="assets/css/theme/"+$.cookie("theme")+".css";$("#theme").attr("href",e)}if($.cookie&&$.cookie("sidebar-styling")){if($(".sidebar").length!==0&&$.cookie("sidebar-styling")=="grid"){$(".sidebar").addClass("sidebar-grid");$('[name=sidebar-styling] option[value="2"]').prop("selected",true)}}if($.cookie&&$.cookie("header-styling")){if($(".header").length!==0&&$.cookie("header-styling")=="navbar-inverse"){$(".header").addClass("navbar-inverse");$('[name=header-styling] option[value="2"]').prop("selected",true)}}$(".theme-list [data-theme]").live("click",function(){var e="assets/css/theme/"+$(this).attr("data-theme")+".css";$("#theme").attr("href",e);$(".theme-list [data-theme]").not(this).closest("li").removeClass("active");$(this).closest("li").addClass("active");$.cookie("theme",$(this).attr("data-theme"))});$(".theme-panel [name=header-styling]").live("change",function(){var e=$(this).val()==1?"navbar-default":"navbar-inverse";var t=$(this).val()==1?"navbar-inverse":"navbar-default";$("#header").removeClass(t).addClass(e);$.cookie("header-styling",e)});$(".theme-panel [name=sidebar-styling]").live("change",function(){if($(this).val()==2){$("#sidebar").addClass("sidebar-grid");$.cookie("sidebar-styling","grid")}else{$("#sidebar").removeClass("sidebar-grid");$.cookie("sidebar-styling","default")}});$(".theme-panel [name=sidebar-fixed]").live("change",function(){if($(this).val()==1){if($(".theme-panel [name=header-fixed]").val()==2){alert("Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.");$('.theme-panel [name=header-fixed] option[value="1"]').prop("selected",true);$("#header").addClass("navbar-fixed-top");$("#page-container").addClass("page-header-fixed")}$("#page-container").addClass("page-sidebar-fixed");if(!$("#page-container").hasClass("page-sidebar-minified")){generateSlimScroll($('.sidebar [data-scrollbar="true"]'))}}else{$("#page-container").removeClass("page-sidebar-fixed");if($(".sidebar .slimScrollDiv").length!==0){if($(window).width()<=979){$(".sidebar").each(function(){if(!($("#page-container").hasClass("page-with-two-sidebar")&&$(this).hasClass("sidebar-right"))){$(this).find(".slimScrollBar").remove();$(this).find(".slimScrollRail").remove();$(this).find('[data-scrollbar="true"]').removeAttr("style");var e=$(this).find('[data-scrollbar="true"]').parent();var t=$(e).html();$(e).replaceWith(t)}})}else if($(window).width()>979){$('.sidebar [data-scrollbar="true"]').slimScroll({destroy:true});$('.sidebar [data-scrollbar="true"]').removeAttr("style")}}if($("#page-container .sidebar-bg").length===0){$("#page-container").append('<div class="sidebar-bg"></div>')}}});$(".theme-panel [name=header-fixed]").live("change",function(){if($(this).val()==1){$("#header").addClass("navbar-fixed-top");$("#page-container").addClass("page-header-fixed");$.cookie("header-fixed",true)}else{if($(".theme-panel [name=sidebar-fixed]").val()==1){alert("Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.");$('.theme-panel [name=sidebar-fixed] option[value="2"]').prop("selected",true);$("#page-container").removeClass("page-sidebar-fixed");if($("#page-container .sidebar-bg").length===0){$("#page-container").append('<div class="sidebar-bg"></div>')}}$("#header").removeClass("navbar-fixed-top");$("#page-container").removeClass("page-header-fixed");$.cookie("header-fixed",false)}})};var handleThemePanelExpand=function(){$('[data-click="theme-panel-expand"]').live("click",function(){var e=".theme-panel";var t="active";if($(e).hasClass(t)){$(e).removeClass(t)}else{$(e).addClass(t)}})};var handleAfterPageLoadAddClass=function(){if($("[data-pageload-addclass]").length!==0){$(window).load(function(){$("[data-pageload-addclass]").each(function(){var e=$(this).attr("data-pageload-addclass");$(this).addClass(e)})})}};var App=function(){"use strict";return{init:function(){handleSlimScroll();handleSidebarMenu();handleMobileSidebarToggle();handleSidebarMinify();handleThemePageStructureControl();handleThemePanelExpand();handleAfterPageLoadAddClass();handlePanelAction();handleDraggablePanel();handelTooltipPopoverActivation();handleScrollToTopButton();handlePageContentView()}}}()