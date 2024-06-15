export default class UserInfo {
  constructor(profileName, profileJob, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }
  updateAvatar(image) {
    this._profileAvatar.src = image;
    this._profileAvatar.alt = this._profileName.textContent;
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
      this.updateAvatar(avatar);
    } else {
      this._profileAvatar.src = "./images/Avatar.jpg";
      this._profileAvatar.alt = name;
    }
  }
}
