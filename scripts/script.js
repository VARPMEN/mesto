const profile = document.querySelector('.profile');
const popupAll = document.querySelectorAll('.popup');
const popupChangeProfile = document.querySelector('.popup_edit_profile');
const popupAddElement = document.querySelector('.popup_add_element');
const popupPhoto = document.querySelector('.popup_photo_fullsize');

let editBtn = profile.querySelector('.profile__edit-button');
let addBtn = profile.querySelector('.profile__add-button');

let popupFormChPop = popupChangeProfile.querySelector('.popup__form');
let popupFormAdPop = popupAddElement.querySelector('.popup__form');

let userName = profile.querySelector('.profile__user-name');
let userJob = profile.querySelector('.profile__user-job');
let inputName = popupChangeProfile.querySelector('.popup__input_text_user-name');
let inputJob = popupChangeProfile.querySelector('.popup__input_text_user-job');

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

popupAll.forEach(function(item) {
  item.querySelector('.popup__close-btn').addEventListener('click', function(){
    item.classList.toggle('popup_opened');
  });
});

  let elements = document.querySelector('.elements');

const elementTemplate = document.querySelector('#element').content;

function elementAdd (text, src) {
  const elementElement = elementTemplate.querySelector('.element').cloneNode(true);
 elementElement.querySelector('.element__name').innerText = text; 
  
elementElement.querySelector('.element__image').src = src;
  
elementElement.querySelector('.element__like-btn').addEventListener('click', function(evt) {    evt.target.classList.toggle('element__like-btn_active');
  });
  
const elementPhoto = elementElement.querySelector('.element__image');
  
elementPhoto.addEventListener('click', function(){
  popupPhoto.classList.add('popup_opened');
  popupPhoto.querySelector('.fullscreen-image__picture').src = src;
  popupPhoto.querySelector('.fullscreen-image__caption').innerText = text;
});

const deleteBtn = elementElement.querySelector('.element__delete-btn');
  
deleteBtn.addEventListener('click', function () {
const elementItem = deleteBtn.closest('.element');
elementItem.remove();
});
  return elementElement;
}

initialElements.forEach(function(item) {
elements.append(elementAdd (item.name, item.link));
});

function openPopupClickChPop() {
  inputName.value = userName.innerText;
  inputJob.value = userJob.innerText;
  popupChangeProfile.classList.add('popup_opened');
}

function popupSubmitChangeText(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popupChangeProfile.classList.remove('popup_opened');  
}

function openPopupClickAdPop(){
  inputTitle.value = '';
  inputImage.value = '';
  popupAddElement.classList.add('popup_opened');
}

function popupSubmitAddElement(evt){
  evt.preventDefault();  
  elements.prepend(elementAdd (inputTitle.value, inputImage.value));
  popupAddElement.classList.remove('popup_opened');
  
}
addBtn.addEventListener('click', openPopupClickAdPop);  
popupFormChPop.addEventListener('submit', popupSubmitChangeText);
editBtn.addEventListener('click', openPopupClickChPop);                       popupFormAdPop.addEventListener('submit', popupSubmitAddElement);