import createTaskHTML from "./task/renderTask";
import plusCircleIcon from "./images/plus-circle-outline.svg";

function createMain(view, tasks) {

    // console.log(views["inbox"]);
    const main = document.createElement("main");
    const mainHeader = document.createElement("h2");
    const mainList = document.createElement("ul");
    const addTaskBtn = createAddTaskBtn();

    main.id = "main";
    main.classList.add("main");
    mainHeader.classList.add("main__header");
    mainList.classList.add("main__task-list");

    mainHeader.textContent = view.type === "Project" ? view.id : view.type;

    main.append(mainHeader, mainList, addTaskBtn);

    tasks.forEach(task => mainList.append(createTaskHTML(task)));

    addTaskBtn.dataset.action = "task:add";

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