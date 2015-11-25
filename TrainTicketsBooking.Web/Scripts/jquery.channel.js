
$(document).ready(function () {

    var lasteTotalVote;
    var lastePromotionAmount;
    var lasteLink;

	function call_channel() {

	    $.ajax({
	        type: "GET",
	        url: "http://120.25.202.52/api/v1/channel?uid=" + uid + "&t" + Math.random(),
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

	            //$("<div id='debug-hint'>[ " + textStatus + " : " + XMLHttpRequest.readyState + " - " + XMLHttpRequest.status + " ]</div>").appendTo("body").fadeOut(1500, function () { $(this).remove(); });
	        },
	        success: function (data) {
                //show qr code
	            if (data.link) {

	                if ($("body div#code").length < 1) {
	                    $("body").append("<div id='code'></div>");
	                }

	                if ($("body div#l-code").length < 1) {
	                    $("body").append("<div id='l-code'></div>");
	                }

	                var data_link = data.link;

	                if (lasteLink != data_link) {
	                    var theLink = data_link;
	                    if (data_link.indexOf("http://") < 0) {
	                        theLink = "http://120.25.202.52" + data_link;
	                    }

	                    $("body div#code").empty();
	                    $("div#code").append("<div id='code-canvas'></div>");
	                    $("#code-canvas").qrcode({ width: 128, height: 128, text: theLink, correctLevel: QRErrorCorrectLevel.L });

	                    $("body div#l-code").empty();
	                    $("div#l-code").append("<div id='l-code-canvas'></div>");
	                    $("#l-code-canvas").qrcode({ width: 128, height: 128, text: theLink, correctLevel: QRErrorCorrectLevel.L });

	                    $("div#code,div#l-code").addClass("animated tada");

	                    var loopAni = function () {
	                        $("div#code,div#l-code").removeClass();
	                        window.setTimeout(function () { $("div#code,div#l-code").addClass("animated tada") }, 1000);
	                    };
	                    window.setInterval(loopAni, 10000);
	                }

	                lasteLink = data_link;
	            }
	            else {
	                $("body div#code,body div#l-code").empty();
	            }

	            //show survey
	            if (data.survey ) {
	                if ($("body #survey-payload").length < 1) {
	                    $("body").append("<div id='survey-payload'></div>");
	                }
	                $("#survey-payload").empty();
	                $("#survey-payload").append("<h4>" + data.survey.name + "</h4>");

	                var total_vote = 0;
	                if (data.survey.total_vote) {
	                    total_vote = data.survey.total_vote;
	                }
	                for (var s in data.survey.choices) {
	                    var vote = 0;
	                    if (data.survey.choices[s].vote) {
	                        vote = data.survey.choices[s].vote;
	                    }
	                    $("#survey-payload").append(data.survey.choices[s].name + "<div class=\"progress progress-striped\"><div class=\"progress-bar\" style=\"width: " + vote / total_vote * 100 + "%\">" + vote + "</div></div>");
	                };
	                $("#survey-payload").append("<h5>请扫描下方的二维码进行投票，诚邀您的参与！</h5>");

	                var hint = data.survey.total_vote - lasteTotalVote;

	                if (hint > 0) {
	                    $("<div id='vote-hint'>+" + hint + "</div>").appendTo("body").animate({ top: '40%' }, "slow").animate({ top: '-300px', opacity: 'hide' }, 2500, function () { $(this).remove(); });
	                }
	                lasteTotalVote = data.survey.total_vote;
	            }
	            else {
	                $("#survey-payload").remove();
	            }

	            //update promotion
	            if (data.promotion) {
	                if ($("body #promotion-payload").length < 1) {
	                    $("body").append("<div id='promotion-payload'></div>");
	                }
	                $("#promotion-payload").empty();

	                var amount = data.promotion.amount || 0;
	                var unit = data.promotion.unit || "";

	                $("#promotion-payload").append("<h4>" + data.promotion.desc + "</h4>");
	                $("#promotion-payload").append("<h1><span>剩余</span> <span id=\"promotion-amount\">" + amount + "</span> "+unit+"</h1>");

	                $("#promotion-payload").append("<h5>请扫描下方的二维码进行抢购，名额有限！</h5>");
	                
	                

	                var hint = amount - lastePromotionAmount;

	                if (hint < 0) {
	                    $("<div id='vote-hint'>" + hint + "</div>").appendTo("body").animate({ top: '40%' }, "slow").animate({ top: '-300px', opacity: 'hide' }, 2500, function () { $(this).remove(); });
	                }

	                lastePromotionAmount = amount;
	            }
	            else {
	                $("#promotion-payload").remove();
	            }
	        },
	        complete: function (XMLHttpRequest, textStatus) {
	            if (XMLHttpRequest.status == 200 && XMLHttpRequest.readyState == 4) {
	                $("<div id='light-hint' class='light-hint-success'>").appendTo("body").fadeOut(1000, function () { $(this).remove(); });
	            }
	            else
	            {
	                $("#survey-payload").remove();
	                $("#promotion-payload").remove();
	                $("body div#code").remove();
	                $("body div#l-code").remove();

	                $("<div id='light-hint' class='light-hint-error'>").appendTo("body").fadeOut(1000, function () { $(this).remove(); });
	            }
	        }
	    });
	}


	call_channel();
	setInterval(call_channel, 3000);
});