import { formatDate } from "../utils";
import checkIcon from "../images/check.svg"
import closeIcon from "../images/close.svg"
import pencilIcon from "../images/pencil.svg"

function createTaskHTML(task) {
    const taskHTML = document.createElement("li");
    const checkbox = createCheckbox(task.priority);
    const top = document.createElement("div");
    const bottom = document.createElement("div");

    const title = document.createElement("p");
    const date = document.createElement("p");
    const description = document.createElement("p");

    const btnContainer = document.createElement("div");
    const deleteBtn = createButton(closeIcon, "Delete");
    const completeBtn = createButton(checkIcon, "Mark as completed");
    const editBtn = createButton(pencilIcon, "Edit");

    taskHTML.classList.add("task");
    top.classList.add("task__top");
    bottom.classList.add("task__bottom");
    btnContainer.classList.add("task__button-container");

    title.classList.add("task__title");
    date.classList.add("task__date");
    description.classList.add("task__description", "shorten");

    title.textContent = task.title; 
    date.textContent = formatDate(task.date);
    description.textContent = task.description;

    taskHTML.append(top, bottom);
    top.append(checkbox, title, date);
    bottom.append(description, btnContainer);
    btnContainer.append(editBtn, completeBtn, deleteBtn);

    attachEvents(taskHTML);

    return taskHTML;
}

function createCheckbox(priority) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    label.classList.add("task__checkbox");
    span.classList.add("task__checkmark", `task__checkmark--priority-${priority.toLowerCase()}`);

    input.type = "checkbox";

    label.append(input, span);

    return label;
}

function createButton(iconSrc, altText){
    const button = document.createElement("button");
    button.classList.add("task__button");

    const img = document.createElement("img");
    img.classList.add("task__icon");
    img.src = iconSrc;  
    img.alt = altText;

    button.append(img);
    return button;
}

function attachEvents(taskHTML){
    console.log(taskHTML);
    taskHTML.addEventListener("click", () => {
        const description = taskHTML.querySelector(".task__description");
        description.classList.toggle("shorten");
    })
}



export default createTaskHTML;