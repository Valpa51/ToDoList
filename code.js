const button = document.querySelector("#addTask");
const title = document.querySelector(".title");
const task = document.querySelector(".task");
const tasks = document.querySelector(".borders");
const inProg = document.querySelector('.inProg');
const done = document.querySelector('.done');

inProg.addEventListener('drop', (evt)=> {
    evt.preventDefault();
    console.log("drop inProg");
})
inProg.addEventListener('dragover', (evt)=> {
    evt.preventDefault();
    console.log("dragover inProg");
    
})

done.addEventListener('drop', (evt)=> {
    evt.preventDefault();
    console.log("drop done");
})
done.addEventListener('dragover', (evt)=> {
    evt.preventDefault();
    console.log("dragover done");
})

let editFl = false;
let id;
let draggedIndex = 0;
!localStorage.list_tasks ? list_tasks = [] : list_tasks = JSON.parse(localStorage.getItem('list_tasks'));

UpdateTasks(list_tasks);

function UpdateTasks(list){
    tasks.innerHTML = "";
    for (let i = 0; i < list.length; i++)
    {
        let str = `<div class="taskRow" draggable="true" ondragstart="setDraggedIndex(${i})" ondragend=""
        data-id=${i}><p>${list[i].title + ": " + list[i].task}</p>
        <div class=icons>
        <button class="edit"><img src="image/edit.png"></button>
        <button class="delete"><img src="image/trash-x.png"></button></div>
        </div>`;
        tasks.innerHTML += str;
    }
}


class Task{
    constructor(title,task)
    {
        this.title = title;
        this.task = task;
    }
}


button.addEventListener("click", () => {
    if (editFl)
    {
        let _title = title.value;
        let _task = task.value;
        if (_task != "" && _title != "")
        {
            list_tasks[id] = new Task(_title,_task);
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
            var new_task = new Task(_title,_task);
            list_tasks.push(new_task);
            console.log(new_task.task);
        }
    }
    title.value = "";
    task.value = "";
    updateLocalStorage();
    UpdateTasks(list_tasks);
})


tasks.addEventListener("click", (e) => { //при любом клике в borders
    if (e.target.closest('.delete')) // тож самое
    {
        const taskRow = e.target.closest('.taskRow'); //ищем ближайщий класс taskRow
        const id = parseInt(taskRow.dataset.id);//берём наш data-атрибут по id
        list_tasks.splice(id,1);//удаление, второе это кол-во
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

const drop = (event) => {
    event.preventDefault();
    console.log(event.target);
    // if (event.target.closest('inProg'))
    // {

    // }
}

tasks.addEventListener('dragstart',(evt) =>{
    evt.target.classList.add('selected');
})

tasks.addEventListener('dragend',(evt) =>{
    evt.target.classList.remove('selected');
})