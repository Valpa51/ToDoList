const button = document.querySelector("#addTask");
const title = document.querySelector("#title");
const task = document.querySelector("#task");
const tasks = document.querySelector(".borders");

const list_tasks = [];

function UpdateTasks(list){
    for (let i = 0; i < list.length; i++)
    {
        let str2 = `<p><span>${list[i].title + ": " + list[i].task}</span></p>`; //отделить часть текстовую от управления
        let str = list[i].title + ": " + list[i].task;
        tasks.innerHTML += str2;
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
    let _title = title.value;
    let _task = task.value;
    if (_task != "" && _title != "")
    {
        var new_task = new Task(_title,_task);
        list_tasks.push(new_task);
        console.log(new_task.task);
    }
    UpdateTasks(list_tasks);
})