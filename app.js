//load the tasks onto task-list from localStorage
tasks = JSON.parse(localStorage.getItem("tasks"));
tasks.forEach((task)=>(addTask(task)));

//To add task to task-list
document.querySelector("form.task-form").addEventListener("submit", (e)=>{
    task = document.getElementById("task");
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if(task.value.trim() !== "" && (tasks === null || tasks === [] ||tasks.indexOf(task.value.trim()) === -1)){
        addTask(task.value);
        addToLocalStorage(task.value);
    }else{
        console.log("bruh!!, there is nothing");
    }
    task.value ="";
    e.preventDefault();
})

{/* 
<div class="col s6">
    <div class="card">
        <div class="card-content">
            <p class="task-item">Complete JS modules 3,4,5</p>
        </div>
        <div class="card-action">
            <a href="#">Remove</a>
        </div>
    </div>
</div>  
*/}
function addTask(task){
    taskList = document.querySelector("div.task-list");
    div1 = document.createElement("div");
    div1.setAttribute("class", "col s6");
    card = document.createElement("div");
    card.setAttribute("class", "card");
    cardContent = document.createElement("div");
    cardContent.setAttribute("class", "card-content");
    p = document.createElement("p");
    p.setAttribute("class", "task-item");
    p.textContent = task;
    cardContent.appendChild(p);
    cardAction = document.createElement("div");
    cardAction.setAttribute("class", "card-action");
    cardAction.innerHTML = `<a class="remove-task" href="#">Remove</a>`;
    card.appendChild(cardContent);
    card.appendChild(cardAction);
    div1.appendChild(card);
    taskList.appendChild(div1);
}


function addToLocalStorage(task){
    tasks = [];
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//To remove task from task-list
//event-deligation
document.querySelector("div.task-list").addEventListener("click", (e)=>{
    if(e.target.className === "remove-task"){
        let taskListComponent = document.querySelector("div.task-list");
        task = e.target.parentNode.parentNode.childNodes[0].textContent;
        //localStorage Update
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(tasks.indexOf(task.trim()), 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //..............
        console.log("Task removed from localStorge");    
        taskListComponent.removeChild(e.target.parentNode.parentNode.parentNode);
    }
    e.preventDefault();
});

//filter tasks they are searching for from localStorage
document.querySelector("#filter").addEventListener("keyup", (e)=>{
    /*
    //This is one way to remove all child nodes of an element.
    document.querySelector("div.task-list").innerHTML = "";
    */
   //alternative way to remove all child nodes of an element .
    taskListNode = document.querySelector("div.task-list");
    while(taskList.firstChild !== null){
        taskList.firstChild.remove()
    }
    let regex = new RegExp(`^(.)*(${e.target.value.trim().toLowerCase()})(.)*?`);
    let listOfTasks = JSON.parse(localStorage.getItem("tasks"));
    listOfTasks.forEach((task)=>{
        if(task.toLowerCase().match(regex) !== null){
            addTask(task);
        }            
    });
});