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
import createConfirmModal from "./confirmModal.js";
import { isToday, isFuture, parseISO, compareAsc, format, startOfToday } from "date-fns";


const state = {
    tasks: [],
    projects: [],
    view: {
        type: "Inbox",
    },

}

initializeWebpage();

// const sidebar = document.querySelector(".sidebar");
// sidebar.addEventListener("click", sidebarClick);

function initializeWebpage() {
    // localStorage.clear();
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
    const button = e.target.closest("button");
    if (!button)
        return;

    highlightNavItem(e);
    const role = button.dataset.role;

    switch (role) {
        case "view":
            const viewType = button.dataset.view;
            if (viewType === "Project") {
                state.view = {
                    type: viewType,
                    id: button.dataset.id
                }
            }
            else {
                state.view = {
                    type: viewType,
                }
            }
            resetMain();
            break;
        case "add-project":
            if (!document.querySelector(".project-form"))
                renderAddProjectForm();
            break;
        case "delete":
            const projectElement = e.target.closest(".nav__item");
            const projectLabel = projectElement.querySelector(".nav__label");
            const projectName = projectLabel.textContent;
            const projectObj = getProject(projectName);

            createConfirmModal({
                message: `Are you sure you want to delete ${projectName}? All of its task will be permanently deleted.`,
                onConfirm: () => {
                    deleteTasksFromProject(projectObj)
                    deleteProject(projectObj);
                },
            });

            break;
    }
}

function deleteProject(project) {
    const index = state.projects.indexOf(project);
    state.projects.splice(index, 1);
    resetSidebar();
    saveLocalStorage();
}

function deleteTasksFromProject(project) {
    const newTasks = state.tasks.filter(item => !project.taskList.includes(item));
    state.tasks = newTasks;
    saveLocalStorage();
    resetMain();
}

function highlightNavItem(e) {
    const navItem = e.target.closest(".nav__item");
    if (!navItem) {
        return;
    }

    const selected = document.querySelector(".nav__item--selected");
    if (selected) {
        selected.classList.remove("nav__item--selected");
    }

    if (navItem)

        navItem.classList.add("nav__item--selected");
}

function renderAddProjectForm() {
    const form = createProjectForm({
        onSubmit: submitProjectForm,
        onInput: checkProjectFormValidity
    })
    const projectList = document.querySelector(".nav__list--projects");
    projectList.insertAdjacentElement("afterend", form);
}

function submitProjectForm(projectName) {
    const newProject = new Project({ name: projectName });
    state.projects.push(newProject);
    saveLocalStorage();
    resetSidebar();
}

function checkProjectFormValidity(titleInput) {
    if (state.projects.some(project => project.name === titleInput.value)) {
        titleInput.setCustomValidity("This project title already exists!");
    }
    else {
        titleInput.setCustomValidity("");
    }
}

function bindMainEvents() {
    const main = document.querySelector(".main");
    main.addEventListener("click", (e) => {
        const actionElement = e.target.closest("[data-action]");
        if (!actionElement)
            return;
        const action = actionElement.dataset.action;

        switch (action) {
            case "task:toggle":
                toggleTask(e);
                break;
            case "task:delete":
                deleteTask(e);
                break;
            case "task:edit":
                editTask(e);
                break;
            case "task:add":
                addTaskForm(e);
                break;
        }
    })
}

function toggleTask(e) {
    const taskEl = e.target.closest(".task");
    const taskObj = state.tasks.find(task => taskEl.dataset.id === task.ID)
    taskObj.completed = !taskObj.completed;
    taskEl.classList.add("task--completed");
    saveLocalStorage();
    resetMain();
}

function deleteTask(e) {
    const taskEl = e.target.closest(".task");
    const taskID = taskEl.dataset.id;
    removeTaskByID(state.tasks, taskID);
    state.projects.forEach(project => {
        removeTaskByID(project.taskList, taskID);
    })

    // const index = state.tasks.findIndex(task => taskEl.dataset.id === task.ID);
    // state.tasks.splice(index, 1);
    saveLocalStorage();
    resetMain();
}

function editTask(e) {    
    if (document.querySelector(".task-form"))
        return;

    const taskEl = e.target.closest(".task");
    const taskObj = getTaskById(state.tasks, taskEl.dataset.id);
    const form = createTaskForm({
        projects: state.projects, 
        initialValues: taskObj,
        onSubmit: (formData) => {
            submitEditForm(formData, taskObj)
        }
    });
    taskEl.insertAdjacentElement("afterend", form);
}

function submitEditForm(formData, taskObj) {
    taskObj.update(formData);
    if (formData.project !== "") {
        const project = getProject(formData.project);
        addTaskToList(project.taskList, taskObj);
        sortTaskListByDate(project.taskList);
    }
    saveLocalStorage();
    resetMain();
}


function addTaskForm(e) {
    if (document.querySelector(".task-form"))
        return;

    let data = {};
    const viewType = state.view.type;
    if (viewType === "Project") {
        data.project = state.view.id;
    }
    else if (viewType === "Today") {
        data.date = format(startOfToday(), 'yyyy-MM-dd');
    }
    const form = createTaskForm({
        projects: state.projects, 
        initialValues: data,
        onSubmit: submitAddTask
    });
    const mainList = document.querySelector(".main__task-list");
    mainList.append(form);
}

function submitAddTask(formData) {
    const task = new Task(formData);
    addTaskToList(state.tasks, task);
    if (formData.project !== "") {
        const project = getProject(formData.project);
        addTaskToList(project.taskList, task);
        sortTaskListByDate(project.taskList);
    }
    sortTaskListByDate(state.tasks);
    saveLocalStorage();
    resetMain();
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

    switch (view.type) {
        case "Inbox":
            return tasks.filter(task => !task.completed);
        case "Today":
            return tasks.filter(task => isToday(parseISO(task.date)) && !task.completed);
        case "Upcoming":
            return tasks.filter(task => isFuture(parseISO(task.date)) && !task.completed);
        case "Completed":
            return tasks.filter(task => task.completed);
        case "Project":
            const project = getProject(view.id);
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


