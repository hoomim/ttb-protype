/**
 * Created by ThinkTwice on 2015/7/18.
 */

$(document).ready(function(){

    var currentZoom = 1;
    $('.sub_container').contextMenu('containerMenu',
        {
            bindings:
            {
                'screen_zoomIn': function(t) {
                    $('.screen').animate({ 'zoom': currentZoom += .1 }, 'slow');
                },
                'screen_zoomOut': function(t) {
                    $('.screen').animate({ 'zoom': currentZoom -= .1 }, 'slow');
                },
                'save': function(t) {
                    alert('Trigger was '+t.id+'\nAction was Save');
                },
                'delete': function(t) {
                    alert('Trigger was '+t.id+'\nAction was Delete');
                }
            }

        });


    var screen_text = "<div class='screen_text'>我是文本</div>"
    $("#addText").click(function(){
        $(screen_text).appendTo(".screen");
        $(".screen_text").draggable({ containment: "parent" ,cursor: "move"});
        $(".screen_text").resizable({containment: "parent"});

    });


    // let the gallery items be draggable
    //$("img", ".thumbnail").draggable({
    //    revert: "invalid", // when not dropped, the item will revert back to its initial position
    //    containment: "document",
    //    helper: "clone",
    //    cursor: "move"
    //});
    //$("video", ".thumbnail").draggable({
    //    revert: "invalid", // when not dropped, the item will revert back to its initial position
    //    containment: "document",
    //    helper: "clone",
    //    cursor: "move"
    //});

    // let the trash be droppable, accepting the gallery items
    $("section").droppable({
        accept: "*",
        /*activeClass: "ui-state-highlight",*/
        drop: function( event, ui ) {
            dropImage($( this ), ui.draggable );
        }
    });
    /*// let the gallery be droppable as well, accepting items from the trash
    $("#gallery").droppable({
        accept: "section img",
        activeClass: "custom-state-active",
        drop: function( event, ui ) {
            recycleImage( ui.draggable );
        }
    });*/

    $("section").find("img").live('click',function(){
        $(".theme-panel").css("display", "none");
        $(".imagetool").css("display","block");
        selectedImg = $(this);
        $("section").css({"border":"none","border-bottom":"1px solid darkgray"});
        $(this).closest("section").css("border", "solid 4px #00acac ");
    });
    $("section").find("video").live('click',function(){
        $(".theme-panel").css("display", "none");
        $(".videotool").css("display","block");
        selectedVideo = $(this);
        $("section").css({ "border": "none", "border-bottom": "1px solid darkgray" });
        $(this).closest("section").css("border", "solid 4px #00acac ");
    });



});


/**
 * 拖动image放下后 触发
 * @param $item
 */
function dropImage(section, $item ) {

           var cloneitem =  $item.clone();
           section.html(cloneitem);

           var videoPatrn = /^video/g;
           if (videoPatrn.exec(cloneitem)) {
               selectedVideo = cloneitem;
           }
           else {
               selectedImg = cloneitem;
           }

           $("section").css({ "border": "none", "border-bottom": "1px solid darkgray" });
           section.css("border", "solid 4px #00acac ");

           section.attr("mediaId", cloneitem.attr("media"));
             cloneitem.removeClass().animate({ width: "100%" })
        .animate({ height: "100%" });
}



/**
 * 切换图片选择方式
 * @param item
 */
function changeImageStyle(item){
    var value = $(item).val();
    if(value=="0"){
       image.layoutFull();
    }
    if(value=="1"){
       image.layoutHeight();
    }
    if(value=="2"){
       image.layoutWidth();
    }
}
function changeVideoStyle(item){
    var value = $(item).val();
    if(value=="1"){
        video.layoutHeight();
    }
    if(value=="2"){
        video.layoutWidth();
    }
}
function showanimatetool(){

}

/**
 * 更改图像动画
 * @param item  动画下拉框
 */
function changeImageAnimate(item){
    var value = $(item).val();
    selectedImg.removeClass();
    var imageduration = $("#imageduration").val();
    var imagedelay = $("#imagedelay").val();
    //var imagecount = $("#imagecount").val();
    image.addAnimate(value,imageduration,imagedelay,1);
    image.play();
}
function changeVideoAnimate(item){
    var value = $(item).val();
    selectedVideo.removeClass();
    var imageduration = $("#videoduration").val();
    var imagedelay = $("#videodelay").val();
    var videocount = $("#videocount").val();
    //video.addAnimate(value,imageduration,imagedelay,videocount);
    //video.reload();
}

function zoominScreen(){
    $(".screen").height($(".screen").height()*1.2);
    $(".screen").width($(".screen").width()*1.2);
}

function zoomoutScreen(){
    $(".screen").height($(".screen").height()*0.9);
    $(".screen").width($(".screen").width()*0.9);
}

function deleteScreen(){
    if(window.confirm("确定清除重来？")){
        $("#screen").find("section").html("");
    }
}
function preview(){
    $("#myModal").modal("show");
    var html = $("#screen").parent().html();
    $(html).find("section").css("border","0");
    $('#previewcontent').html(html);

}