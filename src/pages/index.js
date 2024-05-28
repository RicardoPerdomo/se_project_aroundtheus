import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile_edit-modal");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#card-edit-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

const handleImageClick = (data) => {
  imagePopUp.open(data);
};

function handleAddCardFormSubmit(inputValues) {
  renderCard(inputValues, cardList);
  addCardPopUp.close();
}

function handleProfileCardFormSubmit() {
  userInfo.setUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  });
  editProfilePopUp.close();
}

function createCard(data) {
  const cardElement = new Card(data, "#card-template", handleImageClick);
  return cardElement.getCard();
}

function renderCard(data) {
  const card = createCard(data);
  cardSection.addItem(card);
}

addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
  addFormValidator.toggleButtonState();
});

profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileNameInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.description;
  editProfilePopUp.open();
});

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);

const addCardPopUp = new PopupWithForm(
  { popupSelector: "#card-edit-modal" },
  handleAddCardFormSubmit
);

const editProfilePopUp = new PopupWithForm(
  { popupSelector: "#profile_edit-modal" },
  handleProfileCardFormSubmit
);

const imagePopUp = new PopupWithImage({ popupSelector: "#preview-modal" });

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(data, "#card-template", handleImageClick);
      cardSection.addItem(cardElement.getCard());
    },
  },
  ".cards__list"
);
cardSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

addCardPopUp.setEventListeners();
editProfilePopUp.setEventListeners();
imagePopUp.setEventListeners();
