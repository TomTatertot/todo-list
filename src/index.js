// index.js
import "./styles.css";
import "./reset.css"
import Task from "./task/Task.js"
import Project from "./project.js";
import { addTaskToList, removeTaskByID, getTaskById } from "./task/taskList.js";
import createHeader from "./UI/header.js"
import createSidebar from "./UI/sidebar.js";
import createMain from "./UI/main.js";
import createFooter from "./UI/footer.js";
import createTaskForm from "./UI/taskForm.js";
import createProjectForm from "./UI/projectForm.js";
import createConfirmModal from "./UI/confirmModal.js";
import { isToday, isFuture, parseISO, compareAsc, format, startOfToday } from "date-fns";


const state = {
    tasks: [],
    projects: [],
    view: {
        type: "Inbox",
    },

}

initializeWebpage();

function initializeWebpage() {
    loadLocalStorage();
    sortTaskListByDate(state.tasks);
    const content = document.createElement("div");
    content.id = "content";

    const header = createHeader();
    const sidebar = createSidebar(state.projects, onViewClick, onDeleteProject, onAddProject);
    const main = createMain(state.view, filterTasksByView(state.view, state.tasks), onMainClick);
    const footer = createFooter();


    content.append(sidebar);
    content.append(main);
    document.body.append(header, content, footer);
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

function onViewClick(viewType, projectID) {
    state.view.type = viewType;
    if (projectID)
        state.view.projectID = projectID;
    resetMain();
}

function onDeleteProject(projectName) {
    const project = getProject(projectName);
    createConfirmModal({
        message: `Are you sure you want to delete ${projectName}? All of its task will be permanently deleted.`,
        onConfirm: () => {
            deleteTasksFromProject(project);
            deleteProject(project);
        },
    });
}
function deleteProject(project) {
    const index = state.projects.indexOf(project);
    state.projects.splice(index, 1);
    state.view.type = "Inbox";
    resetMain();
    resetSidebar();
    saveLocalStorage();
}

function deleteTasksFromProject(project) {
    const newTasks = state.tasks.filter(item => !project.taskList.includes(item));
    state.tasks = newTasks;
    saveLocalStorage();
    resetMain();
}

function onAddProject() {
    if (document.querySelector(".project-form"))
        return;

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

function onMainClick(e) {
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
        case "main:add-task":
            addTaskForm(e);
            break;
    }
    // })
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
    });
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

    let initialTaskData = {};
    const viewType = state.view.type;
    if (viewType === "Project") {
        initialTaskData.project = state.view.projectID;
    }
    else if (viewType === "Today") {
        initialTaskData.date = format(startOfToday(), 'yyyy-MM-dd');
    }
    const form = createTaskForm({
        projects: state.projects,
        initialValues: initialTaskData,
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
    sortTaskListByDate(state.tasks);
    const newMain = createMain(state.view, filterTasksByView(state.view, state.tasks), onMainClick);
    main.replaceWith(newMain);
}

function resetSidebar() {
    const oldSidebar = document.querySelector(".sidebar");
    const newSidebar = createSidebar(state.projects, onViewClick, onDeleteProject, onAddProject);
    oldSidebar.replaceWith(newSidebar);
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
            const project = getProject(view.projectID);
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


