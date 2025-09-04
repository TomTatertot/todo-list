
function createTaskForm({onSubmit}) {
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

        <div class="task-form__actions">
            <button class="task-form__btn task-form__btn--cancel" type="button">Cancel</button>
            <button class="task-form__btn task-form__btn--submit" type="submit">Submit</button>
        </div> `

    attachTaskEvents(form, onSubmit);
    return form;
}

function attachTaskEvents(form, onSubmit) {
    const cancelBtn = form.querySelector(".task-form__btn--cancel");

    cancelBtn.addEventListener("click", () => {
        form.remove();
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        onSubmit(data);
        form.remove();
    })
}

export default createTaskForm;