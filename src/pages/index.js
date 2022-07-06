import "./index.css";

import { Api } from "../components/Api";
import { Card } from "../components/Card.js";
import {
  avatar,
  buttonEdit,
  buttonAdd,
  popupFormChPop,
  popupFormAdPop,
  popupFormChAvatar,
  inputName,
  inputJob,
  validatorOptions,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "e243774a-b776-426b-a71e-7cfaf249471c",
    "Content-Type": "application/json",
  },
});

let userId;

const createRemovePopup = new PopupWithConfirmation(".popup_confirm-remove");
const createPopupImage = new PopupWithImage(".popup_photo_fullsize");
createPopupImage.setEventListeners();
createRemovePopup.setEventListeners();

function createCard(data) {
  const card = new Card(
    {
      item: data,
      handleCardClick: () => {
        createPopupImage.open(data);
      },
      handleDeleteButtonClick: () => {
        createRemovePopup.open();
        createRemovePopup.setAction(() => {
          api
            .removeCard(data._id)
            .then(() => {
              card.removeCard();
              createRemovePopup.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      handleActivationLikeClick: () => {
        api
          .sendLike(data._id)
          .then((info) => {
            card.changeLikeStatus();
            card.eventCounterLikes(info.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDisactivationLikeClick: () => {
        api
          .removeLike(data._id)
          .then((info) => {
            card.changeLikeStatus();
            card.eventCounterLikes(info.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      userInfo: userId,
    },
    "#element"
  );

  return card;
}

function createFormValidator(form) {
  return new FormValidator(validatorOptions, form);
}

const addFormValitation = createFormValidator(popupFormAdPop);
const editFormValitation = createFormValidator(popupFormChPop);
const changeAvatarFormValitation = createFormValidator(popupFormChAvatar);

addFormValitation.enableValidation();
editFormValitation.enableValidation();
changeAvatarFormValitation.enableValidation();

const renderContainer = new Section(
  {
    renderer: (items) => {
      const card = createCard(items).generateCard();
      renderContainer.addItem(card);
    },
  },
  ".elements"
);

api.getInitialCards().then((data) => {
  return renderContainer.renderItems(data);
});

const userInfo = new UserInfo({
  userName: ".profile__user-name",
  userInfo: ".profile__user-job",
  userAvatar: ".profile__avatar",
});

api.getUserInfo().then((info) => {
  userInfo.setUserInfo(info);
  userId = info._id;
});

const generateAddPopup = new PopupWithForm(".popup_add_element", {
  submitForm: (inputs) => {
    generateAddPopup.renderLoading(true, "Сохранить...");
    api
      .setNewCard(inputs)
      .then((card) => {
        const item = createCard(card).generateCard();
        renderContainer.addItem(item);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        generateAddPopup.close();
        generateAddPopup.renderLoading(false, "");
      });
  },
});

generateAddPopup.setEventListeners();

const generateEditPopup = new PopupWithForm(".popup_edit_profile", {
  submitForm: (inputs) => {
    generateEditPopup.renderLoading(true, "Меняем...");
    api
      .setUserInfo(inputs)
      .then((item) => {
        userInfo.setUserInfo(item);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        generateEditPopup.close();
        generateEditPopup.renderLoading(false, "");
      });
  },
});

generateEditPopup.setEventListeners();

const generateAvatarPopup = new PopupWithForm(".popup_change_avatar", {
  submitForm: (inputs) => {
    generateAvatarPopup.renderLoading(true, "Обновляем...");
    api
      .setUserAvatar(inputs)
      .then((item) => {
        userInfo.setUserAvatar(item);
        generateAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        generateAvatarPopup.close();
        generateAvatarPopup.renderLoading(false, "");
      });
  },
});

generateAvatarPopup.setEventListeners();

avatar.addEventListener("click", () => {
  changeAvatarFormValitation.resetValidation();
  generateAvatarPopup.open();
});

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
