// index.js
import "./styles.css";
import "./reset.css"
import Task from "./task/Task.js"
import Project from "./project.js";
import { addTaskToList, removeTaskByID, getTaskById } from "./task/taskList.js";
import createHeader from "./header.js"
import createSidebar from "./sidebar.js";
import createInbox from "./inbox.js";

const allItems = [];
addTaskToList(allItems,{
    title: "Gym",
    description: "Hit leg day today!",
    date: "8/29/25",
    priority: "medium"
});
addTaskToList(allItems,{
    title: "Gym",
    description: "Hit leg day today!",
    date: "8/29/25",
    priority: "medium"
});

initializeWebpage();

const sidebar = document.querySelector(".sidebar");
sidebar.addEventListener("click", sidebarClick)

// const content = document.querySelector("#content");
// const itemOne = new Task("Gym", "Hit leg day today!", "8/26/25", "medium");
// const itemTwo = new Task("Coding Practice", "random description here", "8/19/25", "high");
// const itemThree = new Task("Grocery Shopping", "random description here", "8/19/25", "medium");



console.log(allItems);

function initializeWebpage() {
    const body = document.querySelector("body");
    const content = document.createElement("div");

    const header = createHeader();
    const sidebar = createSidebar();
    const main = document.createElement("main");
    const mainHeader = document.createElement("h2");

    content.id = "content";
    main.id = "main";
    main.classList.add("main");
    mainHeader.classList.add("main__header");

    mainHeader.textContent = "Inbox";

    main.append(mainHeader);
    content.append(sidebar, main);
    body.append(header, content);

    // const testButton = document.createElement("button");
    // testButton.textContent = "click me"
    // testButton.addEventListener('click', () => {
    //     const div = document.createElement("div");
    // div.textContent = "test";
    //     main.append(div)
    // })

    // main.append(testButton);
}

function sidebarClick(e) {
    console.log("sidebar click");
    const button = e.target.closest(".nav__button");
    if (!button) return;

    const main = document.querySelector("main");
    const view = button.dataset.view;
    switch (view) {
        case "inbox":
            main.append(createInbox(allItems));
    }
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





