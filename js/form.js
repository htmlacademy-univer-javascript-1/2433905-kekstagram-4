import { TAG_MAX_COUNT, VALID_CHARS, TagsErrorMessages, SubmitButtonElementText, FILE_TYPES } from './constants.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { isEscapeKey, showAlert } from './utils.js';
import { showErrorMessage, showSuccessMessage } from './message-form.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imageOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseOverlayElement = uploadFormElement.querySelector('#upload-cancel');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentsFieldElement = uploadFormElement.querySelector('.text__description');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');


const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getSplitTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const areCharsValid = (value) => getSplitTags(value).every((tag) => VALID_CHARS.test(tag));

const hasReachedHashtagLimit = (value) => getSplitTags(value).length <= TAG_MAX_COUNT;

const areTagsUnique = (value) => {
  const lowerCaseTags = getSplitTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagsFieldElement,
  areCharsValid,
  TagsErrorMessages.NOT_VALID,
  1,
  true
);

pristine.addValidator(
  hashtagsFieldElement,
  hasReachedHashtagLimit,
  TagsErrorMessages.REACHED_MAX_COUNT,
  2,
  true
);

pristine.addValidator(
  hashtagsFieldElement,
  areTagsUnique,
  TagsErrorMessages.NOT_UNIQUE,
  3,
  true
);

const reset = () => {
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

const hideImageModal = () => {
  imageOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');

  reset();
  buttonCloseOverlayElement.removeEventListener('click', hideImageModal);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showImageModal = () => {
  imageOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  resetScale();

  buttonCloseOverlayElement.addEventListener('click', hideImageModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

commentsFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

hashtagsFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const blockSubmitButton = () => {
  buttonCloseOverlayElement.disabled = true;
  buttonCloseOverlayElement.textContent = SubmitButtonElementText.SENDING;
};

const unblockSubmitButton = () => {
  buttonCloseOverlayElement.disabled = false;
  buttonCloseOverlayElement.textContent = SubmitButtonElementText.IDLE;
};

const onFormSubmit = () => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(formData)
        .then(() => {
          hideImageModal();
          showSuccessMessage();
        })
        .catch(() => {
          hideImageModal();
          showErrorMessage();
          showAlert('Данные не отправились');
        })
        .finally(unblockSubmitButton);
    }
  });
};

uploadFileElement.addEventListener('input', showImageModal);

const showImage = () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (file && isValidType) {
    const imageUrl = URL.createObjectURL(file);
    imagePreviewElement.src = imageUrl;

    effectsPreviewElement.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${imageUrl}')`;
    });
  }
};

const onUploadChange = () => {
  showImage();
};

uploadFileElement.addEventListener('change', onUploadChange);

export { onFormSubmit, showImageModal };
