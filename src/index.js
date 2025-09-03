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
import { isToday, isFuture, parseISO } from "date-fns";


const state = {
    tasks: [],
    view: "inbox",
}
addTaskToList(state.tasks, {
    title: "Gym",
    description: "Hit leg day today!",
    date: "2025-09-05",
    priority: "high"
});
addTaskToList(state.tasks, {
    title: "Take dog for a walk",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae quasi soluta labore dicta! Quia ducimus maiores veniam dicta aliquam perspiciatis sapiente molestias vero dolore a, delectus velit non temporibus quidem voluptate aperiam. Non minima dolor placeat doloribus iusto aliquid ipsum, alias debitis repudiandae enim officia praesentium repellat veniam quasi aliquam.",
    date: "2025-09-02",
    priority: "none"
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
    const main = createMain(state.view, filterTaskByView(state.view, state.tasks));

    content.append(sidebar);
    content.append(main);
    document.body.append(header, content);

    const addTask = createAddTask({ onSubmit: handleTaskFormSubmit });
    main.append(addTask);

    bindTaskEvents();

    console.log(filterTaskByView());
}

function sidebarClick(e) {
    const content = document.querySelector("#content");
    const main = document.querySelector("main");
    const button = e.target.closest(".nav__button");
    if (!button) return;

    state.view = button.dataset.view;
    resetMain();
}

function handleTaskFormSubmit(taskData) {
    //update the list
    addTaskToList(state.tasks, taskData);
    resetMain();
}

function bindTaskEvents() {
    const taskList = document.querySelector(".main__task-list");
    taskList.addEventListener("click", (e) => {
        const taskEl = e.target.closest(".task");
        const action = e.target.dataset.action;
        console.log(action);
        if (!action) {
            const description = taskEl.querySelector(".task__description");
            description.classList.toggle("shorten");
            return;
        }
        else if (action === "task:toggle"){
            const taskObj = state.tasks.find(item => taskEl.dataset.id === item.ID)
            taskObj.completed = !taskObj.completed;
            resetMain();
            //
        }
    })


}


function resetMain() {
    const content = document.querySelector("#content");
    const main = document.querySelector(".main");
    main.remove();

    const newMain = createMain(state.view, filterTaskByView(state.view, state.tasks));
    newMain.append(createAddTask(handleTaskFormSubmit));
    content.append(newMain);
    bindTaskEvents();

}

function filterTaskByView(view, tasks){
    if (state.view === "today"){
        return state.tasks.filter(task => isToday(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "inbox"){
        return state.tasks.filter(task => !task.completed);
    }
    else if (state.view === "upcoming"){
        return state.tasks.filter(task => isFuture(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "completed"){
        return state.tasks.filter(task => task.completed);
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





