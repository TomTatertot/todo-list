//this module will create and return the sidebar element
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import completedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.svg";
import folderIcon from "./images/folder-outline.svg";
import closeIcon from "./images/close.svg";

const views = [
    { title: "Inbox", iconSrc: inboxIcon },
    { title: "Today", iconSrc: todayIcon },
    { title: "Upcoming", iconSrc: upcomingIcon },
    { title: "Completed", iconSrc: completedIcon },
    // { title: "Add Project", iconSrc: plusCircleIcon },
]

function createSidebar(projects) {

    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");

    const nav = document.createElement("nav");
    nav.classList.add("nav");

    const homeList = document.createElement("ul");
    homeList.classList.add("nav__list");

    const projectList = document.createElement("ul");
    projectList.classList.add("nav__list", "nav__list--projects");

    const projectHeader = document.createElement("h3");
    projectHeader.classList.add("nav__header");
    projectHeader.textContent = "My Projects";

    const addProjectBtn = createButton({
        btnClass: "nav__button--add-project",
        btnText: "Add Project",
        btnImgSrc: plusCircleIcon,
        btnImgAlt: "Add Project"    
    });
    
    addProjectBtn.dataset.role = "add-project";
    views.forEach(view => {
        homeList.append(createViewItem(view.title, view.iconSrc));
    });

    projects.forEach(project => {
        const projectNav = createProjectItem(project.name);
        projectList.append(projectNav);
    });

    nav.append(homeList, projectHeader, projectList, addProjectBtn);
    sidebar.append(nav);

    return sidebar;
}

function createViewItem(text, iconSrc) {
    const li = document.createElement("li");
    li.classList.add("nav__item");

    if (text === "Inbox"){
        li.classList.add("nav__item--selected");
    }

    const viewButton = createButton({
        btnClass: "nav__button--view",
        btnImgSrc: iconSrc,
        btnText: text
    })
    viewButton.dataset.view = text; //add dataset.view to delagate which nav button is clicked later
    viewButton.dataset.role = "view";

    li.append(viewButton);

    return li;
}

function createProjectItem(text) {
    const li = document.createElement("li");
    li.classList.add("nav__item");

    const projectBtn = createButton({
        btnClass: "nav__button--project",
        btnText: text,
        btnImgSrc: folderIcon
    });
    projectBtn.dataset.role = "view";
    projectBtn.dataset.view = "Project";
    projectBtn.dataset.id = text;
    
    const deleteBtn = createButton({
        btnClass: "nav__button--delete",
        btnImgSrc: closeIcon,
        btnImgAlt: "Delete project"
    });
    deleteBtn.dataset.role = "delete";

    li.append(projectBtn, deleteBtn);
    return li;
}

function createButton({ btnClass, btnText = null, btnImgSrc, btnImgAlt = "" }) {
    const btn = document.createElement("button");
    btn.classList.add("nav__button", btnClass);
    btn.type = "button";

    const img = document.createElement("img");
    img.classList.add("nav__icon");
    img.src = btnImgSrc;
    img.alt = btnImgAlt;
    btn.append(img);

    if (btnText) {
        const span = document.createElement("span");
        span.classList.add("nav__label");
        span.textContent = btnText;
        btn.append(span);
    }

    return btn
}
export default createSidebar;