//this module will create and return the header and navbar HTML
// import { createElement } from "react";
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import compeletedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.svg";

function createHome(){
    const body = document.querySelector("body");
    const content = document.createElement("div");
    content.id = "content";
    
    const header = createHeader();
    const nav = createNav();

    body.append(header, content);
    content.append(nav);
}

function createHeader() {
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = "Todo List";
    header.append(h1);
    return header;
}

function createNav() {
    const nav = document.createElement("nav");

    const home = document.createElement("div");
    const projectHeader = document.createElement("h3");
    const projects = document.createElement("div");

    const inboxBtn = createNavButton(inboxIcon, "Inbox");
    const todayBtn = createNavButton(todayIcon, "Today");
    const upcomingBtn = createNavButton(upcomingIcon, "Upcoming");
    const completedBtn = createNavButton(compeletedIcon, "Compeleted");

    const addProjectBtn = createNavButton(plusCircleIcon, "Add Project");

    nav.classList.add("left");
    home.classList.add("home");
    projects.classList.add("projects");

    projectHeader.classList.add("project-header");
    addProjectBtn.classList.add("add-project-button");

    projectHeader.textContent = "My Projects";

    home.append(inboxBtn, todayBtn, upcomingBtn, completedBtn);
    projects.append(projectHeader, addProjectBtn);
    nav.append(home, projects);

    return nav;
}

function createNavButton(iconSrc, text){
    const button = document.createElement("button");
    const img = document.createElement("img");

    img.src = iconSrc;
    button.append(img, text);

    return button;
}

export default createHome;