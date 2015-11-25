/**
 * Created by ThinkTwice on 2015/7/27.
 */
var selectedImg;

var image = {

    layoutFull:function(){
        selectedImg.css("width","100%");
        selectedImg.css("height","100%");
    },
    layoutHeight:function(){
        selectedImg.css("width","auto");
        selectedImg.css("height","100%");
    },
    layoutWidth:function(){
        selectedImg.css("width","100%");
        selectedImg.css("height","auto");
    },
    /**
     * reload以显示动画效果
     */
    reload:function(){
        var section = selectedImg.parent();
        section.html("");
        selectedImg.appendTo(section);
    },
    addAnimate:function(value,duriation,delay,time){
        //selectedImg.addClass('animated ');
        //selectedImg.addClass(value);

        selectedImg.attr("animated", value);

        console.log("duriation",duriation);
        console.log("delay",delay);
        //console.log("time",time);

        selectedImg.css("-webkit-animation-duration",""+duriation+"s");
        selectedImg.css("-webkit-animation-delay",""+delay+"s");
        //selectedImg.css("-webkit-animation-iteration-count",time);
        selectedImg.css("-moz-animation-duration",""+duriation+"s");
        selectedImg.css("-moz-animation-delay",""+delay+"s");
        //selectedImg.css("-moz-animation-iteration-count",time);
    },
    play: function () {
        var x = selectedImg.attr("animated");
        selectedImg.removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
},

};