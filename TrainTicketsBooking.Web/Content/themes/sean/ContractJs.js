function addUpFileTable(p, data) {
    $(p).html('');
    var disTable = "<table class='table table-email'>";
    disTable += "<thead>";
    disTable += "<tr>";
    disTable += "<th><a href='javascript:;'>附件名称</a></th>";
    disTable += "<th><a href='javascript:;'>附件类型</a></th>";
    disTable += "<th><a href='javascript:;'>附件大小</a></th>";
    disTable += "<th><a href='javascript:;'>上传时间</a></th>";
    disTable += "<th><a href='javascript:;'>操作</a></th>";
    disTable += "</tr>";
    disTable += "</thead>";
    disTable += "<tbody>";

    $.each(data.files, function (e) {
        var row;
        row = ("<tr class='gridrow'>");
        row += ("<td>" + data.files[e]["name"] + "</td>");
        row += ("<td>" + data.files[e]["type"] + "</td>");
        row += ("<td>" + data.files[e]["size"] + "KB</td>");
        var time = data.files[e]["time"];
        if (time.indexOf("Date") > -1) {
            var NewDtime = new Date(parseInt(time.slice(6, 19)));
            time = NewDtime.format("yyyy-MM-dd hh:mm:ss");
        }
        row += ("<td>" + time + "</td>");
        row += ("<td><a class='email-btn' href=" + data.files[e]["url"] + "><i class='fa fa-download'></i></a></td>");
        row += ("</tr>");
        disTable += row;
    })
    disTable += "</tbody></table>";
    $(p).append(disTable);


   
}





Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

