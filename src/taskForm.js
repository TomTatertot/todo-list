function createTaskForm({projects, initialValues = {}, onSubmit}) {
    const form = document.createElement("form");
    form.classList.add("task-form");

    form.innerHTML = `
        <label class="task-form__label" for="title">Title:</label>
        <input class="task-form__input task-form__input--title" id="title" type="text" name="title"
            placeholder="Gym" required>

        <label class="task-form__label" for="description">Description:</label>
        <textarea class="task-form__input task-form__input--description" id="description" name="description"
            placeholder="Hit leg day"></textarea>

        <label class="task-form__label" for="date">Date:</label>
        <input class="task-form__input task-form__input--date" id="date" type="date" name="date" required>

        <label class="task-form__label" for="priority">Priority:</label>
        <select class="task-form__select" id="priority" name="priority">
            <option value="">None</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <label class="task-form__label" for="project">Project:</label>
        <select class="task-form__select" id="project" name="project">
        </select>

        <div class="task-form__actions">
            <button class="task-form__btn task-form__btn--cancel" type="button" data-action="task:cancel">Cancel</button>
            <button class="task-form__btn task-form__btn--submit" type="submit" data-action="task:submit">Submit</button>
        </div> `

    //apply initial values to form fields if values exist
    if (initialValues.title) form.querySelector("[name=title]").value = initialValues.title;
    if (initialValues.description) form.querySelector("[name=description]").value = initialValues.description;
    if (initialValues.date) form.querySelector("[name=date]").value = initialValues.date;
    if (initialValues.priority) form.querySelector("[name=priority]").value = initialValues.priority;


    const select = form.querySelector("#project");
    // if (Array.isArray(projects) && projects.length > 0){
    //     const defaultOption = document.createElement
    // }
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "None";

    select.append(defaultOption);
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        select.append(option);
    })

    if (initialValues.project) {
        select.value = initialValues.project;
    }

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        onSubmit(data);
    })

    const cancelBtn = form.querySelector(".task-form__btn--cancel");
    cancelBtn.addEventListener("click", () => {
        form.remove();
    });

    return form;
}
export default createTaskForm;