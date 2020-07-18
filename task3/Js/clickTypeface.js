var canvas1;
var canvas2;
var flag;
var imgbc;
var charNumber;
var bcURL;
var charURL;
var charX;
var charY;
var canvas1Context;
var canvas2Context;
var canWidth;
var canHeight;
var charWidth;
var charHeight;
var mouseX;
var mouseY;
var mouseClickFlag;
var mouseClickMax;
var orderWidth;
var orderHeight;
var mouseClickX;
var mouseClickY;
var submitFlag;//0为错误，1为正确，默认为0
var charFlag;

document.body.onload = ver();

function ver() {
    init();
    loadImg();
}

function init() {
    canvas1 = document.getElementById("canvas1");
    canvas1Context = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    canvas2Context = canvas2.getContext("2d");
    charWidth = 44;
    charHeight = 37;
    canWidth = canvas1.width;
    canHeight = canvas1.height;
    orderWidth = 20;
    orderHeight = 20;
    initData();
}

function loadImg() {
    imgbc.onload = function () {
        canvas2Context.drawImage(imgbc, 0, 0,260,260);
    };
    drawChars();
}

function getBcURL() {
    var rand = Math.ceil(Math.ceil(Math.random() * 10) / 2);
    // console.log("rand = " + rand);
    bcURL = "../Image/Verification/Background/bc" + rand + ".png";
}

function submit() {
    // var verImgAll = document.getElementById("ver-img-all");
    // verImgAll.src = "../Image/Verification/ktr/ktr_top.png";


    for (var i = 0; i < charNumber; i++) {
        if (mouseClickX[i] <= charX[i] + charWidth && mouseClickX[i] >= charX[i] && mouseClickY[i] >= charY[i] && mouseClickY[i] <= charY[i] + charHeight) {
            submitFlag = 1;
        } else {
            submitFlag = 0;
            break;
        }
    }
    // console.log("submitFlag = " + submitFlag);
    if (submitFlag === 1) {
        // console.log("选择正确！");
        alert("选择正确");
        var verAll = document.getElementById("ver-all");
        verAll.style.display = "none";
    } else {
        // console.log('选择错误！');
        alert("选择错误");
    }
}

function getFlag() {
    flag = Math.ceil(Math.ceil(Math.random() * 10) / 2);
    // flag = 1;
}

function getImgNumber() {
    switch (flag) {
        case 1:
            charNumber = 3;
            mouseClickMax = 3;
            break;
        case 2:
            charNumber = 3;
            mouseClickMax = 3;
            break;
        case 3:
            charNumber = 4;
            mouseClickMax = 4;
            break;
        case 4:
            charNumber = 4;
            mouseClickMax = 4;
            break;
        case 5:
            charNumber = 4;
            mouseClickMax = 4;
            break;
    }
}

function getCharFlag() {
    switch (flag) {
        case 1:
            charFlag = "ktr";
            break;
        case 2:
            charFlag = "smd";
            break;
        case 3:
            charFlag = "bzyw";
            break;
        case 4:
            charFlag = "qjcd";
            break;
        case 5:
            charFlag = "xxmb";
            break;
    }
}

function getCharURL() {
    for (var i = 0; i < charNumber; i++) {
        charURL[i] = "../Image/Verification/" + charFlag + "/" + charFlag + "_" + i + ".png";
    }
}

//cahrX可以取0-210
function getCharX() {
    var rand;
    for (var i = 0; i < charNumber; i++) {
        //ceil()对数进行上舍入，即向上取整
        //floor()对数进行下舍入，即向下取整
        //round()四舍五入
        //random()返回0-1之间的随机数，包含0不包含1

        // 获取1-10的随机整数
        rand = Math.ceil(Math.random() * 10);
        // console.log(rand + "rand");
        charX[i] = 21 * rand;
        // charX[i] = 136;
        // console.log(charX[i] + "x" + i);
    }
}

//charY可以取0-220
function getCharY() {
    var rand;
    for (var i = 0; i < charNumber; i++) {
        rand = Math.ceil(Math.random() * 10);
        charY[i] = 22 * rand;
        // charY[i] = 18;
        // console.log(charY[i] + "y" + i);
    }
}

function drawChars() {
    for (var i = 0; i < charNumber; i++) {
        var img = new Image();
        img.src = charURL[i];
        drawImg(img, charX[i], charY[i], charWidth, charHeight);
        // console.log("charX" + i + " = " + charX[i] + "charY" + i + " = " + charY[i]);
    }
}

function drawImg(tempImg, X, Y, tempW, tempH) {
    tempImg.onload = function () {
        canvas1Context.drawImage(tempImg, X, Y, tempW, tempH);
    };
}

//获取鼠标点击画布的相对位置
function getMouseXY() {
    if (mouseClickFlag < mouseClickMax) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        mouseClickX[mouseClickFlag] = mouseX;
        mouseClickY[mouseClickFlag] = mouseY;
        drawOrder();
        // console.log("mouseX = " + mouseX + "***mouseY = " + mouseY);
        // console.log("mouseClickX = " + mouseClickX[mouseClickFlag] + "***mouseClickY = " + mouseClickY[mouseClickFlag]);
        mouseClickFlag++;
    } else {
        mouseX = -1;
        mouseY = -1;
        // console.log("mouseX = " + mouseX + "***mouseY = " + mouseY);
    }
}

function drawOrder() {
    var orderURL = "../Image/Verification/Order/order" + mouseClickFlag + ".png";
    var tempImg = new Image();
    tempImg.src = orderURL;
    drawImg(tempImg, mouseX - orderWidth / 2, mouseY - orderHeight / 2, orderWidth, orderHeight);
}

function login() {
    var verImgAll = document.getElementById("ver-img-all");
    verImgAll.src = "../Image/Verification/" + charFlag + "/" + charFlag + "_top.png";
    var verAll = document.getElementById("ver-all");
    verAll.style.display = "block";
}

function shutdownVer() {
    var verAll = document.getElementById("ver-all");
    verAll.style.display = "none";
}

function initData() {
    mouseX = 0;
    mouseY = 0;
    mouseClickX = [0, 0, 0, 0];
    mouseClickY = [0, 0, 0, 0];
    mouseClickFlag = 0;
    submitFlag = 0;
    charFlag = null;
    // console.log("canw = " + canWidth + "canh = " + canHeight);
    imgbc = new Image();
    getBcURL();
    imgbc.src = bcURL;
    getFlag();
    getImgNumber();
    getCharFlag();
    charURL = [null, null, null, null];
    getCharURL();
    // for (var i = 0; i < 4; i++) {
    //     console.log(charURL[i]);
    // }
    charX = [0, 0, 0, 0];
    // for (var i = 0; i < 4; i++) {
    //     console.log(charX[i]);
    // }
    getCharX();
    charY = [0, 0, 0, 0];
    // for (var i = 0; i < 4; i++) {
    //     console.log(charY[i]+"y");
    // }
    getCharY();
}

function renovateVer() {
    initData();
    canvas1Context.clearRect(0, 0, canWidth, canHeight);
    canvas2Context.clearRect(0, 0, canWidth, canHeight);
    loadImg();
    var verImgAll = document.getElementById("ver-img-all");
    verImgAll.src = "../Image/Verification/" + charFlag + "/" + charFlag + "_top.png";
}