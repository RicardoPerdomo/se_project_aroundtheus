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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileEditForm = profileEditModal.querySelector("#edit-profile-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewCloseButton = document.querySelector(
  "#preview-image-close-button"
);
const previewSubtitle = previewImageModal.querySelector(
  ".modal__picture-subtitle"
);

const nameInput = document.querySelector("[name='name'");
const jobInput = document.querySelector("[name='job']");
const cardTitleInput = addCardFormElement.querySelector("[name='title']");
const cardUrlInput = addCardFormElement.querySelector("[name='url']");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function FillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openEditProfileModal() {
  FillProfileForm();
  openModal(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__heart-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const previewImageModal = document.querySelector("#preview-image-modal");
  const modalImage = document.querySelector(".modal__image-preview");
  const previewSubtitle = previewImageModal.querySelector(
    ".modal__picture-subtitle"
  );

  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__heart-button_clicked");
  });

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardImageEl.src;
    modalImage.alt = `Photo of ${cardData.name}`;
    previewSubtitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

profileEditButton.addEventListener("click", openEditProfileModal);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

previewCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
