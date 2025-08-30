// index.js
import "./styles.css";
import "./reset.css"
import Project from "./project.js";
import {addItem, removeItemByID} from "./taskUtils.js";
import createHeader from "./header.js"
import createSidebar from "./sidebar.js";

// initializeWebpage();

// const content = document.querySelector("#content");

function initializeWebpage(){
    const body = document.querySelector("body");
    const content = document.createElement("div");

    const header = createHeader();
    const sidebar = createSidebar();

    content.id = "content";
    body.append(header, content, sidebar);
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





