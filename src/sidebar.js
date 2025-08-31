//this module will create and return the sidebar element
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import completedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.svg";

function createSidebar() {
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
    projectList.classList.add("nav__list");
    projectHeader.classList.add("nav__header");

    projectHeader.textContent = "My Projects";

    sidebar.append(nav);
    nav.append(homeList, projectHeader, projectList);
    homeList.append(inbox, today, upcoming, completed);
    projectList.append(addProjectBtn);

    return sidebar;
}

function createNavItem(iconSrc, text){
    const li = document.createElement("li");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const span = document.createElement("span");

    li.classList.add("nav__item");
    button.classList.add("nav__button");
    img.classList.add("nav__icon");
    span.classList.add("nav__label");

    button.dataset.view = text.toLowerCase(); //add dataset.view to delagate which nav button is clicked later
    img.src = iconSrc;
    img.alt = "";

    button.type = "button";
    span.textContent = text;
    
    li.append(button);
    button.append(img, span);

    return li;
}

export default createSidebar;