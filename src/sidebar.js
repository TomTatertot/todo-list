//this module will create and return the sidebar element
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import completedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.svg";
import folderIcon from "./images/folder-outline.svg";
import closeIcon from "./images/close.svg";

function createSidebar(projects) {
    const sidebar = document.createElement("aside");
    const nav = document.createElement("nav");

    const homeList = document.createElement("ul");
    const projectList = document.createElement("ul");

    const projectHeader = document.createElement("h3");

    const inbox = createViewItem(inboxIcon, "Inbox");
    const today = createViewItem(todayIcon, "Today");
    const upcoming = createViewItem(upcomingIcon, "Upcoming");
    const completed = createViewItem(completedIcon, "Completed");
    const addProjectBtn = createViewItem(plusCircleIcon, "Add Project");

    sidebar.classList.add("sidebar");
    nav.classList.add("nav");

    homeList.classList.add("nav__list");
    projectList.classList.add("nav__list", "nav__list--projects");
    projectHeader.classList.add("nav__header");

    projectHeader.textContent = "My Projects";

    sidebar.append(nav);
    nav.append(homeList, projectHeader, projectList);
    homeList.append(inbox, today, upcoming, completed);
    projectList.append(addProjectBtn);

    projects.forEach(project => {
        const projectNav = createProjectItem(project.name);
        projectList.append(projectNav);
    });

    return sidebar;
}

function createViewItem(iconSrc, text) {
    const li = document.createElement("li");
    li.classList.add("nav__item");
    
    const button = document.createElement("button");
    button.classList.add("nav__button");
    button.type = "button";
    button.dataset.view = text; //add dataset.view to delagate which nav button is clicked later
    
    const img = document.createElement("img");
    img.classList.add("nav__icon");
    img.src = iconSrc;
    img.alt = "";
    
    const span = document.createElement("span");
    span.classList.add("nav__label");
    span.textContent = text;


    li.append(button);
    button.append(img, span);

    return li;
}

function createProjectItem(text){
    const li = document.createElement("li");
    li.classList.add("nav__item");
    
    const projectBtn = document.createElement("button");
    projectBtn.classList.add("nav__button");
    projectBtn.type = "button";
    projectBtn.dataset.view = text; //add dataset.view to delagate which nav button is clicked later

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("nav__button", "nav__button--delete");
    deleteBtn.type = "button";
    deleteBtn.dataset.action = "project:delete"; //add dataset.view to delagate which nav button is clicked later
    
    const projectIcon = document.createElement("img");
    projectIcon.classList.add("nav__icon");
    projectIcon.src = folderIcon;
    projectIcon.alt = "";

    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("nav__icon");
    deleteIcon.src = closeIcon;
    deleteIcon.alt = "Delete project"; 
    
    const span = document.createElement("span");
    span.classList.add("nav__label");
    span.textContent = text;

    
    li.append(projectBtn, deleteBtn);
    projectBtn.append(projectIcon, span);
    deleteBtn.append(deleteIcon)
    return li;
}

export default createSidebar;