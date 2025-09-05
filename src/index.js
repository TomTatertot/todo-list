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
import createProjectForm from "./projectForm.js";
import { isToday, isFuture, parseISO, compareAsc } from "date-fns";


const state = {
    tasks: [],
    projects: [],
    view: "Inbox",
}

initializeWebpage();

// const sidebar = document.querySelector(".sidebar");
// sidebar.addEventListener("click", sidebarClick);

function initializeWebpage() {
    loadLocalStorage();
    sortTaskListByDate(state.tasks);
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

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('projects', JSON.stringify(state.projects));
}

function loadLocalStorage() {
    const storedTaskList = localStorage.getItem('tasks');
    if (storedTaskList) {
        const parsedTaskList = JSON.parse(storedTaskList);
        parsedTaskList.forEach(parsedTask => {
            const task = new Task(parsedTask);
            addTaskToList(state.tasks, task);
        });
    }

    const storedProjectList = localStorage.getItem('projects');
    if (storedProjectList) {
        const parsedProjectList = JSON.parse(storedProjectList);

        parsedProjectList.forEach(parsedProject => {
            const project = new Project(parsedProject);
            state.projects.push(project);
        });

    }
}

function sidebarClick(e) {
    const button = e.target.closest("[data-view]");
    if (!button) return;

    const view = button.dataset.view;
    if (!view) return;

    if (view === "Add Project" && !document.querySelector(".project-form")) {
        const {form, titleInput, cancelBtn} = createProjectForm();
        bindProjectFormEvents(form, titleInput, cancelBtn);
        const projectList = e.target.closest(".nav__list--projects");
        projectList.insertAdjacentElement("afterend", form);
        return;
    }

    state.view = view;
    resetMain();
}

function bindProjectFormEvents(form, titleInput, cancelBtn){
    cancelBtn.addEventListener("click", () => {
        form.remove();
    })

    titleInput.addEventListener("input", () => {
        const title = titleInput.value;
        if (state.projects.some(project => project.name === title)) {
            titleInput.setCustomValidity("This project title already exists!");
        }
        else {
            titleInput.setCustomValidity("");
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newProject = new Project({ name: titleInput.value });
        state.projects.push(newProject);
        saveLocalStorage();
        resetSidebar();
        form.remove();
    });
}

function handleAddTask(e) {
    //update the list
    e.preventDefault();
    const form = e.target.closest(".task-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    addTaskToList(state.tasks, data);
    if (data.project !== "") {
        const project = getProject(data.project);
        addTaskToList(project.taskList, data);
        sortTaskListByDate(project.taskList);
    }
    saveLocalStorage();
    resetMain();
}

function handleEditTask(e, taskObj) {
    e.preventDefault();
    const form = e.target.closest(".task-form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (data.project !== "") {
        const project = getProject(data.project);
        addTaskToList(project.taskList, data);
        sortTaskListByDate(project.taskList);
    }
    taskObj.update(data);
    saveLocalStorage();
    resetMain();
}

function bindMainEvents() {
    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        const actionElement = e.target.closest("[data-action]");
        if (!actionElement)
            return;
        const action = actionElement.dataset.action;

        if (action === "task:toggle") {
            const taskEl = e.target.closest(".task");
            const taskObj = state.tasks.find(task => taskEl.dataset.id === task.ID)
            taskObj.completed = !taskObj.completed;
            taskEl.classList.add("task--completed");
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

            const taskObj = getTaskById(state.tasks, taskEl.dataset.id);
            const form = createTaskForm(state.projects, taskObj);
            form.addEventListener("submit", (e) => {
                handleEditTask(e, taskObj);
            });
            taskEl.insertAdjacentElement("afterend", form);
        }
        else if (action === "task:add") {
            const form = createTaskForm(state.projects);
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
    const main = document.querySelector(".main");
    const newMain = createMain(state.view, filterTasksByView(state.view, state.tasks));

    main.replaceWith(newMain);
    bindMainEvents();
    sortTaskListByDate(state.tasks);
}

function resetSidebar() {
    const oldSidebar = document.querySelector(".sidebar");
    const newSidebar = createSidebar(state.projects);
    oldSidebar.replaceWith(newSidebar);
    newSidebar.addEventListener("click", sidebarClick);
}

function filterTasksByView(view, tasks) {
    if (state.view === "Inbox") {
        return tasks.filter(task => !task.completed);
    }
    else if (state.view === "Today") {
        return tasks.filter(task => isToday(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "Upcoming") {
        return tasks.filter(task => isFuture(parseISO(task.date)) && !task.completed);
    }
    else if (state.view === "Completed") {
        return tasks.filter(task => task.completed);
    }
    else {
        const project = getProject(view);
        return project.taskList;
    }
}

function sortTaskListByDate(taskList) {
    const sortedTasks = taskList.sort((a, b) => {
        return compareAsc(parseISO(a.date), parseISO(b.date));
    })
}

function getProject(name) {
    return state.projects.find(project => project.name === name);
}



