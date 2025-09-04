// index.js
import "./styles.css";
import "./reset.css"
import Task from "./task/Task.js"
import Project from "./project.js";
import { addTaskToList, removeTaskByID, getTaskById } from "./task/taskList.js";
import createHeader from "./header.js"
import createSidebar from "./sidebar.js";
import createMain from "./main.js";
import createTaskForm from "./taskForm.js";
import { isToday, isFuture, parseISO } from "date-fns";


const state = {
    tasks: [],
    projects: [],
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
    priority: ""
});

addTaskToList(state.tasks, {
    title: "Code",
    description: "Code for at least two hours without getting distracted!",
    date: "2025-08-15",
    priority: "low"
});

initializeWebpage();



// const sidebar = document.querySelector(".sidebar");
// sidebar.addEventListener("click", sidebarClick);

function initializeWebpage() {
    const content = document.createElement("div");
    content.id = "content";


    const header = createHeader();
    const sidebar = createSidebar(state.projects);
    const main = createMain(state.view, filterTasksByView(state.view, state.tasks));

    content.append(sidebar);
    content.append(main);
    document.body.append(header, content);

    sidebar.addEventListener("click", sidebarClick);
    bindMainEvents();

}

function sidebarClick(e) {
    const button = e.target.closest(".nav__button");
    if (!button) return;

    if (button.dataset.view === "add project") {
        if (!document.querySelector(".project-form")) {
            const form = createProjectForm();
            const projectList = e.target.closest(".nav__list--projects");
            // form.addEventListeners("submit", (e) => {
            //     const button = e.target.closest
            // })
            projectList.insertAdjacentElement("afterend", form);
        }
        return;
    }

    state.view = button.dataset.view;
    resetMain();
}

function createProjectForm() {
    const form = document.createElement("form");
    form.classList.add("project-form");

    const titleLabel = document.createElement("label");
    titleLabel.classList.add("project-form__label");
    titleLabel.htmlFor = "title";

    const titleInput = document.createElement("input");
    titleInput.classList.add("project-form__input");
    titleInput.id = "title";
    titleInput.name = "title";
    titleInput.type = "text";
    titleInput.placeholder = "Enter project name.."

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("project-form__actions");

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("project-form__btn", "project-form__btn--cancel");
    cancelBtn.textContent = "Cancel"

    const submitBtn = document.createElement("button");
    submitBtn.classList.add("project-form__btn", "project-form__btn--submit");
    submitBtn.textContent = "Add Project";

    cancelBtn.addEventListener("click", () => {
        form.remove();
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const project = new Project(titleInput.value);
        state.projects.push(project);
        form.remove();
        resetSidebar();
    })

    btnContainer.append(cancelBtn, submitBtn);
    form.append(titleLabel, titleInput, btnContainer);
    return form;
}

// function createProjectHTML(projectName) {
//     const button = document.createElement("button");
//     button.classList.add("nav__button");
//     button.type = "button";

//     const img = document.createElement("img");
//     img.classList.add("nav__icon");

//     const span = 

//     <button class="nav__button" type="button">
//         <img src="./images/calendar-month.svg" class="nav__icon">
//             <span class="nav__label">Upcoming</span>
//     </button>
// }

function handleAddTask(e) {
    //update the list
    e.preventDefault();
    const form = e.target.closest(".task-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    addTaskToList(state.tasks, data);
    resetMain();
}

function handleEditTask(e, taskObj) {
    e.preventDefault();
    const form = e.target.closest(".task-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    taskObj.update(data);
    resetMain();
}

function bindMainEvents() {
    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        const actionElement = e.target.closest("[data-action]");
        if (!actionElement)
            return;
        const action = actionElement.dataset.action;
        console.log(action);

        if (action === "task:toggle") {
            const taskEl = e.target.closest(".task");
            const taskObj = state.tasks.find(task => taskEl.dataset.id === task.ID)
            taskObj.completed = !taskObj.completed;
            resetMain();
        }
        else if (action === "task:delete") {
            const taskEl = e.target.closest(".task");
            const index = state.tasks.findIndex(task => taskEl.dataset.id === task.ID);
            state.tasks.splice(index, 1);
            resetMain();
        }
        else if (action === "task:edit") {
            const taskEl = e.target.closest(".task");
            const nextElement = taskEl.nextElementSibling;
            if (nextElement && nextElement.classList.contains("task-form"))
                return;

            const taskObj = state.tasks.find(task => taskEl.dataset.id === task.ID)
            const form = createTaskForm(taskObj);
            form.addEventListener("submit", (e) => {
                handleEditTask(e, taskObj);
            });
            taskEl.insertAdjacentElement("afterend", form);
        }
        else if (action === "task:add") {
            const form = createTaskForm();
            form.addEventListener("submit", handleAddTask);
            const mainList = document.querySelector(".main__task-list");
            mainList.append(form);
        }
        else if (action === "task:cancel") {
            const form = e.target.closest(".task-form");
            form.remove();
        }
    })
}

function resetMain() {
    const content = document.querySelector("#content");
    const main = document.querySelector(".main");
    main.remove();

    const newMain = createMain(state.view, filterTasksByView(state.view, state.tasks));
    content.append(newMain);
    bindMainEvents();

}

function resetSidebar(){
    const oldSidebar = document.querySelector(".sidebar");
    const newSidebar = createSidebar(state.projects);
    oldSidebar.replaceWith(newSidebar);
    newSidebar.addEventListener("click", sidebarClick);
}

function filterTasksByView(view, tasks) {
    if (state.view === "inbox") {
        return state.tasks.filter(task => !task.completed);
    }
    else if (state.view === "today") {
        return state.tasks.filter(task => isToday(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "upcoming") {
        return state.tasks.filter(task => isFuture(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "completed") {
        return state.tasks.filter(task => task.completed);
    }
}



