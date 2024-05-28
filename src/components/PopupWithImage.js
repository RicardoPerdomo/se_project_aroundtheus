import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__preview_image");
    this._description = this._popupElement.querySelector(
      ".modal__preview_text"
    );
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._description.textContent = data.name;
  }
}

export default PopupWithImage;
