const button = document.querySelector("#addTask");
const title = document.querySelector(".title");
const task = document.querySelector(".task");
const tasks = document.querySelector(".borders");

const list_tasks = [];
let editFl = false;
let id;

function UpdateTasks(list){
    tasks.innerHTML = "";
    for (let i = 0; i < list.length; i++)
    {
        let str = `<div class="taskRow" data-id=${i}><p>${list[i].title + ": " + list[i].task}</p>
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
    UpdateTasks(list_tasks);
})


tasks.addEventListener("click", (e) => { //при любом клике в borders
    if (e.target.closest('.delete')) // тож самое
    {
        const taskRow = e.target.closest('.taskRow'); //ищем ближайщий класс taskRow
        const id = parseInt(taskRow.dataset.id);//берём наш data-атрибут по id
        list_tasks.splice(id,1);//удаление, второе это кол-во
        UpdateTasks(list_tasks);
    }

    if (e.target.closest('.edit')) // тож самое
    {
        editFl = true;
        const taskRow = e.target.closest('.taskRow');
        id = parseInt(taskRow.dataset.id);

        var currentTask = list_tasks[id];

        task.value = currentTask.task;
        title.value = currentTask.title;

        UpdateTasks(list_tasks);
    }
})

