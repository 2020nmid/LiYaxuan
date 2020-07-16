window.onload = function () {
    var aTitles = document.getElementById("title").getElementsByTagName("a");
    var imgs = document.getElementById("tipImg").getElementsByTagName("img");
    if (aTitles.length !== imgs.length) {
        return;
    }
    for (var i = 0; i < aTitles.length; i++) {
        aTitles[i].id = i;
        aTitles[i].onmouseover = function () {
            for (var j = 0; j < aTitles.length; j++) {
                imgs[j].style.display = "none";
            }
            imgs[this.id].style.display = "block";
        };
        aTitles[i].onmouseout = function () {
            imgs[this.id].style.display = "none";
        }
    }
};