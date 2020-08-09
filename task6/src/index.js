import './index.css';
import firstImg from "./firstImg.png";

let addTask;
let deleteTask;
let addInput;
let addBtn;
let deleteInput;
let deleteBtn;
let list;
let taskList;
let deleteAllTask;
let taskJsonData;

//模拟获取获取的数据
let taskData = `{
    "name": "data.json",
    "content": [
        {
            "date": "Sat Aug 08 2020 15:26:18 GMT+0800 (中国标准时间)",
            "task": "做一件事"
        },
        {
            "date": "Sat Aug 08 2020 12:22:28 GMT+0800 (中国标准时间)",
            "task": "asdas"
        },
        {
            "date": "Sat Aug 08 2020 13:16:38 GMT+0800 (中国标准时间)",
            "task": "1223"
        },
        {
            "date": "Sat Aug 08 2020 17:29:11 GMT+0800 (中国标准时间)",
            "task": "做liang件事"
        },
        {
            "date": "Sat Aug 08 2020 10:28:13 GMT+0800 (中国标准时间)",
            "task": "assd2342das"
        },
        {
            "date": "Sat Aug 08 2020 19:36:58 GMT+0800 (中国标准时间)",
            "task": "1asd74*1212jhgj223"
        }
    ]
}`;

window.onload = todoListOnload;

function todoListOnload(){
    init();
    showTasks();
}

// init();
function init(){
    addTask = getById("add-task");
    deleteTask = getById("delete-task");
    addInput = getById("add-input");
    addBtn = getById("add-btn");
    deleteInput = getById("delete-input");
    deleteBtn = getById("delete-btn");
    taskList = getById("taskList");
    deleteAllTask = getById("deleteAllTask");
    list = new Set();
    addClickListener();
}

function getById(id){
    return document.getElementById(id);
}

function addClickListener(){
    //添加任务
    addTask.addEventListener('submit', e => {
        //更新数据
        let data = addInput.value;
        if(list.has(data)){
            addInput.value = null;
            alert('添加失败，已存在此任务！');
        }else if(data == ''){
            alert('添加失败，请输入任务内容！')
        }else{
            list.add(data);
            //往json数据中添加数据
            let addJson = {
                "date": new Date().toString(),
                "task": data
            }
            taskJsonData.content.push(addJson);
            console.log(taskJsonData);
            taskData = JSON.stringify(taskJsonData);
            console.log(taskData);
            addInput.value = null;
            //在任务栏中添加任务
            let li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = `<div class="taskContent">${data}</div><div class="delete"></div>`;
            let img = document.createElement('img');
            img.src = firstImg;
            img.className = 'deleteImg';
            li.childNodes[1].appendChild(img);
            taskList.prepend(li);
        }
        console.log(list);
        //防止刷新
        e.preventDefault();
    });

    taskList.addEventListener('click', e => {
        if(e.target.classList.contains('deleteImg')){
            let data = e.target.parentNode.parentNode.firstChild.innerHTML;
            if(list.has(data)){
                let i = 0;
            for(let v of list){
                if(v === data){
                    break;
                }
                i++;
            }
            taskJsonData.content.splice(i, 1);
            taskData = JSON.stringify(taskJsonData);
            console.log(taskJsonData);
            console.log(taskData);
            list.delete(data);
            e.target.parentNode.parentNode.remove();
            }else{
                alert('出现错误，删除失败!!!');
            }
            console.log(list);
        }
    });

    deleteBtn.addEventListener('click', () => {
        let data = deleteInput.value;
        if(list.has(data)){
            let i = 0;
            for(let v of list){
                if(v === data){
                    break;
                }
                i++;
            }
            taskJsonData.content.splice(i, 1);
            taskData = JSON.stringify(taskJsonData);
            console.log(taskJsonData);
            console.log(taskData);
            list.delete(data);
            let tasks = document.getElementsByClassName("task");
            for(let v of tasks){
                let liData = v.firstChild.innerHTML;
                if(liData === data){
                    v.remove();
                }
            }
        }else{
            alert('出现错误，删除失败!!!');
        }
        console.log(list);
    });

    deleteAllTask.addEventListener('click', () => {
        taskList.innerHTML = '';
        list.clear();
        taskJsonData.content.splice(0, taskJsonData.content.length);
        taskData = JSON.stringify(taskJsonData);
        console.log(taskJsonData);
        console.log(taskData);
    });

    deleteInput.addEventListener('keyup', e => {
        for(let v of document.getElementsByClassName("task")){
            let data = v.firstChild.innerHTML.toLowerCase();
            if(data.indexOf(deleteInput.value.toLowerCase()) >= 0){
                v.style.display = 'block';
            }else{
                v.style.display = 'none';
            }
        }
    });
}

function showTasks(){
    taskJsonData = JSON.parse(taskData);
    for(let v of taskJsonData.content){
        list.add(v.task);
        let li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `<div class="taskContent">${v.task}</div><div class="delete"></div>`;
        let img = document.createElement('img');
        img.src = firstImg;
        img.className = 'deleteImg';
        li.childNodes[1].appendChild(img);
        taskList.prepend(li);
    }
}

