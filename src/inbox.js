import createTask from "./task/renderTask.js";
import createAddTask from "./addTaskForm.js";

function createInbox(taskList){
    const ul = document.createElement("ul");
    const addTaskButton = createAddTask();
    ul.classList.add("main__task-list");;

    taskList.forEach(task => {
        console.log(task);
        ul.append(createTask(task));
    });

    ul.append(addTaskButton);
    return ul;
}

export default createInbox;