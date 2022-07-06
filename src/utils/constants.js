const profile = document.querySelector(".profile");
const popupChangeProfile = document.querySelector(".popup_edit_profile");
const popupAddElement = document.querySelector(".popup_add_element");
const popupChangeAvatar = document.querySelector(".popup_change_avatar");
export const avatar = profile.querySelector(".profile__avatar-overlay");
export const buttonEdit = profile.querySelector(".profile__edit-button");
export const buttonAdd = profile.querySelector(".profile__add-button");
export const popupFormChPop = popupChangeProfile.querySelector(".popup__form");
export const popupFormAdPop = popupAddElement.querySelector(".popup__form");
export const popupFormChAvatar =
  popupChangeAvatar.querySelector(".popup__form");
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
