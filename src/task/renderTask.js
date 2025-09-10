import { format, parseISO, isThisYear, isToday, isTomorrow } from "date-fns";
import closeIcon from "../images/close.svg"
import pencilIcon from "../images/pencil.svg"

function createTaskHTML(taskObj) {
    const taskHTML = document.createElement("li");

    const checkbox = createCheckbox(taskObj);
    const top = document.createElement("div");
    const bottom = document.createElement("div");

    const title = document.createElement("p");
    const date = document.createElement("p");
    const description = document.createElement("p");

    const btnContainer = document.createElement("div");
    const deleteBtn = createButton(closeIcon, "Delete");
    const editBtn = createButton(pencilIcon, "Edit");

    taskHTML.classList.add("task");
    if (taskObj.completed)
        taskHTML.classList.add("task--completed");
    taskHTML.dataset.id = taskObj.ID;
    taskHTML.dataset.action = "task:expand";

    top.classList.add("task__top");
    bottom.classList.add("task__bottom");
    btnContainer.classList.add("task__button-container");

    title.classList.add("task__title");
    date.classList.add("task__date");
    description.classList.add("task__description", "shorten");

    title.textContent = taskObj.title;
    date.textContent = formatDate(taskObj.date);
    description.textContent = taskObj.description;

    taskHTML.append(top, bottom);
    top.append(checkbox, title, date);
    bottom.append(description, btnContainer);
    btnContainer.append(editBtn, deleteBtn);

    // attachTaskEvents(taskHTML);

    return taskHTML;
}

function createCheckbox(taskObj) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    label.classList.add("task__checkbox");
    span.classList.add("task__checkmark", `task__checkmark--priority-${taskObj.priority.toLowerCase()}`);

    input.checked = taskObj.completed;
    input.type = "checkbox";
    input.dataset.action = "task:toggle";

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