// 获取select中已选中的option并改变其颜色
var mySelect = document.getElementById("selectPhone");
var index = mySelect.selectedIndex;
mySelect.options[index].style.color = "#1296db";

var password = document.getElementById("password");
var note = document.getElementById("note");
var PNcontent = document.getElementById("PN-content");
var Pcontent = document.getElementById("P-content");

note.onclick = function () {
    password.style.color = "black";
    PNcontent.style.display = "none";
    Pcontent.style.display = "block";
    note.style.color = "#1296db";
};

password.onclick = function () {
    note.style.color = "black";
    Pcontent.style.display = "none";
    PNcontent.style.display = "block";
    password.style.color = "#1296db";
};