import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputsValues() {
    this._inputContainer = {};
    this._form.querySelectorAll(".popup__input").forEach((input) => {
      this._inputContainer[input.name] = input.value;
    });
    return this._inputContainer;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitForm(this._getInputsValues());

      this.close();
    });
  }
}
