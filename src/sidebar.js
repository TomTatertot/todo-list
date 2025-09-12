//this module will create and return the sidebar element
import inboxIcon from "./images/inbox.svg";
import todayIcon from "./images/calendar-today.svg";
import upcomingIcon from "./images/calendar-month.svg";
import completedIcon from "./images/check-circle-outline.svg";
import plusCircleIcon from "./images/plus-circle-outline.png";
import folderIcon from "./images/folder-outline.svg";
import closeIcon from "./images/close.svg";


const views = [
    { title: "Inbox", iconSrc: inboxIcon },
    { title: "Today", iconSrc: todayIcon },
    { title: "Upcoming", iconSrc: upcomingIcon },
    { title: "Completed", iconSrc: completedIcon },
    // { title: "Add Project", iconSrc: plusCircleIcon },
]

function createSidebar(projects, onViewClick, onDeleteProject, onAddProject) {

    const sidebar = document.createElement("aside");
    sidebar.classList.add("sidebar");

    const nav = document.createElement("nav");
    nav.classList.add("nav");

    const viewList = document.createElement("ul");
    viewList.classList.add("nav__list");

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

    views.forEach(view => {
        viewList.append(createViewItem(view.title, view.iconSrc));
    });

    projects.forEach(project => {
        const projectNav = createProjectItem(project.name);
        projectList.append(projectNav);
    });

    nav.append(viewList, projectHeader, projectList, addProjectBtn);
    sidebar.append(nav);

    //Event listeners
    viewList.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button) {
            return;
        }
        const view = button.dataset.view;
        onViewClick(view);
        highlightNavItem(e);
    })

    projectList.addEventListener("click", (e) => {
        const button = e.target.closest("button");
        if (!button)
            return;

        if (button.dataset.action === "project:view") {
            onViewClick("Project", button.dataset.projectID);
            highlightNavItem(e);

        }
        else if (button.dataset.action === "project:delete") {
            const projectElement = e.target.closest(".nav__item");
            const projectLabel = projectElement.querySelector(".nav__label");
            const projectName = projectLabel.textContent;
            onDeleteProject(projectName);
        }
    })

    addProjectBtn.addEventListener("click", () => {
        onAddProject();
    })

    return sidebar;
}

function createViewItem(text, iconSrc) {
    const li = document.createElement("li");
    li.classList.add("nav__item");

    if (text === "Inbox") {
        li.classList.add("nav__item--selected");
    }

    const viewButton = createButton({
        btnClass: "nav__button--view",
        btnImgSrc: iconSrc,
        btnText: text
    })
    viewButton.dataset.view = text; //add dataset.view to delagate which nav button is clicked later

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
    projectBtn.dataset.action = "project:view"
    projectBtn.dataset.view = "Project";
    projectBtn.dataset.projectID = text;

    const deleteBtn = createButton({
        btnClass: "nav__button--delete",
        btnImgSrc: closeIcon,
        btnImgAlt: "Delete project"
    });
    deleteBtn.dataset.action = "project:delete";

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

export default createSidebar;