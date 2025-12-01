const button = document.querySelector("#addTask");
const title = document.querySelector(".title");
const task = document.querySelector(".task");
const tasks = document.querySelector(".borders1");
const inProg = document.querySelector('.borders2');
const done = document.querySelector('.borders3');

let editFl = false;
let id;
let draggedIndex = 0;
!localStorage.list_tasks ? list_tasks = [] : list_tasks = JSON.parse(localStorage.getItem('list_tasks'));
UpdateTasks(list_tasks);


inProg.addEventListener('drop', (evt)=> {
    evt.preventDefault();
    list_tasks[draggedIndex].type = "inProg";
    updateLocalStorage();
    UpdateTasks(list_tasks);
    console.log("drop inProg");
})
inProg.addEventListener('dragover', (evt)=> {
    evt.preventDefault();
    console.log("dragover inProg");
    
})

done.addEventListener('drop', (evt)=> {
    evt.preventDefault();
    list_tasks[draggedIndex].type = "done";
    updateLocalStorage();
    UpdateTasks(list_tasks);
    console.log("drop done");
})

done.addEventListener('dragover', (evt)=> {
    evt.preventDefault();
    console.log("dragover done");
})


tasks.addEventListener('dragover', (evt)=> {
    evt.preventDefault();
    console.log("dragover tasks");
})

tasks.addEventListener('drop', (evt)=> {
    evt.preventDefault();
    list_tasks[draggedIndex].type = "baseTask";
    updateLocalStorage();
    UpdateTasks(list_tasks);
    console.log("drop tasks");
})



function UpdateTasks(list){
    tasks.innerHTML = "";
    inProg.innerHTML = "";
    done.innerHTML = "";
    for (let j = 0; j < list.length; j++)
    {
        let str = `<div class="taskRow" draggable="true" ondragstart="setDraggedIndex(${j})" ondragend=""
            data-id=${j}><p>${list[j].title + ": " + list[j].task}</p>
            <div class=icons>
            <button class="edit"><img src="image/edit.png"></button>
            <button class="delete"><img src="image/trash-x.png"></button></div>
            </div>`;
        if (list[j].type == "baseTask")
        {
            tasks.innerHTML += str;
        }
        else if (list[j].type == "inProg")
        {
            inProg.innerHTML += str;
        }
        else if (list[j].type == "done")
        {
            done.innerHTML += str;
        }
    }
}


class Task{
    constructor(title, task, type)
    {
        this.title = title;
        this.task = task;
        this.type = type;
    }
}


button.addEventListener("click", () => {
    if (editFl)
    {
        let _title = title.value;
        let _task = task.value;
        if (_task != "" && _title != "")
        {
            let typeCurTask = list_tasks[id].type;
            list_tasks[id] = new Task(_title,_task, typeCurTask);
            editFl = false;
            id = null;
        }
    }
    else
    {
    let _title = title.value;
    let _task = task.value;
        if (_task != "" && _title != "")
        {
            var new_task = new Task(_title, _task, "baseTask");
            list_tasks.push(new_task);
            console.log(new_task.task);
        }
    }
    title.value = "";
    task.value = "";
    updateLocalStorage();
    UpdateTasks(list_tasks);
})


tasks.addEventListener("click", (e) => {
    if (e.target.closest('.delete'))
    {
        const taskRow = e.target.closest('.taskRow');
        const id = parseInt(taskRow.dataset.id);
        list_tasks.splice(id,1);
        UpdateTasks(list_tasks);
        updateLocalStorage();
    }

    if (e.target.closest('.edit'))
    {
        editFl = true;
        const taskRow = e.target.closest('.taskRow');
        id = parseInt(taskRow.dataset.id);

        var currentTask = list_tasks[id];

        task.value = currentTask.task;
        title.value = currentTask.title;

        updateLocalStorage();
        UpdateTasks(list_tasks);
    }
})


inProg.addEventListener("click", (e) => {
    if (e.target.closest('.delete'))
    {
        const taskRow = e.target.closest('.taskRow');
        const id = parseInt(taskRow.dataset.id);
        list_tasks.splice(id,1);
        UpdateTasks(list_tasks);
        updateLocalStorage();
    }

    if (e.target.closest('.edit'))
    {
        editFl = true;
        const taskRow = e.target.closest('.taskRow');
        id = parseInt(taskRow.dataset.id);

        var currentTask = list_tasks[id];

        task.value = currentTask.task;
        title.value = currentTask.title;

        updateLocalStorage();
        UpdateTasks(list_tasks);
    }
})



done.addEventListener("click", (e) => {
    if (e.target.closest('.delete'))
    {
        const taskRow = e.target.closest('.taskRow');
        const id = parseInt(taskRow.dataset.id);
        list_tasks.splice(id,1);
        UpdateTasks(list_tasks);
        updateLocalStorage();
    }

    if (e.target.closest('.edit')) // тож самое
    {
        editFl = true;
        const taskRow = e.target.closest('.taskRow');
        id = parseInt(taskRow.dataset.id);

        var currentTask = list_tasks[id];

        task.value = currentTask.task;
        title.value = currentTask.title;

        updateLocalStorage();
        UpdateTasks(list_tasks);
    }
})




const updateLocalStorage = () => {
    localStorage.setItem('list_tasks',JSON.stringify(list_tasks));
}

const dragover = (event) => {
    event.preventDefault();
}

const setDraggedIndex = (index) => {
    draggedIndex = index;

}

const dragleave = (event) => {
    event.preventDefault
}

const drop = (event) => {
    event.preventDefault();
}

tasks.addEventListener('dragstart',(evt) =>{
    evt.target.classList.add('selected');
})

tasks.addEventListener('dragend',(evt) =>{
    evt.target.classList.remove('selected');
})

done.addEventListener('dragstart',(evt) =>{
    evt.target.classList.add('selected');
})

done.addEventListener('dragend',(evt) =>{
    evt.target.classList.remove('selected');
})

inProg.addEventListener('dragstart',(evt) =>{
    evt.target.classList.add('selected');
})

inProg.addEventListener('dragend',(evt) =>{
    evt.target.classList.remove('selected');
})

tasks.addEventListener('dragover',(evt) =>{
    tasks.classList.add('overBorders');
})

tasks.addEventListener('dragleave', (evt) => {
    tasks.classList.remove('overBorders');
});

done.addEventListener('dragover',(evt) =>{
    done.classList.add('overBorders');
})

done.addEventListener('dragleave',(evt) =>{
    done.classList.remove('overBorders');
})

inProg.addEventListener('dragover',(evt) =>{
    inProg.classList.add('overBorders');
})

inProg.addEventListener('dragleave',(evt) =>{
    inProg.classList.remove('overBorders');
})

document.addEventListener('drop', (evt)=> {
    tasks.classList.remove('overBorders');
    inProg.classList.remove('overBorders');
    done.classList.remove('overBorders');
    console.log("all drop");
})
