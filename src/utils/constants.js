export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: "modal__form_input_type_error",
  errorClass: "modal__form-input-error-visible",
};

export const elements = {
  profileEditBtn: document.querySelector("#profile-edit-btn"),
  profileTitleInput: document.querySelector("#profile-title-input"),
  profileEditForm: document.forms["profile-form"],
  profileDescriptionInput: document.querySelector("#profile-description-input"),
  placesAddBtn: document.querySelector("#places-add-btn"),
  placeAddForm: document.forms["add-place-form"],
  avatarUpdateBtn: document.querySelector("#avatar-save-btn"),
  avatarForm: document.forms["update-avatar-form"],
};
