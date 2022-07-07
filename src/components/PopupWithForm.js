import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__submit-btn");
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, textMessage) {
    if (isLoading) {
      this._submitButton.textContent = textMessage;
    } else {
      this.close();
      this._submitButton.textContent = this._submitButtonText;
    }
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
    });
  }
}
