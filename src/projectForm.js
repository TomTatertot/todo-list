function createProjectForm(){
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

        return {form, titleInput, cancelBtn, submitBtn};
}

export default createProjectForm;