export const initialElements = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profile = document.querySelector(".profile");
const popupChangeProfile = document.querySelector(".popup_edit_profile");
const popupAddElement = document.querySelector(".popup_add_element");
export const buttonEdit = profile.querySelector(".profile__edit-button");
export const buttonAdd = profile.querySelector(".profile__add-button");
export const popupFormChPop = popupChangeProfile.querySelector(".popup__form");
export const popupFormAdPop = popupAddElement.querySelector(".popup__form");
export const inputName = popupChangeProfile.querySelector(
  ".popup__input_text_user-name"
);
export const inputJob = popupChangeProfile.querySelector(
  ".popup__input_text_user-job"
);

export const validatorOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_invalid",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__error_active",
};
