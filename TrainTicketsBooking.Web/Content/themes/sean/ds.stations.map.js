// 百度地图API功能
var map = new BMap.Map("map", { minZoom: 12, maxZoom: 18 });          // 创建地图实例
//map.centerAndZoom("成都", 10);
var point = new BMap.Point(104.070641, 30.665534);  // 创建点坐标
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件

//移除标注，准备重新标注
map.clearOverlays();

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
    markerDiv.append("<div class='marker_bg'><strong>" + this._name + "</strong> </div>");
    markerDiv.hover(
        function () { $(this).addClass("marker_hover"); },
        function () { $(this).removeClass("marker_hover"); });
    //markerDiv.click(function () { openModal(0, $(this).attr("id"), $(this).attr("name")); });//1表示查询站台广告牌
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
    var markerDiv = $("<div class='marker' id='" + this._id + "' name='" + this._name + "' count='" + this._count + "' style='display:block'></div>")
    markerDiv.append("<div class='marker_bg'><strong>" + this._name + "</strong> " + this._count + "屏</div>");
    markerDiv.hover(
        function () { $(this).addClass("marker_hover"); },
        function () { $(this).removeClass("marker_hover"); });
    //markerDiv.click(function () { openModal(0, $(this).attr("id"), $(this).attr("name")); });//1表示查询站台广告牌
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

function parsePoint(location) {
    var reg = /POINT\((\d*[.]?\d*)\s+(\d*[.]?\d*)\)/;
    var pointObj = reg.exec(location);
    if (pointObj && pointObj.length > 2) {
        return new BMap.Point(pointObj[1], pointObj[2]);
    }
    return null;
}

//聚合区域或者街道商圈遮盖物
function BillBoardMarker(point, count, name, id) {
    this._point = point;
    this._count = count;
    this._name = name;
    this._id = id;
}

BillBoardMarker.prototype = new BMap.Overlay();
BillBoardMarker.prototype.initialize = function (map) {
    this._map = map;
    var markerDiv = $("<div class='marker' id='" + this._id + "' name='" + this._name + "' count='" + this._count + "' style='display:block'></div>")
    markerDiv.append("<div class='marker_bg'><strong>" + this._name + "</strong> </div>");
    markerDiv.hover(
        function () { $(this).addClass("marker_hover"); },
        function () { $(this).removeClass("marker_hover"); });
    //markerDiv.click(function () { openModal(0, $(this).attr("id"), $(this).attr("name")); });//1表示查询站台广告牌
    var div = markerDiv.get(0);
    map.getPanes().labelPane.appendChild(div);
    this._div = div;
    return div;
}
BillBoardMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 0 + "px";
    this._div.style.top = pixel.y - 40 + "px";
}

function drawMarkersInStations(oid, schedule) {
    //var oid = $("#DealModel_OrderId").val();

    //移除标注，准备重新标注
    map.clearOverlays();

    var datas = { orderId: oid, schedule: schedule };
    $.post("/MapApi/ListStations", datas, function (data) {
        if (data.geoms && data.geoms.length > 0) {

            $.each(data.geoms, function () {
                var point = parsePoint(this.location);
                if (point) {
                    var myIcon = new BMap.Icon("/Images/marker-s.png", new BMap.Size(20, 20));
                    var marker = new BMap.Marker(point, { icon: myIcon });

                    //var region = new BoardMarker(point, this.count, this.code, this.id);
                    map.addOverlay(marker);
                }
            });
            //hint
        } else {
            //hint
        }
    });
}

function drawMarkersInBillOrder(oid, schedule) {

    //var oid = $("#Model_OrderId").val();

    //移除标注，准备重新标注
    map.clearOverlays();

    var datas = { orderId: oid, schedule: schedule };
    $.post("/MapApi/ListStations", datas, function (data) {
        if (data.geoms && data.geoms.length > 0) {

            $.each(data.geoms, function () {
                var point = parsePoint(this.location);
                if (point) {
                    var region = new RegionMarker(point, this.count, this.name, this.id);
                    map.addOverlay(region);
                }
            });
            //hint
        } else {
            //hint
        }
    });
}

function drawMarkersInOrder(oid, schedule) {
    //移除标注，准备重新标注
    map.clearOverlays();

    var datas = { orderId: oid, schedule: schedule };
    $.post("/MapApi/ListStations", datas, function (data) {
        if (data.geoms && data.geoms.length > 0) {

            $.each(data.geoms, function () {
                var point = parsePoint(this.location);
                if (point) {
                    var region = new BillBoardMarker(point, this.count, this.code, this.id);
                    map.addOverlay(region);
                }
            });
            //hint
        } else {
            //hint
        }
    });
}
