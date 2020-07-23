function login() {
    var myEmail = document.getElementById("login-email").value;
    var myPassword = document.getElementById("login-password").value;
    var url = "http://120.24.93.68:8085/api/login";
    // var data = "email=" + myEmail + "&password=" + myPassword;
    var data = JSON.stringify({email: myEmail, password: myPassword});
    var xhr = postJsonRequest(url,data);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log("code = " + response.code + "\nmessage = " + response.message + "\ndata = " + response.data);
        switch (response.code) {
            case 200:
                alert("登陆成功！");
                window.location.href = "https://www.bilibili.com/";
                break;
            case 1001:
                alert("用户名或密码错误！");
                break;
        }
    };
}

function registerGetCode() {
    var myEmail = document.getElementById("register-email").value;
    var url = "http://120.24.93.68:8085/api/register/sendCheckCode";
    var data = 'email=' + myEmail;
    var urlData = url + '?' + data;
    var xhr = getJsonRequest(urlData);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log("code = " + response.code + "\nmessage = " + response.message + "\ndata = " + response.data);
        switch (response.code) {
            case 1005:
                alert("邮箱错误！");
                break;
        }
    };
}

function registerEmail() {
    var myEmail = document.getElementById("register-email").value;
    var myPassword = document.getElementById("register-password").value;
    var myCheckCode = document.getElementById("register-yard").value;
    var url = "http://120.24.93.68:8085/api/user/register";
    var data = JSON.stringify({checkCode: myCheckCode, email: myEmail, password: myPassword, role: 0});
    var xhr = postJsonRequest(url, data);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log("code = " + response.code + "\nmessage = " + response.message + "\ndata = " + response.data);
        switch (response.code) {
            case 500:
                alert("验证码错误！");
                break;
            case 200:
                alert("注册成功！");
                break;
        }
    };
}

function changeGetCode() {
    var myEmail = document.getElementById("change-email").value;
    var url = "http://120.24.93.68:8085/api/register/sendCheckCode";
    var data = 'email=' + myEmail;
    var urlData = url + '?' + data;
    var xhr = getJsonRequest(urlData);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log("code = " + response.code + "\nmessage = " + response.message + "\ndata = " + response.data);
        switch (response.code) {
            case 1005:
                alert("邮箱错误！");
                break;
        }
    };
}

function updatePassword() {
    var myEmail = document.getElementById("change-email").value;
    var myPassword = document.getElementById("change-password").value;
    var myCheckCode = document.getElementById("change-yard").value;
    var url = "http://120.24.93.68:8085/api/updatePassword";
    var data = JSON.stringify({checkCode: myCheckCode, email: myEmail, password: myPassword, role: 0});
    var xhr = postJsonRequest(url, data);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        console.log("code = " + response.code + "\nmessage = " + response.message + "\ndata = " + response.data);
        switch (response.code) {
            case 500:
                alert("验证码错误！");
                break;
            case 200:
                alert("密码更改成功！");
                break;
        }
    };
}

function getJsonRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    return xhr;
}

function postJsonRequest(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
    return xhr;
}