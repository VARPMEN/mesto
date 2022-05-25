import { Card } from "./Card.js";
import { initialElements } from "./data.js";
import { FormValidator } from "./FormValidator.js";

const profile = document.querySelector(".profile");
const popupAll = document.querySelectorAll(".popup");
const popupChangeProfile = document.querySelector(".popup_edit_profile");
const popupAddElement = document.querySelector(".popup_add_element");
const submitBtnPopupAddElement =
  popupAddElement.querySelector(".popup__submit-btn");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");
const popupFormChPop = popupChangeProfile.querySelector(".popup__form");
const popupFormAdPop = popupAddElement.querySelector(".popup__form");
const userName = profile.querySelector(".profile__user-name");
const userJob = profile.querySelector(".profile__user-job");
const inputName = popupChangeProfile.querySelector(
  ".popup__input_text_user-name"
);
const inputJob = popupChangeProfile.querySelector(
  ".popup__input_text_user-job"
);
const inputTitle = popupAddElement.querySelector(".popup__input_text_title");
const inputImage = popupAddElement.querySelector(".popup__input_src_image");
const elementContainer = document.querySelector(".elements");

const validatorOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_invalid",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__error_active",
};

const addFormValidator = createFormValidator(popupFormAdPop);

function createCard(title, imageLink) {
  return new Card(title, imageLink, "#element", popupOpen).generateCard();
}

function createFormValidator(form) {
  return new FormValidator(validatorOptions, form);
}

addFormValidator.enableValidation();
createFormValidator(popupFormChPop).enableValidation();

function popupOpen(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", pressEscClosePopup);
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", pressEscClosePopup);
}

function clickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(evt.currentTarget);
  }
}

const pressEscClosePopup = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    popupClose(popup);
  }
};

popupAll.forEach(function (item) {
  item
    .querySelector(".popup__close-btn")
    .addEventListener("click", function () {
      popupClose(item);
    });

  item.addEventListener("click", clickOverlay);
});

initialElements.forEach(function (item) {
  elementContainer.append(createCard(item.name, item.link));
});

function openClickEditPopup() {
  const userNameText = userName.textContent;
  const userJobText = userJob.textContent;

  inputName.value = userNameText;
  inputJob.value = userJobText;

  popupOpen(popupChangeProfile);
}

function popupSubmitChangeText(evt) {
  evt.preventDefault();

  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;

  popupClose(popupChangeProfile);
}

function openClickAddCardPopup() {
  popupFormAdPop.reset();
  popupOpen(popupAddElement);
  addFormValidator.toggleButtonState();
}

function popupSubmitAddElement(evt) {
  evt.preventDefault();

  elementContainer.prepend(createCard(inputTitle.value, inputImage.value));

  popupClose(popupAddElement);
}

buttonAdd.addEventListener("click", openClickAddCardPopup);
popupFormChPop.addEventListener("submit", popupSubmitChangeText);
buttonEdit.addEventListener("click", openClickEditPopup);
popupFormAdPop.addEventListener("submit", popupSubmitAddElement);
