export default class UserInfo {
  constructor(profilenName, profileSelector) {
    this._profileName = document.querySelector(".profile__title");
    this._profileJob = document.querySelector(".profile__description");
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}
