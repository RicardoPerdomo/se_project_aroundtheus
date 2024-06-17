export default class UserInfo {
  constructor() {
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__image");
  }

  updateAvatar(image) {
    this._profileAvatar.src = image;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    if (avatar) {
      this._profileAvatar.src = avatar;
      this._profileAvatar.alt = name;
    } else {
      this._profileAvatar.src = "./images/avatar_defaultt.jpg";
    }
  }
}
