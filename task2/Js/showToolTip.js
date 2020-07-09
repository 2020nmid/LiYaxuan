var className = "tooltip-box";

var getDocId = function (id) {
    return document.getElementById(id);
};

function showTooltip(obj, id, html, width, height, left, top) {
    if (document.getElementById(id) == null) {
        var tooltipBox = document.createElement("div");
        tooltipBox.className = className;
        tooltipBox.id = id;
        tooltipBox.innerHTML = html;
        tooltipBox.style.width = width ? width + "px" : "auto";
        tooltipBox.style.height = height ? height + "px" : "auto";
        tooltipBox.style.position = "absolute";
        tooltipBox.style.display = "block";
        tooltipBox.style.zIndex = 10;
        var offLeft = obj.offsetLeft + left;
        var offTop = obj.offsetTop + top;
        tooltipBox.style.left = offLeft + "px";
        tooltipBox.style.top = offTop + "px";
        obj.appendChild(tooltipBox);
        obj.onmouseout = function () {
            setTimeout(function () {
                getDocId(id).style.display = "none";
            }, 500);
        };
    }else {
        document.getElementById(id).style.display = "block";
    }
}

var gc = getDocId("gameCenter");
var lv = getDocId("live");
var ct = getDocId("cartoon");
var a = getDocId("app");

gc.onmousemove = function () {
    var geek = '<iframe src = "../Html/gameCenterTip.html" style="border: 0; width: 675px; height: 255px"></iframe>';
    showTooltip(this, "gc", geek, 666, 258, -40, 40);
};
lv.onmousemove = function () {
    var geek = '<iframe src = "../Html/liveTip.html" style="border: 0; width: 530px; height: 280px"></iframe>';
    showTooltip(this, "lv", geek, 530, 280, -40, 40);
};
ct.onmousemove = function () {
    var geek = '<iframe src = "../Html/cartoonTip.html" style="border: 0; width: 665px; height: 245px"></iframe>';
    showTooltip(this, "ct", geek, 665, 245, -40, 40);
};
a.onmousemove = function () {
    var geek = '<iframe src = "../Html/appTip.html" style="border: 0; width: 150px; height: 180px"></iframe>';
    showTooltip(this, "a", geek, 150, 180, -30, 40);
};
