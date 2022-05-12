
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector('#error-title');
  inputElement.classList.add('popup__input_invalid');
  console.log(inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.error-${inputElement.id}`);
  inputElement.classList.remove('popup__input_invalid');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
}

const checkInputValidaty = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement,  inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

function setEventListeners (formElement) {
  const inputList = Array.from(document.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidaty(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    });
      setEventListeners(formElement);
  });
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-btn_invalid');
  } else {
    buttonElement.classList.remove('popup__submit-btn_invalid');
  }
}

enableValidation();