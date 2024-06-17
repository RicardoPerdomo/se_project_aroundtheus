import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { settings, elements } from "../utils/constants.js";
import Api from "../components/Api.js";

const {
  profileEditBtn,
  profileTitleInput,
  profileEditForm,
  profileDescriptionInput,
  placesAddBtn,
  placeAddForm,
  avatarUpdateBtn,
  avatarForm,
} = elements;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "452c8a3d-4805-4b3d-97d0-6df5b94e48de",
    "content-type": "application/json",
  },
});

/* Image Click Preview Function */
function handleImageClick(imageData) {
  imagePreviewModal.open(imageData);
}

const profileEditValidation = new FormValidator(settings, profileEditForm);
const addPlaceValidation = new FormValidator(settings, placeAddForm);
const avatarValidation = new FormValidator(settings, avatarForm);

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addPlaceModal = new PopupWithForm(
  "#places-add-modal",
  handleNewPlaceSubmit
);

const updateAvatarModal = new PopupWithForm(
  "#avatar-update-modal",
  handleAvatarSubmit
);
const imagePreviewModal = new PopupWithImage("#places-preview-modal");
const deletePlaceModal = new PopupWithForm("#places-delete-modal", () => {});

editProfileModal.setEventListeners();
imagePreviewModal.setEventListeners();
updateAvatarModal.setEventListeners();
addPlaceModal.setEventListeners();

deletePlaceModal.setEventListeners();
avatarValidation.enableValidation();
profileEditValidation.enableValidation();
addPlaceValidation.enableValidation();

function handleDeleteClick(cardID, cardElement) {
  deletePlaceModal.setSubmitHandler(() => {
    deletePlaceModal.setLoading(true, "Removing...", "Yes");
    api
      .removePlace(cardID)
      .then(() => {
        cardElement.remove();
        deletePlaceModal.close();
      })
      .catch((err) => {
        console.error("Error deleting place:", err);
      })
      .finally(() => {
        deletePlaceModal.setLoading(false, "Removing...", "Yes");
      });
  });
  deletePlaceModal.open();
}

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeReact
  );
  return card.getView();
}

/* GET Cards */
let section;
api
  .getInitialCards()
  .then((items) => {
    section = new Section(
      {
        items: items,
        renderer: (cardData) => {
          const cardElement = getCardElement(cardData);
          return cardElement;
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => console.error(err));

/* GET Profile */
const userInfo = new UserInfo();
api
  .getUserInfo()
  .then((profileData) => {
    userInfo.setUserInfo(profileData);
  })
  .catch((err) => console.error(err));

/* PATCH Profile Edit Function */
function handleProfileEditSubmit(profileInputValues) {
  editProfileModal.setLoading(true);
  const userData = {
    name: profileInputValues.title,
    about: profileInputValues.description,
  };

  api
    .editUserInfo(userData.name, userData.about)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      editProfileModal.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      editProfileModal.setLoading(false);
    });
}

/* PATCH Profile Avatar Function */
function handleAvatarSubmit({ url }) {
  updateAvatarModal.setLoading(true);

  api
    .updateAvatar(url)
    .then((res) => {
      userInfo.updateAvatar(url);
      updateAvatarModal.reset();
      updateAvatarModal.close();
      console.log("Success:", res);
    })
    .catch((err) => {
      console.error("Error updating profile avatar:", err);
    })
    .finally(() => {
      updateAvatarModal.setLoading(true, "Save");
    });
}

/* POST Add Place Function */
function handleNewPlaceSubmit(placeCardData) {
  addPlaceModal.setLoading(true);
  const cardData = {
    name: placeCardData.title,
    link: placeCardData.url,
  };

  api
    .addNewPlace(cardData.name, cardData.link)
    .then((newPlaceCard) => {
      const cardElement = getCardElement({
        name: newPlaceCard.name,
        link: newPlaceCard.link,
        _id: newPlaceCard._id,
      });
      section.addItem(cardElement);
      addPlaceModal.close();
      addPlaceModal.reset();
    })
    .catch((err) => {
      console.error("Error adding new place:", err);
    })
    .finally(() => {
      addPlaceModal.setLoading(false);
      addPlaceValidation.disableButton();
    });
}

function handleLikeReact(likeReact, likeStatus, cardId) {
  if (likeStatus) {
    api
      .removeLikeReact(cardId)
      .then(() => {
        likeReact.classList.remove("card__react-button_active");
      })
      .catch((error) => console.error("Error removing like reaction:", error));
  } else {
    api
      .addLikeReact(cardId)
      .then(() => {
        likeReact.classList.add("card__react-button_active");
      })
      .catch((error) => console.error("Error adding like reaction:", error));
  }
}

/* Edit Profile Button Listener */
profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  editProfileModal.open();
  profileEditValidation.resetValidation();
});

/* Add Place Button Listener */
placesAddBtn.addEventListener("click", () => {
  addPlaceModal.open();
});

avatarUpdateBtn.addEventListener("click", () => {
  updateAvatarModal.open();
});
