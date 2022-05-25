import { popupPhoto, pictureFullscreen, imageCaption } from "./utils.js";

class Card {
  constructor(title, imageLink, cardSelector, openPopup) {
    this._title = title;
    this._cardSelector = cardSelector;
    this._imageLink = imageLink;
    this._openPopup = openPopup;
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
    this._openPopup(popupPhoto);

    pictureFullscreen.src = this._imageLink;
    pictureFullscreen.alt = this._title;

    imageCaption.textContent = this._title;
  }

  _eventLikeButton(evt) {
    if (evt.target.classList.contains("element__like-btn")) {
      evt.target.classList.toggle("element__like-btn_active");
    }
  }

  _eventRemoveCard(evt) {
    if (evt.target.classList.contains("element__delete-btn-icon")) {
      this._element.remove();
      this._element = null;
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._imageLink;
    elementImage.alt = this._title;
    this._element.querySelector(".element__name").textContent = this._title;

    return this._element;
  }
}

export { Card };
