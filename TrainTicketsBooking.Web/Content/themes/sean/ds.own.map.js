//获取查询参数
var oid = $("#OrderId").val();
var size = $("#Size").val();
var grade = $("#Grade").val();

// 百度地图API功能
var map = new BMap.Map("map", { minZoom: 13, maxZoom: 18 });          // 创建地图实例
var point = new BMap.Point(104.071373, 30.663791);  // 创建点坐标
map.centerAndZoom(point, 13);
map.enableScrollWheelZoom(); //启动地图缩放
map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件

map.addEventListener("zoomend", function () {
    //drawMarkersInBounds(true, $('#ckShowAllStation').attr("checked"));
    clearAndReload();
});

map.addEventListener("moveend", function () {
    //drawMarkersInBounds(false, false);
    //drawMarkersInBounds(false, $('#ckShowAllStation').attr("checked"));
    //clearAndReload();
});

map.addEventListener("click", function (e) {
    $('#hdcenterPointX').val(e.point.lng);
    $('#hdcenterPointY').val(e.point.lat);
});

function drawMarkersInBounds(isChearOverlays, showAll) {
    size = $("#Size").val();
    grade = $("#Grade").val();
    var radius;
    if ($('#ckSetTag').attr("checked") == "checked")
        radius=$("#Radius").val() * 1000;
    var point = {
        Longitude: null,
        Latitude: null
    };
    if ($("#pointVS").val() != "") {
        point.Longitude = $("#pointVS").val().split(',')[0];
        point.Latitude = $("#pointVS").val().split(',')[1];
    } else
        point = null;

    if (isChearOverlays) { map.clearOverlays(); } //移除标注，准备重新标注

    var paremeters = { orderId: oid, schedule: null, sizeId: size, gradeId: grade, radius: radius,point:point };
    if (showAll) {
        ////获取可视范围参数
        var cp = map.getCenter(); //中心点
        var bs = map.getBounds();   //获取可视区域
        var sw = bs.getSouthWest();   //可视区域左下角
        var ne = bs.getNorthEast();   //可视区域右上角

        $.ajax({
            type: "POST",
            url: "/MapApi/SearchOwnBoardInBounds",
            //data: "swLng=" + sw.lng + "&swLat=" + sw.lat + "&neLng=" + ne.lng + "&neLat=" + ne.lat + "&orderId=" + oid + "&size=" + size + "&grade=" + grade + "&radius=" + radius + "&cpLng=" + point.Longitude + "&cpLat=" + point
            //.Latitude,
            data: {
                swLng: sw.lng, swLat: sw.lat, neLng: ne.lng, neLat: ne.lat, orderId: oid, size: size, grade: grade, radius: radius, cPoint:point
            },
            dataType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) { $(".loading-overlay").hide(); },
            beforeSend: function () { $(".loading-overlay").show(); },
            success: function (data) {
                if (isChearOverlays) {
                    $.post("/MapApi/GetOrderStationsByPara", paremeters, function (ownData) {
                        if (ownData.geoms && ownData.geoms.length > 0) {
                            $.each(ownData.geoms, function (i, n) {
                                var ownPoint = parsePoint(n.location);
                                if (ownPoint && !checkExsitOverlay(n.id)) {
                                    var ownstation;
                                    if (map.getZoom() < 15) {
                                        ownstation = new SmallMarker(ownPoint, n.id, true);
                                    } else {
                                        ownstation = new BigMarker(ownPoint, n.id, true, n.name);
                                    }
                                    map.addOverlay(ownstation);
                                }
                            });
                        }
                        //加载所有可用资源
                        if (data.geoms && data.geoms.length > 0) {
                            $.each(data.geoms, function () {

                                var point = parsePoint(this.station.location);
                                if (point && !checkExsitOverlay(this.station.id)) {
                                    var station;
                                    if (map.getZoom() < 15) {
                                        station = new SmallMarker(point, this.station.id, false);
                                    } else {
                                        station = new BigMarker(point, this.station.id, false, this.station.name);
                                    }
                                    map.addOverlay(station);
                                }

                            });
                        }

                    });
                } else {
                    //加载所有可用资源
                    if (data.geoms && data.geoms.length > 0) {
                        $.each(data.geoms, function () {

                            var point = parsePoint(this.station.location);
                            if (point && !checkExsitOverlay(this.station.id)) {
                                var station;
                                if (map.getZoom() < 15) {
                                    station = new SmallMarker(point, this.station.id, false);
                                } else {
                                    station = new BigMarker(point, this.station.id, false, this.station.name);
                                }
                                map.addOverlay(station);
                            }

                        });
                    }
                }
                $(".loading-overlay").hide();
            }
        });
    } else {
        $.post("/MapApi/GetOrderStationsByPara", paremeters, function (data) {
            if (data.geoms && data.geoms.length > 0) {
                $.each(data.geoms, function () {
                    var point = parsePoint(this.location);
                    if (point && !checkExsitOverlay(this.id)) {
                        var station;
                        if (map.getZoom() < 15) {
                            station = new SmallMarker(point, this.id, true); 
                        } else {
                            station = new BigMarker(point, this.id, true, this.name); 
                        }
                        map.addOverlay(station);
                    }
                });
            }
        });
    }
}
//验证覆盖物是否存在
function checkExsitOverlay(id) {
    //获取目前已经存在的所有站台
    var overlays = map.getPanes().labelPane.children;
    var flag = false;
    $.each(overlays, function (i, n) {
        if (parseInt($(n).attr('id')) == id) {
            flag = true;
            return false;
        }
    });

    return flag;
}
//重新格式化站台点位坐标
function parsePoint(location) {
    var reg = /POINT\((\d*[.]?\d*)\s+(\d*[.]?\d*)\)/;
    var pointObj = reg.exec(location);
    if (pointObj && pointObj.length > 2) {
        return new BMap.Point(pointObj[1], pointObj[2]);
    }
    return null;
}
//聚合区域或者街道商圈遮盖物
function SmallMarker(point, id, isSelf) {
    this._point = point;
    this._id = id;
    this._isSelf = isSelf;
}
//地图小图标标记站台
SmallMarker.prototype = new BMap.Overlay();
SmallMarker.prototype.initialize = function (map) {
    this._map = map;
    var markerDiv = $("<div class='small_marker' id='" + this._id + "' isSelf='" + this._isSelf + "' style='display:block'></div>")
    if (this._isSelf) {
        markerDiv.append("<div><img src='/Images/marker-s.png'></div>");
    } else {
        markerDiv.append("<div><img src='/Images/marker-sa.png'></div>");
    }

    markerDiv.click(function () { openModal(0, $(this).attr("id")); });//1表示查询站台广告牌
    var div = markerDiv.get(0);
    map.getPanes().labelPane.appendChild(div);
    this._div = div;
    return div;
}
SmallMarker.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x + "px";
    this._div.style.top = pixel.y + "px";
}

//站台遮盖物
function BigMarker(point, id, isSelf, name) {
    this._point = point;
    this._id = id;
    this._name = name;
    this._isSelf = isSelf;
}

BigMarker.prototype = new BMap.Overlay();
BigMarker.prototype.initialize = function (map) {
    this._map = map;
    var markerDiv;
    if (this._isSelf) {
        markerDiv = $("<div class='marker_self' id='" + this._id + "' name='" + this._name + "' style='display:block'></div>")
        markerDiv.append("<div class='marker_self_bg'><strong>" + this._name + "</strong></div>");
        markerDiv.hover(
            function () { $(this).addClass("marker_self_hover"); },
            function () { $(this).removeClass("marker_self_hover"); });
    } else {
        markerDiv = $("<div class='marker' id='" + this._id + "' name='" + this._name + "' style='display:block'></div>")
        markerDiv.append("<div class='marker_bg'><strong>" + this._name + "</strong></div>");
        markerDiv.hover(
            function () { $(this).addClass("marker_hover"); },
            function () { $(this).removeClass("marker_hover"); });
    }

    markerDiv.click(function () { openModal(0, $(this).attr("id"), $(this).attr("name")); });//1表示查询站台广告牌
    //debugger;
    var div = markerDiv.get(0);
    map.getPanes().labelPane.appendChild(div);
    this._div = div;
    return div;
}
BigMarker.prototype.draw = function () {
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
                d.grade = grade
            }
        },
        "columns": [
                    { "data": "station.code" },
                    { "data": "station.name" },
                    { "data": "sizename" },
                    { "data": "gradename" },
                    { "data": "station.streetname" },
            {
                "data": function (e) {//这里给最后一列返回一个操作列表
                    //e是得到的json数组中的一个item ，可以用于控制标签的属性。
                    if (e['scopestartdate'] == null)
                        return '<a class="btn btn-default btn-xs show-detail-json" href="javascript:;" onclick="addToOrder(' + e['id'] + ')"><i class="fa fa-shopping-cart"></i> 备选</a>';
                    else return '<a class="btn btn-default btn-xs show-detail-json" href="javascript:;" onclick="deleteBoardInOrder(' + e['id'] + ')"><i class="fa fa-shopping-cart"></i> 移除</a>';
                }
            }
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

    //var comboId = $("#ComboId").val();

    //loadComboItems(comboId);

}

function gritter(title, content) {
    if ($.gritter) {
        $.gritter.add({ title: title, text: content });
    }
}

function addToOrder(boardId) {
    
    var orderId = $("#OrderId").val();
    $.ajax({
        type: "POST",
        url: "/OwnBillOrder/AddBoardToOrder",
        data: "&OrderId=" + orderId + "&BillboardId=" + boardId,
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            gritter("我们真的很抱歉！", "请求过程中发生错误，请稍后重试。");
            $(".loading-overlay").hide();
        },
        beforeSend: function () {
            $(".loading-overlay").show();
        },
        success: function (data) {
            if (data.success) {
                gritter("很高兴的告诉您！", "已成功添加到您的购物车列表。");
            }
            else {
                var error = data.error || "加入购物车过程中发生错误，请稍后重试。";
                gritter("我们真的很抱歉！", error);
            }
            $(".loading-overlay").hide();
            $("#modal-billboard-list").modal('hide');

            var showall = false;
            if ($('#ckShowAllStation').attr("checked") || $('#ckShowAllStation').attr("checked") == "checked")
                showall = true;
            drawMarkersInBounds(true, showall);
        }
    });
}

function deleteBoardInOrder(boardId) {

    var orderId = $("#OrderId").val();
    $.ajax({
        type: "POST",
        url: "/MapApi/DeleteBoardInOrder",
        data: "&OrderId=" + orderId + "&BillboardId=" + boardId,
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            gritter("我们真的很抱歉！", "请求过程中发生错误，请稍后重试。");
            $(".loading-overlay").hide();
        },
        beforeSend: function () {
            $(".loading-overlay").show();
        },
        success: function (data) {
            if (data.success) {
                gritter("很高兴的告诉您！", "该站牌已从订单中移除。");
            }
            else {
                var error = data.error || "移除站牌过程中发生错误，请稍后重试。";
                gritter("我们真的很抱歉！", error);
            }
            $(".loading-overlay").hide();
            $("#modal-billboard-list").modal('hide');

            var showall = false;
            if ($('#ckShowAllStation').attr("checked") || $('#ckShowAllStation').attr("checked") == "checked")
                showall = true;
            drawMarkersInBounds(true, showall);
        }
    });
}

function searchLocal(key) {
    var local = new BMap.LocalSearch(map, { renderOptions: { map: map, autoViewport: false } });
    local.disableFirstResultSelection();
    local.searchInBounds(key, map.getBounds());
}


function clearAndReload() {
    map.clearOverlays();
    
    if ($('#ckSetTag').attr("checked") == "checked") {
        var searchPoint = {
            lng: null,
            lat:null
        }
        var radius = $("#Radius").val();
        radius = $("#Radius").val() * 1000;

        //if (!searchPoint) {
        //    searchPoint = map.getCenter();
        //}
        //console.log('0');
        if ($("#pointVS").val() != "") {
            console.log($("#pointVS").val());
            searchPoint.lng = $("#pointVS").val().split(',')[0];
            searchPoint.lat = $("#pointVS").val().split(',')[1];
        }

        //重新标注区域中心坐标
        map.centerAndZoom(searchPoint, 13);
        var myIcon = new BMap.Icon("/Images/marker-blue.png", new BMap.Size(24, 36));
        map.addOverlay(new BMap.Marker(searchPoint, { icon: myIcon }));

        var circle = new BMap.Circle(searchPoint, radius, { fillColor: "blue", strokeWeight: 1, fillOpacity: 0.1, strokeOpacity: 0.1 });
        map.addOverlay(circle);
    }

    var showall = false;
    if ($('#ckShowAllStation').attr("checked") || $('#ckShowAllStation').attr("checked") == "checked")
        showall = true;
    drawMarkersInBounds(false, false);
    drawMarkersInBounds(false, showall);
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

var DsMap = function () {
    "use strict"; return {
        init: function () {
            //在地图上标注所有已选点位
            drawMarkersInBounds(false);

            $("#Size,#Grade").change(function () {
                //删除红蓝标记
                clearAndReload();
                
            });
        }
    }
}();