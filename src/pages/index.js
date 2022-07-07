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
  selectors,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { showError } from "../utils/utils";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "e243774a-b776-426b-a71e-7cfaf249471c",
    "Content-Type": "application/json",
  },
});

let userId;

const userInfo = new UserInfo({
  userName: selectors.inputUserNameSelector,
  userInfo: selectors.inputUserInfoSelector,
  userAvatar: selectors.inputUserAvatarSelector,
});

const createRemovePopup = new PopupWithConfirmation(
  selectors.popupRemoveCardSelector
);
const createPopupImage = new PopupWithImage(selectors.popupWithImageSelector);
createPopupImage.setEventListeners();
createRemovePopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, data]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    return renderContainer.renderItems(data);
  })
  .catch(showError);

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
            .catch(showError);
        });
      },
      handleActivationLikeClick: () => {
        api
          .sendLike(data._id)
          .then((info) => {
            card.changeLikeStatus();
            card.eventCounterLikes(info.likes.length);
          })
          .catch(showError);
      },
      handleDisactivationLikeClick: () => {
        api
          .removeLike(data._id)
          .then((info) => {
            card.changeLikeStatus();
            card.eventCounterLikes(info.likes.length);
          })
          .catch(showError);
      },
      userInfo: userId,
    },
    selectors.elementId
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
  selectors.elementsId
);

const generateAddPopup = new PopupWithForm(selectors.popupAddElementSelector, {
  submitForm: (inputs) => {
    generateAddPopup.renderLoading(true, "Сохранить...");
    api
      .setNewCard(inputs)
      .then((card) => {
        const item = createCard(card).generateCard();
        renderContainer.addItem(item);
      })
      .catch(showError)
      .finally(() => {
        generateAddPopup.renderLoading(false, "");
      });
  },
});

generateAddPopup.setEventListeners();

const generateEditPopup = new PopupWithForm(
  selectors.popupEditProfileSelector,
  {
    submitForm: (inputs) => {
      generateEditPopup.renderLoading(true, "Меняем...");
      api
        .setUserInfo(inputs)
        .then((item) => {
          userInfo.setUserInfo(item);
        })
        .catch(showError)
        .finally(() => {
          generateEditPopup.renderLoading(false, "");
        });
    },
  }
);

generateEditPopup.setEventListeners();

const generateAvatarPopup = new PopupWithForm(
  selectors.popupChangeAvatarSelector,
  {
    submitForm: (inputs) => {
      generateAvatarPopup.renderLoading(true, "Обновляем...");
      api
        .setUserAvatar(inputs)
        .then((item) => {
          userInfo.setUserAvatar(item);
        })
        .catch(showError)
        .finally(() => {
          generateAvatarPopup.renderLoading(false, "");
        });
    },
  }
);

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
