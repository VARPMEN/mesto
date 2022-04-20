let profile = document.querySelector('.profile');
let popupEditProfile = document.querySelector('.popup_edit_profile');
let popupAddElement = document.querySelector('.popup_add_element');

let editBtn = profile.querySelector('.profile__edit-button');
let addBtn = profile.querySelector('.profile__add-button');
let closeBtnEdPop = popupEditProfile.querySelector('.popup__close-btn');
let closeBtnAdPop = popupAddElement.querySelector('.popup__close-btn');


let popupFormEdPop = popupEditProfile.querySelector('.popup__form');
let popupFormAdPop = popupAddElement.querySelector('.popup__form');

let userName = profile.querySelector('.profile__user-name');
let userJob = profile.querySelector('.profile__user-job');
let inputName = popupEditProfile.querySelector('.popup__input_text_user-name');
let inputJob = popupEditProfile.querySelector('.popup__input_text_user-job');

let inputTitle = popupAddElement.querySelector('.popup__input_text_title');
let inputImage = popupAddElement.querySelector('.popup__input_src_image');

const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

initialElements.forEach(function(item) {
  let elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  elementElement.querySelector('.element__name').innerText = item.name;
  elementElement.querySelector('.element__image').src = item.link;
  elementElement.querySelector('.element__image').alt = item.name;
  
  elements.append(elementElement);
});

function inputText() {
  inputName.value = userName.innerText;
  inputJob.value = userJob.innerText;
}

function openPopupClickEdPop () {
  inputText();
  popupEditProfile.classList.add('popup_opened');
}

function closePopupClickEdPop () {
  popupEditProfile.classList.remove('popup_opened');
}

function popupSubmitEditText(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopupClickEdPop();
}

function openPopupClickAdPop() {
  popupAddElement.classList.add('popup_opened');
}

function closePopupClickAdPop() {
  popupAddElement.classList.remove('popup_opened');
  inputTitle.value = '';
  inputImage.value = '';
}

function popupSubmitAddElement(evt) {
  evt.preventDefault();
  let elementElement = elementTemplate.querySelector('.element').cloneNode(true);
  elementElement.querySelector('.element__name').innerText = inputTitle.value;
  elementElement.querySelector('.element__image').src = inputImage.value;
  elementElement.querySelector('.element__image').alt = inputTitle.name;
  elements.prepend(elementElement);
  closePopupClickAdPop();
}

editBtn.addEventListener('click', openPopupClickEdPop);
closeBtnEdPop.addEventListener('click', closePopupClickEdPop);
popupFormEdPop.addEventListener('submit', popupSubmitEditText);

addBtn.addEventListener('click', openPopupClickAdPop);
closeBtnAdPop.addEventListener('click', closePopupClickAdPop);
popupFormAdPop.addEventListener('submit', popupSubmitAddElement);