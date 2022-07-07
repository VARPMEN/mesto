import Popup from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  setAction(action) {
    this._handleClickAction = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("click", (evt) => {
      evt.preventDefault();

      this._handleClickAction();
    });
  }
}
