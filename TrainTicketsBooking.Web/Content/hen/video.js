/**
 * Created by ThinkTwice on 2015/7/28.
 */

/**
 * Created by ThinkTwice on 2015/7/27.
 */
var selectedVideo;

var video = {

    layoutHeight:function(){
        var section = selectedVideo.parent();
        section.html("");
        selectedVideo.css("width","auto");
        selectedVideo.css("height","100%");
        selectedVideo.appendTo(section);
    },
    layoutWidth:function(){
        var section = selectedVideo.parent();
        section.html("");
        selectedVideo.css("width","100%");
        selectedVideo.css("height","auto");
        selectedVideo.appendTo(section);
    },
    /**
     * reload以显示动画效果
     */
    reload:function(){
        var section = selectedVideo.parent();
        section.html("");
        selectedVideo.appendTo(section);

    },
    addAnimate:function(value,duriation,delay,time){
        selectedVideo.addClass('animated ');
        selectedVideo.addClass(value);
        console.log("duriation",duriation);
        console.log("delay",delay);
        console.log("time",time);

        selectedImg.css("-webkit-animation-duration",""+duriation+"s");
        selectedImg.css("-webkit-animation-delay",""+delay+"s");
        selectedImg.css("-webkit-animation-iteration-count",time);
        selectedVideo.css("-moz-animation-duration",""+duriation+"s");
        selectedVideo.css("-moz-animation-delay",""+delay+"s");
        selectedVideo.css("-moz-animation-iteration-count",time);
    }

};
