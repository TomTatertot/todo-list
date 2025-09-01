// index.js
import "./styles.css";
import "./reset.css"
import Task from "./task/Task.js"
import Project from "./project.js";
import { addTaskToList, removeTaskByID, getTaskById } from "./task/taskList.js";
import createHeader from "./header.js"
import createSidebar from "./sidebar.js";
import createInbox from "./views.js/inbox.js";
import createToday from "./views.js/today.js";
import createAddTask from "./addTaskForm.js";

const state = {
    tasks: [],
    completed: [],
    view: "inbox",
}

addTaskToList(state.tasks,{
    title: "Gym",
    description: "Hit leg day today!",
    date: "2025-09-01",
    priority: "high"
});

addTaskToList(state.tasks,{
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

    const header = createHeader();
    const sidebar = createSidebar();

    content.id = "content";

    content.append(sidebar, createMain());
    document.body.append(header, content);
}

function sidebarClick(e) {
    const content = document.querySelector("#content");
    const button = e.target.closest(".nav__button");
    if (!button) return;

    state.view = button.dataset.view;
    removeMain();
    content.append(createMain());
}

function onSubmitTaskForm(taskData){
    //update the list
    const content = document.querySelector("#content");
    addTaskToList(state.tasks, taskData);
    removeMain();
    content.append(createMain());
}

function createMain(){
    const main = document.createElement("main");
    const mainHeader = document.createElement("h2");
    const addTask = createAddTask(onSubmitTaskForm);

    main.id = "main";
    main.classList.add("main");
    mainHeader.classList.add("main__header");

    mainHeader.textContent = state.view.charAt(0).toUpperCase() + state.view.slice(1);

    main.append(mainHeader);

    switch(state.view){
        case "inbox":
            main.append(createInbox(state.tasks));
            break;
        case "today":
            main.append(createToday(state.tasks));
            break;
        default:
            main.append(createInbox(state.tasks));
    }
    main.append(addTask);
    
    return main;
}   

function removeMain(){
    const main = document.querySelector("main");
    main.remove();
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





