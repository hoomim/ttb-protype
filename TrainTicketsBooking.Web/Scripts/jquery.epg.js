
//$(document).ready(function () {

    var localPrograms = undefined;
    var currentNotice = undefined;
    var currentProgram = undefined;

    var fromTerminal;
    var lasteTotalVote = {};
    var lastePromotionAmount = {};

	function formatJSONDate(dateObj) {
	    var jsonDate = "" + dateObj;
	    var milli = jsonDate.replace(/\/Date\((-?\d+)\)\//, '$1');
	    return new Date(parseInt(milli));
	}

	function getTime(timeString) {
	    var t = timeString.split(":");
	    var time = new Date();
	    time.setHours(t[0]);
	    time.setMinutes(t[1]);
	    time.setSeconds(t[2]);
	    return time;
	}

	function getNowTime() {
	    var time = new Date();
	    time.setSeconds(59);
	    return time;
	}

	function getNowDate() {
	    var time = new Date();
	    time.setHours(0);
	    time.setMinutes(0);
	    time.setSeconds(0);
	    return time;
	}

	function changeProgram() {
	    var now = new Date();

	    //if current program exist, then check
	    if (currentProgram)
	    {
	        if (formatJSONDate(currentProgram.startdate) <= getNowDate() && formatJSONDate(currentProgram.enddate) > getNowDate()) {
	            if (getTime(currentProgram.starttime) > getNowTime() || getTime(currentProgram.endtime) <= getNowTime()) {
	                //remove
	                currentProgram = undefined;
	            }
	        }
	        else {
	            //remove
	            currentProgram = undefined;
	        }
	    }

	    if(!currentProgram){
	        for (var p in localPrograms) {
	            if (formatJSONDate(localPrograms[p].startdate) <= getNowDate() && formatJSONDate(localPrograms[p].enddate) > getNowDate()) {
	                //console.debug(p + "date bingo.");
	                //console.log(getTime(localPrograms[p].starttime) + " - " + getNowTime());
	                //console.log(getTime(localPrograms[p].endtime) + " - " + getNowTime());
	                if (getTime(localPrograms[p].starttime) <= getNowTime() && getTime(localPrograms[p].endtime) > getNowTime()) {
	                    //console.debug(p + "time bingo.");
	                    
	                    //set current program
	                    currentProgram = localPrograms[p];
                        //
	                    //break;
	                }
	            }//end date if
	        }
	        
	        stopRotate();
	        $("div.carousel.slide").remove();

	        if (currentProgram != undefined) {

	           //$(currentProgram.program).find(".item").waitForImages().done(function () {
	                // All descendant images have loaded, now slide up.
	                $(currentProgram.program).appendTo("body");
	                $("div.carousel-inner .item").each(function () {
	                    if ($(this).attr("data-link") != "") {
	                        var data_link = $(this).attr("data-link");
	                        if (data_link.indexOf("http://") < 0) {
	                            data_link = "http://182.139.135.26:18079" + data_link;
	                        }
	                        $(this).find("div#code").remove();
	                        $(this).append("<div id='code'></div>");
	                        $(this).find("#code").qrcode({ width: 96, height: 96, text: data_link, correctLevel: QRErrorCorrectLevel.L })
	                    }
	                });
	                
	                resizeBg();
	                startRotate();
	            //});
	            
	        }
	    }
	}

	function poll(callback) {

	    var changed = false;
	    $.ajax({
	        type: "GET",
	        url: "/Render/Poll?ft=" + fromTerminal + "&t" + Math.random(),
	        dataType: "json",
            cache: false,
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            //textStatus: "timeout", "error", "notmodified" 和 "parsererror"
	            /*readyState:
	            0 － （未初始化）还没有调用send()方法 
	            1 － （载入）已调用send()方法，正在发送请求 
	            2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
	            3 － （交互）正在解析响应内容 
	            4 － （完成）响应内容解析完成，可以在客户端调用了*/

	            $("<div id='debug-hint'>[ " + textStatus + " : " + XMLHttpRequest.readyState + " - " + XMLHttpRequest.status + " ]</div>").appendTo("body").fadeOut(1500, function () { $(this).remove(); });
	        },
	        success: function (data) {
                //update programs
	            if (localPrograms == undefined)
	            {
	                localPrograms = data.programs;
	                changed = true;
	                //changeProgram();
	            }
	            else
	            {
	                if (data.programs) {
	                    //add new program
	                    for (var p in data.programs) {
	                        if (localPrograms[p] == undefined || localPrograms[p].key != data.programs[p].key) {
	                            localPrograms[p] = data.programs[p];
	                            //reset
	                            changed = true;
	                            //changeProgram();
	                        }
	                    }
	                    //remove old program
	                    for (var p in localPrograms) {
	                        if (data.programs[p] == undefined) {
	                            delete localPrograms[p];
	                            //reset
	                            changed = true;
	                            //changeProgram();
	                        }
	                    }
	                }
	                else {
	                    localPrograms = undefined;
	                }
	            }
	            
                // update notice
	            if (data.notice) {
	                if (currentNotice) {
	                    if (data.notice.Key != currentNotice.Key) {
	                        currentNotice = data.notice;
	                    }
	                }
	                else {
	                    currentNotice = data.notice;
	                }
	                if ($("body #notice").length < 1) {
	                    $("body").append("<div id='notice'></div>");
	                }
	                if (data.notice.Display == "1") {
	                    $("#notice").removeClass("full-notice");
	                    $("#notice").addClass("marquee-notice");
	                }
	                else {
	                    $("#notice").removeClass("marquee-notice");
	                    $("#notice").addClass("full-notice");
	                }

	                $("#notice").html(currentNotice.Content);
	            }
	            else {
	                //clear notice display
	                //reset
	                currentNotice = undefined;
	                $("#notice").remove();
	            }

	            //update survey
	            if ($("div.carousel-inner").find(".item.active #survey-payload")) {
	                var p_id = $("div.carousel-inner .item.active #survey-payload").attr("data-program-id") || "0";
	                var s_id = $("div.carousel-inner .item.active #survey-payload").attr("data-id") || "0";
	                if (data.programs[p_id] && data.programs[p_id].survey && data.programs[p_id].survey[s_id]) {
	                    var current_survey = data.programs[p_id].survey[s_id];
	                    var total_vote = current_survey.total || 0;
	                    for (var s in current_survey.choices) {
	                        vote = current_survey.choices[s].vote || 0;
	                        var choice = $("div.progress-bar[data-id=\"" + current_survey.choices[s].id + "\"]")
	                        if (choice.length) {
	                            choice.attr("style", "width:"+vote / total_vote * 100 + "%");
	                            choice.text(vote);
	                        }
	                        else {
	                            //console.log("no survey choice found");
	                        }
	                    };
	                    if (!lasteTotalVote[p_id]) {
	                        lasteTotalVote[p_id] = {};
	                        if (!lasteTotalVote[p_id][s_id]) lasteTotalVote[p_id][s_id] = {}
	                    }
	                    var hint = total_vote - lasteTotalVote[p_id][s_id]||0;

	                    if (hint > 0) {
	                        $("<div id='vote-hint'>+" + hint + "</div>").appendTo("body").animate({ top: '40%' }, "slow").animate({ top: '-300px', opacity: 'hide' }, 2500, function () { $(this).remove(); });
	                    }
	                    lasteTotalVote[p_id][s_id] = total_vote;
	                }
	            }

	            //update promotion
	            if ($("div.carousel-inner").find(".item.active #promotion-payload")) {
	                var p_id = $("div.carousel-inner .item.active #promotion-payload").attr("data-program-id") || "0";
	                var s_id = $("div.carousel-inner .item.active #promotion-payload").attr("data-id") || "0";
	                if (data.programs[p_id] && data.programs[p_id].survey && data.programs[p_id].promotion[s_id]) {
	                    var current_promotion = data.programs[p_id].promotion[s_id];
	                    var amount = current_promotion.amount || 0;
	                    var big_title = $("div.carousel-inner .item.active #promotion-payload #promotion-amount")
	                    if (big_title.length) {
	                        big_title.text(amount);
	                    }

	                    if (!lastePromotionAmount[p_id]) {
	                        lastePromotionAmount[p_id] = {};
	                        if (!lastePromotionAmount[p_id][s_id]) lastePromotionAmount[p_id][s_id] = {}
	                    }
	                    var hint = amount - lastePromotionAmount[p_id][s_id] || 0;

	                    if (hint < 0) {
	                        $("<div id='vote-hint'>" + hint + "</div>").appendTo("body").animate({ top: '40%' }, "slow").animate({ top: '-300px',opacity:'hide' }, 2500,function () { $(this).remove(); });
	                    }
	                    lastePromotionAmount[p_id][s_id] = amount;
	                }
	            }
	           

	            if (changed) {
	                currentProgram = undefined;
	            }

	            if (callback != undefined) {
	                callback();
	            }
	        },
	        complete: function (XMLHttpRequest, textStatus) {
	            if (XMLHttpRequest.status == 200 && XMLHttpRequest.readyState == 4) {
	                $("<div id='light-hint' class='light-hint-success'>").appendTo("body").fadeOut(1000, function () { $(this).remove(); });
	            }
	            else
	            {
	                $("<div id='light-hint' class='light-hint-error'>").appendTo("body").fadeOut(1000, function () { $(this).remove(); });
	            }
	        }
	    });
	}

	function startRotate() {
	    //$('.carousel').carousel({ interval: 3000, pause: false, wrap: false });
	    $('.carousel').carousel('cycle');
	}

	function stopRotate() {
	    $('.carousel').carousel('pause');
	}

	function resizeBg(){

		var windowHeight = $(window).height();
		$('div.carousel').css('height', windowHeight);
		var theWindow = $(window);

		var aspectRatio = 2048/1536;


		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $('div.carousel img, div.carousel video').addClass('bgheight');
		    $('div.carousel img, div.carousel video').removeClass('bgwidth');
		        

		} else {
		    $('div.carousel img, div.carousel video').addClass('bgwidth');
		    $('div.carousel img, div.carousel video').removeClass('bgheight');
		       
		}


	}

	//init();
//});


var App = function () {
    "use strict"; return {
        init: function (terminal) {
            if ($('body.home').length) {

                fromTerminal = terminal;

                poll(changeProgram);
                setInterval(poll, 3000);

                setInterval(changeProgram, 3000);

                //Page ReSize
                //<![CDATA[
                $(window).resize(function () {
                    resizeBg();
                });
                //]]>

                //Page Loader
                //<![CDATA[
                $(window).load(function () {
                    $('#status').fadeOut(); 
                    $('#preloader').delay(350).fadeOut('slow'); 
                });
                //]]>
            }
        }
    }
}();