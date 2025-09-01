import plusCircleIcon from "./images/plus-circle-outline.svg";

function createAddTask(onSubmitTaskForm) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("main__wrapper");

    wrapper.innerHTML = `<button class="main__add-task"> <img src=${plusCircleIcon}
                        class="main__add-task-icon">Add
                    Task</button>
                <form class="task-form hidden">
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
                    </div>
                </form>`

    attachTaskEvents(wrapper, onSubmitTaskForm);
    return wrapper;
}

function attachTaskEvents(container, onSubmitTaskForm) {
    const form = container.querySelector(".task-form");
    const addTaskBtn = container.querySelector(".main__add-task")
    const cancelBtn = form.querySelector(".task-form__btn--cancel");
    const submitBtn = form.querySelector(".task-form__btn--submit");

    addTaskBtn.addEventListener("click", () => {
        form.classList.remove("hidden");
    });
    
    cancelBtn.addEventListener("click", ()=> {
        form.reset();
        form.classList.add("hidden");
    })

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log(data);
        onSubmitTaskForm(data);

        form.reset();
    })
}

export default createAddTask;