function createConfirmModal({message, onConfirm}) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const text = document.createElement("p");
  text.textContent = message;

  const actions = document.createElement("div");
  actions.classList.add("modal__actions");

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("modal__btn", "modal__btn--cancel");

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Delete";
  confirmBtn.classList.add("modal__btn", "modal__btn--delete");

  actions.append(cancelBtn, confirmBtn);
  modal.append(text, actions);
  overlay.append(modal);
  document.body.append(overlay);

  // Close + cleanup
  function close() {
    overlay.remove();
  }

  cancelBtn.addEventListener("click", () => {
    close();
  });

  confirmBtn.addEventListener("click", () => {
    onConfirm?.();
    close();
  });
    // return {overlay, modal, cancelBtn, confirmBtn};
}

export default createConfirmModal;