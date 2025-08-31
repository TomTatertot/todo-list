import createTask from "./task/renderTask.js"

function createInbox(taskList){
    const ul = document.createElement("ul");
    ul.classList.add("main__task-list");;

    taskList.forEach(task => {
        console.log(task);
        ul.append(createTask(task));
    });
    return ul;
}

export default createInbox;