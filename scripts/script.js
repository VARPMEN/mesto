let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let editBtn = profile.querySelector('.profile__edit-button');
let closeBtn = popup.querySelector('.popup__close-btn');

let popupForm = popup.querySelector('.popup__form');
let userName = profile.querySelector('.profile__user-name');
let userJob = profile.querySelector('.profile__user-job');
let inputName = popup.querySelector('.popup__input_text_user-name');
let inputJob = popup.querySelector('.popup__input_text_user-job');

function inputText() {
  inputName.value = userName.innerText;
  inputJob.value = userJob.innerText;
}

function openPopupClick () {
  inputText();
  popup.classList.add('popup_opened');
}

function closePopupClick () {
  popup.classList.remove('popup_opened');
}

function popupSubmitChangeText(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopupClick();
}


popupForm.addEventListener('submit', popupSubmitChangeText);
editBtn.addEventListener('click', openPopupClick);
closeBtn.addEventListener('click', closePopupClick);