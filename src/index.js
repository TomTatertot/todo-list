// index.js
import "./styles.css";
import "./reset.css"
import Task from "./task/Task.js"
import Project from "./project.js";
import { addTaskToList, removeTaskByID, getTaskById } from "./task/taskList.js";
import createHeader from "./header.js"
import createSidebar from "./sidebar.js";
import createMain from "./main.js";
import createAddTask from "./addTaskForm.js";


const state = {
    tasks: [],
    completed: [],
    view: "inbox",
}
addTaskToList(state.tasks, {
    title: "Gym",
    description: "Hit leg day today!",
    date: "2025-09-05",
    priority: "high"
});
addTaskToList(state.tasks, {
    title: "Gym",
    description: "Hit leg day today!",
    date: "2025-09-02",
    priority: "high"
});

addTaskToList(state.tasks, {
    title: "Code",
    description: "Code for at least two hours without getting distracted!",
    date: "2025-08-15",
    priority: "low"
});

initializeWebpage();



const sidebar = document.querySelector(".sidebar");
sidebar.addEventListener("click", sidebarClick);

function initializeWebpage() {
    const content = document.createElement("div");
    content.id = "content";


    const header = createHeader();
    const sidebar = createSidebar();
    const main = createMain(state);

    content.append(sidebar);
    content.append(main);
    document.body.append(header, content);

    const addTask = createAddTask(onSubmitTaskForm);
    main.append(addTask);

}

function sidebarClick(e) {
    const content = document.querySelector("#content");
    const main = document.querySelector("main");
    const button = e.target.closest(".nav__button");
    if (!button) return;

    state.view = button.dataset.view;
    resetMain();
}

function onSubmitTaskForm(taskData) {
    //update the list
    const content = document.querySelector("#content");
    const main = document.querySelector("main");
    main.remove();
    addTaskToList(state.tasks, taskData);
    resetMain();
}

function resetMain(){
    const content = document.querySelector("#content");
    const main = document.querySelector("main");
    main.remove();

    const newMain = createMain(state);
    newMain.append(createAddTask(onSubmitTaskForm));
    content.append(newMain);
}




// const todoItem = new Item("title", "random description here", "8/19/25", "high")
// const todayProjects = new Project("Coding Projects");

// todayProjects.addItem({
//     title: "title",
//     description: "random description",
//     dueDate: "8/20/25",
//     priority: "high"
// });

// console.log("Before remove:", JSON.stringify(todayProjects.itemList, null, 2));

// const itemID = todayProjects.itemList[0].ID;
// const item = todayProjects.getItemById(itemID);
// console.log(item);

// item.toggleCompleted();
// item.update({
//     title: "changedTitle",
//     description: "changed",
// })
// console.log(item);



// todayProjects.removeItemByID(itemID);

// console.log("After remove:", JSON.stringify(todayProjects.itemList, null, 2));





