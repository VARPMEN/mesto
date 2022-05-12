const profile = document.querySelector(".profile");
const popupAll = document.querySelectorAll(".popup");
const popupChangeProfile = document.querySelector(".popup_edit_profile");
const popupAddElement = document.querySelector(".popup_add_element");
const popupPhoto = document.querySelector(".popup_photo_fullsize");
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

const initialElements = [
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

function popupOpen(popup) {
  popup.classList.add("popup_opened");

  popupEventEscBtn(popup);
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");

  popupEventEscBtn(popup);
}

function clickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(evt.currentTarget);
  }
}

const popupEventEscBtn = (popup) => {
  const EscPressClosePopup = (evt) => {
    if (evt.key === "Escape") {
      popupClose(popup);
    }
  }

  if (popup.classList.contains("popup_opened")) {
    document.addEventListener("keydown", EscPressClosePopup);
  } else {
    document.removeEventListener("keydown", EscPressClosePopup); 
  }
}

popupAll.forEach(function (item) {
  item
    .querySelector(".popup__close-btn")
    .addEventListener("click", function () {
      popupClose(item);
    });

  item.addEventListener("click", clickOverlay);
});

const elementContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;

function elementAdd(text, src) {
  const elementElement = elementTemplate
    .querySelector(".element")
    .cloneNode(true);
  const elementPhoto = elementElement.querySelector(".element__image");

  elementElement.querySelector(".element__name").textContent = text;

  elementPhoto.src = src;
  elementPhoto.alt = text;

  elementPhoto.addEventListener("click", function () {
    popupOpen(popupPhoto);
    const pictureFullscreen = popupPhoto.querySelector(
      ".fullscreen-image__picture"
    );

    pictureFullscreen.src = src;
    pictureFullscreen.alt = text;

    popupPhoto
      .querySelector(".fullscreen-image__caption")
      .textContent = text;
  });

  return elementElement;
}

initialElements.forEach(function (item) {
  elementContainer.append(elementAdd(item.name, item.link));
});

function openPopupClickChPop() {
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

function openPopupClickAdPop() {
  inputTitle.value = "";
  inputImage.value = "";

  popupOpen(popupAddElement);
}

function popupSubmitAddElement(evt) {
  evt.preventDefault();

  elementContainer.prepend(elementAdd(inputTitle.value, inputImage.value));

  popupClose(popupAddElement);
}

elementContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("element__like-btn")){
    evt.target.classList.toggle("element__like-btn_active");
  }

  if (evt.target.classList.contains("element__delete-btn-icon")){
    evt.target.closest(".element").remove();
  }
});

buttonAdd.addEventListener("click", openPopupClickAdPop);
popupFormChPop.addEventListener("submit", popupSubmitChangeText);
buttonEdit.addEventListener("click", openPopupClickChPop);
popupFormAdPop.addEventListener("submit", popupSubmitAddElement);
