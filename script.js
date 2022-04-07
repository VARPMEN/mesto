let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let editBtn = profile.querySelector('.profile__edit-button');
let closeBtn = popup.querySelector('.popup__close-btn');
let submitBtn = popup.querySelector('.popup__submit-btn');

let userName = profile.querySelector('.profile__user-name');
let userJob = profile.querySelector('.profile__user-job');
let inputName = popup.querySelector('.popup__input_user-name');
let inputJob = popup.querySelector('.popup__input_user-job');

function inputText() {
  inputName.value = userName.innerText;
  inputJob.value = userJob.innerText;
}

function openPopupClick () {
  inputText();
  popup.classList.add('popup_opened');
}

function closePopupClick () {
  inputText();
  popup.classList.remove('popup_opened');
}

function changeText() {
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopupClick();
}

editBtn.addEventListener('click', openPopupClick);
closeBtn.addEventListener('click', closePopupClick);
submitBtn.addEventListener('click', changeText);