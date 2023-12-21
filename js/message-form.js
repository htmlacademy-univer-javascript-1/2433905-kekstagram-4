import { hideImageModal } from './form.js';
import { isEscapeKey } from './utils.js';
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

const onHideErrorMessage = () => {
  const errorContainer = document.querySelector('.error');
  if (errorContainer) {
    errorContainer.remove();
    document.addEventListener('keydown', hideImageModal);
  }
};

const onErrorMouseClick = (evt) => {
  const errorContainer = document.querySelector('.success_button');
  if (evt.target !== errorContainer) {
    onHideErrorMessage();
  }
};

const showErrorMessage = () => {
  const message = errorMessageElement.cloneNode(true);
  message.querySelector('.error__button').addEventListener('click', onHideErrorMessage);
  document.addEventListener('keydown', onEscapeError);
  document.addEventListener('click', onErrorMouseClick);
  document.removeEventListener('keydown', hideImageModal);
  document.body.append(message);
};

function onEscapeError(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onHideErrorMessage();
  }
}

const hideSuccessMessage = () => {
  document.removeEventListener('keydown', onEscapeSuccess);
  const successContainer = document.querySelector('.success');
  if (successContainer) {
    successContainer.remove();
  }
};

const onSuccessMouseClick = (evt) => {
  const successContainer = document.querySelector('.success__inner');
  if (evt.target !== successContainer) {
    hideSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const message = messageSuccess.cloneNode(true);
  message.querySelector('.success__button').addEventListener('click', hideSuccessMessage);

  document.addEventListener('click', onSuccessMouseClick);
  document.addEventListener('keydown', onEscapeSuccess);
  document.body.append(message);
};

function onEscapeSuccess(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessMessage();
  }
}

export { showErrorMessage, showSuccessMessage };
