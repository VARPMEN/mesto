import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".fullscreen-image__picture");
    this._popupCaption = this._popup.querySelector(
      ".fullscreen-image__caption"
    );
  }

  open(data) {
    super.open();

    this._popupImage.alt = data.name;
    this._popupImage.src = data.link;
    this._popupCaption.textContent = data.name;
  }
}
