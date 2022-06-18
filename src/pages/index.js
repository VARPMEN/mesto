import "./index.css";

import { Card } from "../components/Card.js";
import {
  initialElements,
  buttonEdit,
  buttonAdd,
  popupFormChPop,
  popupFormAdPop,
  inputName,
  inputJob,
  validatorOptions,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

function createCard(data) {
  return new Card(
    {
      item: data,
      handleCardClick: () => {
        const createPopupImage = new PopupWithImage(".popup_photo_fullsize");
        createPopupImage.open(data);
        createPopupImage.setEventListeners();
      },
    },
    "#element"
  ).generateCard();
}

function createFormValidator(form) {
  return new FormValidator(validatorOptions, form);
}

const addFormValitation = createFormValidator(popupFormAdPop);
const editFormValitation = createFormValidator(popupFormChPop);

addFormValitation.enableValidation();
editFormValitation.enableValidation();

const renderContainer = new Section(
  {
    items: initialElements,
    renderer: (items) => {
      const card = createCard(items);
      renderContainer.addItem(card);
    },
  },
  ".elements"
);

renderContainer.renderItems();

const userInfo = new UserInfo({
  userName: ".profile__user-name",
  userInfo: ".profile__user-job",
});

const generateAddPopup = new PopupWithForm(".popup_add_element", {
  submitForm: (inputs) => {
    renderContainer.addItem(createCard(inputs));
  },
});

generateAddPopup.setEventListeners();

const generateEditPopup = new PopupWithForm(".popup_edit_profile", {
  submitForm: (items) => {
    userInfo.setUserInfo(items);
  },
});

generateEditPopup.setEventListeners();

buttonAdd.addEventListener("click", () => {
  addFormValitation.resetValidation();
  generateAddPopup.open();
});

buttonEdit.addEventListener("click", () => {
  editFormValitation.resetValidation();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.info;
  generateEditPopup.open();
});
