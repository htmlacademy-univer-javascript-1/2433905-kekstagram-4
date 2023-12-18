import { TAG_MAX_COUNT, VALID_CHARS, TagsErrorMessages } from './data.js';
import { isEscapeKey } from './utils.js';
const body = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const imageOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const buttonCloseOverlayElement = uploadFormElement.querySelector('#upload-cancel');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentsFieldElement = uploadFormElement.querySelector('.text__description');


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
};

const hideImageModal = () => {
  imageOverlayElement.classList.add('hidden');
  body.classList.remove('modal-open');

  reset();
  buttonCloseOverlayElement.removeEventListener('click', hideImageModal);
};

const documentOnKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideImageModal();
    document.removeEventListener('keydown', documentOnKeydown);
  }
};

const showImageModal = () => {
  imageOverlayElement.classList.remove('hidden');
  body.classList.add('modal-open');

  buttonCloseOverlayElement.addEventListener('click', hideImageModal);
  document.addEventListener('keydown', documentOnKeydown);
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

uploadFileElement.addEventListener('input', showImageModal);
