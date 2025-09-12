import { format, parseISO, isThisYear, isToday, isTomorrow } from "date-fns";
import closeIcon from "../images/close.svg"
import pencilIcon from "../images/pencil.svg"

function createTaskHTML(taskObj) {
    const taskHTML = document.createElement("li");
    taskHTML.classList.add("task");
    if (taskObj.completed)
        taskHTML.classList.add("task--completed");
    taskHTML.dataset.id = taskObj.ID;
    taskHTML.dataset.action = "task:expand";

    const checkbox = createCheckbox(taskObj);

    const top = document.createElement("div");
    top.classList.add("task__top");

    const bottom = document.createElement("div");
    bottom.classList.add("task__bottom");

    const title = document.createElement("p");
    title.classList.add("task__title");
    title.textContent = taskObj.title;

    const date = document.createElement("p");
    date.classList.add("task__date");
    date.textContent = formatDate(taskObj.date);

    const description = document.createElement("p");
    description.classList.add("task__description", "shorten");
    description.textContent = taskObj.description;

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("task__button-container");
    
    const deleteBtn = createButton(closeIcon, "Delete");
    
    const editBtn = createButton(pencilIcon, "Edit");

    taskHTML.append(top, bottom);
    top.append(checkbox, title, date);
    bottom.append(description, btnContainer);
    btnContainer.append(editBtn, deleteBtn);

    return taskHTML;
}

function createCheckbox(taskObj) {
    const label = document.createElement("label");
    label.classList.add("task__checkbox");
   
    const input = document.createElement("input");
    input.checked = taskObj.completed;
    input.type = "checkbox";
    input.dataset.action = "task:toggle";
    
    const span = document.createElement("span");
    span.classList.add("task__checkmark", `task__checkmark--priority-${taskObj.priority.toLowerCase()}`);

    label.append(input, span);

    return label;
}

function createButton(iconSrc, buttonName) {
    const button = document.createElement("button");
    button.classList.add("task__button");
    button.dataset.action = `task:${buttonName.toLowerCase()}`

    const img = document.createElement("img");
    img.classList.add("task__icon");
    img.src = iconSrc;
    img.alt = buttonName;

    button.append(img);
    return button;
}

function formatDate(date) {
    if (isThisYear(date)) {
        if (isToday(parseISO(date))) {
            return "Today";
        }
        else if (isTomorrow(parseISO(date))) {
            return "Tomorrow";
        }
        else
            return format(parseISO(date), "MMM d");
    }
    else {
        return format(parseISO(date), "MMM d, yyyy");
    }
}

export default createTaskHTML;