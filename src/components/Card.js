export class Card {
  constructor(
    {
      item,
      handleCardClick,
      handleDeleteButtonClick,
      handleActivationLikeClick,
      handleDisactivationLikeClick,
      userInfo,
    },
    cardSelector
  ) {
    this._title = item.name;
    this._imageLink = item.link;
    this._cardId = item._id;
    this._owner = item.owner;
    this._likes = item.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleActivationLikeClick = handleActivationLikeClick;
    this._handleDisactivationLikeClick = handleDisactivationLikeClick;
    this._userInfo = userInfo;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-btn")
      .addEventListener("click", (evt) => {
        this._eventLikeButton();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
    this._element
      .querySelector(".element__delete-btn-icon")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
  }

  _disactivationRemoveButton() {
    if (!(this._owner._id === this._userInfo)) {
      this._element
        .querySelector(".element__delete-btn")
        .classList.add("element__delete-btn_inactive");
    }
  }

  changeLikeStatus() {
    this._element
      .querySelector(".element__like-btn")
      .classList.toggle("element__like-btn_active");
  }

  _eventLikeButton() {
    if (
      !this._element
        .querySelector(".element__like-btn")
        .classList.contains("element__like-btn_active")
    ) {
      this._handleActivationLikeClick();
    } else {
      this._handleDisactivationLikeClick();
    }
  }

  eventCounterLikes(data) {
    this._element.querySelector(".element__counter-likes").textContent = data;
  }

  removeCard() {
    this._element.closest(".element").remove();
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const elementImage = this._element.querySelector(".element__image");
    elementImage.src = this._imageLink;
    elementImage.alt = this._title;
    this._element.querySelector(".element__name").textContent = this._title;
    if (
      this._likes.find((item) => {
        return this._userInfo === item._id;
      })
    ) {
      this.changeLikeStatus();
    }
    this.eventCounterLikes(this._likes.length);
    this._disactivationRemoveButton();

    return this._element;
  }
}
