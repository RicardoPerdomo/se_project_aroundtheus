import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

const closeButtons = document.querySelectorAll(".modal__close-button");

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileEditForm = document.forms["profile-form"];
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const placesAddBtn = document.querySelector("#places-add-btn");
const placesAddModal = document.querySelector("#places-add-modal");
const placeTitleInput = document.querySelector("#place-title-input");
const placeUrlInput = document.querySelector("#place-url-input");
const placeAddForm = document.forms["add-place-form"];

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const placesPreviewModal = document.querySelector("#places-preview-modal");
const placesPreviewImage = placesPreviewModal.querySelector("#places-preview");
const placesPreviewCaption = placesPreviewModal.querySelector(
  "#modal-image-caption"
);

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

closeButtons.forEach((btn) => {
  const modal = btn.closest(".modal");
  btn.addEventListener("click", () => closeModal(modal));
});

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function closeModalEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_open");
    closeModal(modalOpened);
  }
}

function closeModalOverlay(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function resetForm(form) {
  form.reset();
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

placesAddBtn.addEventListener("click", () => {
  openModal(placesAddModal);
});

placeAddForm.addEventListener("submit", handleNewPlaceSubmit);

function handleImageClick(cardData) {
  placesPreviewImage.src = cardData.link;
  placesPreviewImage.alt = "Photo of " + cardData.name;
  placesPreviewCaption.textContent = cardData.name;
  openModal(placesPreviewModal);
}

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);

profileEditBtn.addEventListener("click", () => {
  profileEditValidation.resetValidation();
  fillProfileForm();
  openModal(profileEditModal);
});

function renderCard(cardData, wrapper) {
  wrapper.prepend(getCardElement(cardData));
}

function handleNewPlaceSubmit(e) {
  e.preventDefault();
  const name = placeTitleInput.value;
  const link = placeUrlInput.value;
  renderCard({ name, link }, cardListEl);
  resetForm(placeAddForm);
  addPlaceValidation.resetValidation();
  addPlaceValidation.disableButton();
  closeModal(placesAddModal);
}

profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();
