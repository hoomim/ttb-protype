//获取查询参数
var oid;
var size;
var grade;
var status;

// 百度地图API功能
var map = new BMap.Map("map", { minZoom: 12, maxZoom: 18 });          // 创建地图实例
var point = new BMap.Point(104.071373, 30.663791);  // 创建点坐标
map.centerAndZoom(point,12);
//map.centerAndZoom("成都", 12);                 // 初始化地图，设置中心点坐标和地图级别
map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件

map.addEventListener("zoomend", function () {
    drawMarkersInBounds();
});

map.addEventListener("moveend", function () {
    drawMarkersInBounds();
});

drawMarkersInBounds();

function drawMarkersInBounds() {

    //获取可视范围参数
    var cp = map.getCenter(); //中心点
    var bs = map.getBounds();   //获取可视区域
    var sw = bs.getSouthWest();   //可视区域左下角
    var ne = bs.getNorthEast();   //可视区域右上角

    //获取查询参数
    oid = $("#OrderId").val();
    size = $("#Size").val();
    grade = $("#Grade").val();
    status = $("#OrderStatus").val();

    //移除标注，准备重新标注
    map.clearOverlays();

    if (map.getZoom() < 15) {   //建议标注街道、商圈

        $.post("/MapApi/SearchBoardInBounds", "swLng=" + sw.lng + "&swLat=" + sw.lat + "&neLng=" + ne.lng + "&neLat=" + ne.lat + "&size=" + size + "&grade=" + grade + "&status=" + status + "&level=2", function (data) {
            if (data.geoms && data.geoms.length > 0) {

                $.each(data.geoms, function () {
                    var point = parsePoint(this.location);
                    if (point) {
                        var region = new RegionMarker(point, this.count, this.name, this.id);
                            map.addOverlay(region);
                    }
                });
                //document.getElementById("r-result").innerHTML = s.join("");
            }
            else {
                //document.getElementById("r-result").innerHTML = '<ul class="nav"><li class="has-sub active"><a href="javascript:;"><i class="fa fa-th"></i> 在该区域内没有找到相关记录</a></li></ul>';
            }
        });

    }
    else {  //建议标注具体站台

        $.post("/MapApi/SearchBoardInBounds", "swLng=" + sw.lng + "&swLat=" + sw.lat + "&neLng=" + ne.lng + "&neLat=" + ne.lat + "&size=" + size + "&grade=" + grade + "&status=" + status + "&level=4", function (data) {
            if (data.geoms && data.geoms.length > 0) {

                $.each(data.geoms, function () {
                    var point = parsePoint(this.location);
                    if (point) {
                        var region = new BoardMarker(point, this.count, this.name, this.id);
                            map.addOverlay(region);
                    }
                });
                //document.getElementById("r-result").innerHTML = s.join("");
            } else {
                //document.getElementById("r-result").innerHTML = '<ul class="nav"><li class="has-sub active"><a href="javascript:;"><i class="fa fa-th"></i> 在该区域内没有找到相关记录</a></li></ul>';
            }
        });

    }
   
}

function parsePoint(location) {
    var reg = /POINT\((\d*[.]?\d*)\s+(\d*[.]?\d*)\)/;
    var pointObj = reg.exec(location);
    if (pointObj && pointObj.length > 2) {
        return new BMap.Point(pointObj[1], pointObj[2]);
    }
    return null;
}

//聚合区域或者街道商圈遮盖物
function RegionMarker(point, count, name, id) {
    this._point = point;
    this._count = count;
    this._name = name;
    this._id = id;
}

RegionMarker.prototype = new BMap.Overlay();
RegionMarker.prototype.initialize = function (map) {
    this._map = map;
    var markerDiv = $("<div class='marker' id='" + this._id + "' name='" + this._name + "' count='"+this._count+"' style='display:block'></div>")
    markerDiv.append("<div class='marker_bg'><strong>" + this._count + "</strong> 屏</div>");
    markerDiv.hover(
        function () { $(this).addClass("marker_hover"); $('.marker_bg',this).append(" "+$(this).attr("name")); },
        function () { $(this).removeClass("marker_hover"); $('.marker_bg', this).html("<strong>" + $(this).attr("count") + "</strong> 屏"); });
    markerDiv.click(function () { openModal($(this).attr("id"), 0, $(this).attr("name")); });//0表示查询区域广告牌
    var div = markerDiv.get(0);
    map.getPanes().labelPane.appendChild(div);
    this._div = div;
    return div;
}
RegionMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 0 + "px";
    this._div.style.top = pixel.y - 40 + "px";
}

//站台遮盖物
function BoardMarker(point, count, name, id) {
    this._point = point;
    this._count = count;
    this._name = name;
    this._id = id;
}

BoardMarker.prototype = new BMap.Overlay();
BoardMarker.prototype.initialize = function (map) {
    this._map = map;
    var markerDiv = $("<div class='marker' id='" + this._id + "' name='" + this._name + "' count='" + this._count + "' style='display:block'></div>")
    markerDiv.append("<div class='marker_bg'><strong>" + this._name + "</strong> " + this._count + "屏</div>");
    markerDiv.hover(
        function () { $(this).addClass("marker_hover"); },
        function () { $(this).removeClass("marker_hover"); });
    markerDiv.click(function () { openModal(0,$(this).attr("id"), $(this).attr("name")); });//1表示查询站台广告牌
    var div = markerDiv.get(0);
    map.getPanes().labelPane.appendChild(div);
    this._div = div;
    return div;
}
BoardMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 0 + "px";
    this._div.style.top = pixel.y - 40 + "px";
}

function openModal(regionId, stationId, title) {
    $(".modal-title").html(title);
    $('#data-table').dataTable().fnDestroy();

    $("#modal-billboard-list").modal('show');

    //$('#data-table').dataTable().fnDestroy();
    $('#data-table').dataTable({
        "processing": true,
        "serverSide": true,
        "pageLength": 6,
        "lengthChange": false,
        "ordering": true,
        "info": true,
        "bAutoWidth": false,
        "pagingType": "full",
        "searching": false,
        "ajax": {
            "url": '/MapApi/ListBillBoards',
            "data": function (d) {
                d.orderId = oid,
                d.regionId = regionId,
                d.stationId = stationId,
                d.size = size,
                d.grade = grade,
                d.status = status
            }
        },
        "columns": [
            { "data": "sizename" },
                    { "data": "gradename" },
                    { "data": "station.code" },
                    { "data": "station.name" },
                    { "data": "station.looplinename" },
                    { "data": "station.zonename" }
        ],
        'rowCallback': function (row, data) {
            if (data['orderstatus'] == 1) {
                $(row).addClass('orderstatus-0');
            }
        },
        language: {
            lengthMenu: '<select class="form-control input-xsmall">' + '<option value="5">5</option>' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '</select>条记录',//左上角的分页大小显示。
            processing: "载入中",//处理页面数据的时候的显示
            paginate: {//分页的样式文本内容。
                previous: "上一页",
                next: "下一页",
                first: "第一页",
                last: "最后一页"
            },

            zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
            //下面三者构成了总体的左下角的内容。
            info: "共_PAGES_ 页，显示第_START_ 到第 _END_ ，_TOTAL_ 项 ",//左下角的信息显示，大写的词为关键字。
            infoEmpty: "0条记录",//筛选为空时左下角的显示。
            infoFiltered: ""//筛选之后的左下角筛选提示(另一个是分页信息显示，在上面的info中已经设置，所以可以不显示)，
        }
    });
}


function searchLocal(key) {
    var local = new BMap.LocalSearch(map, { renderOptions: { map: map, autoViewport: false } });
    local.disableFirstResultSelection();
    local.searchInBounds(key, map.getBounds());
}

//搜索自动完成
var ac = new BMap.Autocomplete({
    "input": "RegionCode", "location": map
});
var myValue;
ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
    var _value = e.item.value;
    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
    setPlace();
});

function setPlace() {// 创建地址解析器实例
    var myGeo = new BMap.Geocoder();// 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(myValue, function (point) {
        if (point) {
            //map.clearOverlays();///清除覆盖物
            map.panTo(point);
            //var myIcon = new BMap.Icon("/Images/marker-blue.png", new BMap.Size(24, 36));
            //map.addOverlay(new BMap.Marker(point, { icon: myIcon }));
        }
    }, "成都");
}

var DsMap = function () { "use strict"; return { init: function () { 
    $("#Size,#Grade,#OrderStatus").change(function () {
        drawMarkersInBounds();
    });

    
}
}
}()
