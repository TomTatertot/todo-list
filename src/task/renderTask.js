function createTaskHTML(task) {
    const taskHTML = document.createElement("li");
    const checkbox = createCheckbox(task.priority);
    const top = document.createElement("div");
    const bottom = document.createElement("div");

    const title = document.createElement("p");
    const date = document.createElement("p");
    const description = document.createElement("p");

    taskHTML.classList.add("task");
    top.classList.add("task__top");
    bottom.classList.add("task__bottom");

    title.classList.add("task__title");
    date.classList.add("task__date");
    description.classList.add("task__description");

    title.textContent = task.title; 
    date.textContent = task.date;
    description = task.description;

    taskHTML.append(top, bottom);
    top.append(checkbox, title, date);
    bottom.append(description);

    return taskHTML;
}

function createCheckbox(priority) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    if (priority === "")
        priority = "no";

    label.classlist.add("task__checkbox", `task--${priority}-priority`);
    span.classList.add("task__checkmark");

    input.type = "checkbox";

    label.append(input, span);

    return label;
}