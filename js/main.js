import { renderPictures } from './miniature.js';
import { getData, sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message-form.js';
import './scale.js';
import { formOnSubmit, hideImageModal } from './form.js';
import './effects.js';

formOnSubmit(async (data) => {
  try {
    await sendData(data);
    hideImageModal();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  }
});

getData().then((data) => {
  renderPictures(data);
});

