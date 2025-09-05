//this module will create and return the sidebar element
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import completedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.svg";
import projectIcon from "./images/folder-outline.svg"

function createSidebar(projects) {
    const sidebar = document.createElement("aside");
    const nav = document.createElement("nav");

    const homeList = document.createElement("ul");
    const projectList = document.createElement("ul");

    const projectHeader = document.createElement("h3");

    const inbox = createNavItem(inboxIcon, "Inbox");
    const today = createNavItem(todayIcon, "Today");
    const upcoming = createNavItem(upcomingIcon, "Upcoming");
    const completed = createNavItem(completedIcon, "Completed");
    const addProjectBtn = createNavItem(plusCircleIcon, "Add Project");

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
        const projectNav = createNavItem(projectIcon, project.name);
        projectList.append(projectNav);
    });

    return sidebar;
}

function createNavItem(iconSrc, text,) {
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

export default createSidebar;