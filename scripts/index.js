const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditCloseModal = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileInputName = document.querySelector("#profile-input-name");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = document.querySelector("#profile-edit-form");

const cardAddModal = document.querySelector("#card-add-modal");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".elements__card");
const cardList = document.querySelector(".elements__list");
const cardAddButton = document.querySelector("#profile-add-button");
const cardAddModalClose = cardAddModal.querySelector(
  "#card-add-modal-close-button"
);

const cardTitle = document.querySelector("#card-title");
const cardURL = document.querySelector("#card-URL");
const cardInputTitle = document.querySelector("#card-input-title");
const cardInputURL = document.querySelector("#card-input-url");
const cardAddForm = document.querySelector("#card-add-form");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector(
  "#image-preview-close-button"
);
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#image-preview-caption");

function createNewCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__name");
  const likeButton = cardElement.querySelector("#like-button");
  const deleteButton = cardElement.querySelector("#card-delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.name;
    previewImageCaption.textContent = cardName.textContent;
    openPopup(previewImageModal);
  });
  return cardElement;
}
function openPopup(modal) {
  modal.classList.add("modal__opened");
}
function closePopup(modal) {
  modal.classList.remove("modal__opened");
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent - profileInputDescription.value;
  closePopup(profileEditModal);
}
function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardInputTitle.value;
  const link = cardInputURL.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closePopup(cardAddModal);
}
profileEditBtn.addEventListener("click", () => {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => closePopup(cardAddModal));
profileEditCloseModal.addEventListener("click", () =>
  closePopup(profileEditModal)
);

cardAddModalClose.addEventListener("click", () => closePopup(cardAddModal));
previewImageModalClosed.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

initialCards.forEach((cardData) => createNewCard(cardData, cardList));
