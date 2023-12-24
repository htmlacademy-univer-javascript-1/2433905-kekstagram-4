import { showImageModal } from './form.js';
import { isEscapeKey } from './utils.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const hideErrorMessage = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer) {
    const errorButton = document.querySelector('.error__button');
    errorButton.removeEventListener('click', onErrorButtonClick);

    document.removeEventListener('keydown', onErrorMessageEscape);
    document.removeEventListener('click', onErrorMessageClick);
    errorContainer.remove();
  }
};

function onErrorMessageClick(evt) {
  const errorContainer = document.querySelector('.error__button');

  if (evt.target !== errorContainer) {
    hideErrorMessage();
  }
}

function onErrorButtonClick() {
  showImageModal();
}

const showErrorMessage = () => {
  const message = errorMessage.cloneNode(true);
  const errorButton = message.querySelector('.error__button');

  document.addEventListener('keydown', onErrorMessageEscape);
  document.addEventListener('click', onErrorMessageClick);
  errorButton.addEventListener('click', onErrorButtonClick);

  document.body.append(message);
};

const hideSuccessMessage = () => {
  const successContainer = document.querySelector('.success');
  document.removeEventListener('keydown', onSuccessMessageEscape);

  if (successContainer) {
    document.querySelector('.success__button').remove('click', onSuccessClick);
    document.removeEventListener('keydown', onSuccessMessageEscape);
    document.removeEventListener('click', onSuccessClick);

    successContainer.remove();
  }
};

function onSuccessClick(evt) {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    hideSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const message = successMessage.cloneNode(true);

  message.querySelector('.success__button').addEventListener('click', onSuccessClick);

  document.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessMessageEscape);
  document.body.append(message);
};

function onSuccessMessageEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

function onErrorMessageEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorMessage();
    document.removeEventListener('keydown', onErrorMessageEscape);
  }
}

export { showErrorMessage, showSuccessMessage };

