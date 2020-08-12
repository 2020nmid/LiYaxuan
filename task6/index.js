const form = document.getElementById('task-form')
const taskInput = document.getElementById('task')
const filterInput = document.getElementById('filter')
const clearBtn = document.querySelector('.clear-tasks')
const taskUl = document.querySelector('.collection')
//开始监听
startListen();

function startListen(){
    //1.添加   --form表单提交
    form.addEventListener('submit',addTask)  //监听提交
    //2.删除单个任务  --鼠标点击
    taskUl.addEventListener('click',removeTask)
    //3.清除所有任务   --鼠标点击
    clearBtn.addEventListener('click',clearAllTask)
    //4.筛选任务     --键盘松开
    filterInput.addEventListener('keyup',filterTasks)
    
}

function addTask(e){
    e.preventDefault();//阻止表单默认提交，防止刷新
    //1.输入内容
    const newtask = taskInput.value;
    //2.生成
    let li = document.createElement('li');
    li.className = "collection-Item"
    li.innerHTML = `${newtask}<a class="delete-item secondary-content" ><i class="fa fa-remove"></i></a>`
    //3.插入
    taskUl.prepend(li);           //添加在最前面
    taskInput.value = '';         //清除输入
}

function removeTask(e){
    if(e.target.classList.contains('fa-remove')){
        e.target.parentNode.parentNode.remove();
    }
}

function clearAllTask(){
    taskUl.innerHTML = '';
}

function filterTasks(e){
    const inputText = e.target.value.toLowerCase();       //toLowerCase():将大写变成小写
    document.querySelectorAll('.collection-Item').forEach(taskli=>{
        const item = taskli.firstChild.textContent.toLowerCase();
        if(item.indexOf(inputText) != -1){            //如果包含就显示
            taskli.style.display = 'block';
        }else{                                      //如果不包含就不显示
            taskli.style.display = 'none';
        }
    })
}
