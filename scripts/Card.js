import { popupOpen } from "./script.js";

class Card {
  constructor(title, imageLink, cardSelector) {
    this._title = title;
    this._cardSelector = cardSelector;
    this._imageLink = imageLink;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      this._eventLikeButton(evt);
    });

    this._element.addEventListener("click", (evt) => {
      this._eventRemoveCard(evt);
    });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._eventFullsizeScreen();
      });
  }

  _eventFullsizeScreen() {
    const popupPhoto = document.querySelector(".popup_photo_fullsize");

    popupOpen(popupPhoto);
    const pictureFullscreen = popupPhoto.querySelector(
      ".fullscreen-image__picture"
    );

    pictureFullscreen.src = this._imageLink;
    pictureFullscreen.alt = this._title;

    popupPhoto.querySelector(".fullscreen-image__caption").textContent =
      this._title;
  }

  _eventLikeButton(evt) {
    if (evt.target.classList.contains("element__like-btn")) {
      evt.target.classList.toggle("element__like-btn_active");
    }
  }

  _eventRemoveCard(evt) {
    if (evt.target.classList.contains("element__delete-btn-icon")) {
      evt.target.closest(".element").remove();
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._imageLink;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__name").textContent = this._title;

    return this._element;
  }
}

export { Card };
