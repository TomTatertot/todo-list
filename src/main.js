import createTaskHTML from "./task/renderTask";
import plusCircleIcon from "./images/plus-circle-outline.svg";

function createMain(view, tasks, onClick) {

    // console.log(views["inbox"]);
    const main = document.createElement("main");
    main.id = "main";
    main.classList.add("main");

    const mainHeader = document.createElement("h2");
    mainHeader.classList.add("main__header");
    mainHeader.textContent = view.type === "Project" ? view.id : view.type;

    const mainList = document.createElement("ul");
    mainList.classList.add("main__task-list");

    const addTaskBtn = createAddTaskBtn();
    addTaskBtn.dataset.action = "main:add-task";
    
    main.append(mainHeader, mainList, addTaskBtn);
    tasks.forEach(task => mainList.append(createTaskHTML(task)));

    main.addEventListener("click", (e) => {
        onClick(e);
    })

    return main;
}

function createAddTaskBtn(){
    const addTaskBtn = document.createElement("button");
    const addTaskImg = document.createElement("img");

    addTaskBtn.classList.add("main__add-task");
    addTaskBtn.dataset.action = "task:add";
    addTaskImg.classList.add("add-task__icon");

    addTaskImg.src = plusCircleIcon;
    addTaskImg.alt = "Add task";

    addTaskBtn.append(addTaskImg, "Add Task");

    return addTaskBtn;
}

export default createMain;