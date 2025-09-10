function createProjectForm({ onCancel, onSubmit, onInput }) {
        const form = document.createElement("form");
        form.classList.add("project-form");

        const titleLabel = document.createElement("label");
        titleLabel.classList.add("project-form__label");
        titleLabel.htmlFor = "title";

        const titleInput = document.createElement("input");
        titleInput.classList.add("project-form__input");
        titleInput.id = "title";
        titleInput.name = "title";
        titleInput.type = "text";
        titleInput.placeholder = "Enter project name.."
        titleInput.required = true;

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("project-form__actions");

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("project-form__btn", "project-form__btn--cancel");
        cancelBtn.textContent = "Cancel"
        cancelBtn.type = "button";

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("project-form__btn", "project-form__btn--submit");
        submitBtn.textContent = "Add Project";

        btnContainer.append(cancelBtn, submitBtn);
        form.append(titleLabel, titleInput, btnContainer);

        cancelBtn.addEventListener("click", () => {
                form.remove();
        })

        titleInput.addEventListener("input", () => {
                console.log(onInput);
                onInput(titleInput);
                const title = titleInput.value;
        });

        form.addEventListener("submit", (e) => {
                e.preventDefault();
                onSubmit(titleInput.value);
                form.remove();
        });

        return form;
}

export default createProjectForm;