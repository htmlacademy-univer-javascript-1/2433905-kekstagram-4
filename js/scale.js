import { SCALE_STEP, DEFAULT_SCALE, MIN_SCALE, MAX_SCALE } from './constants.js';

const imageUploadElement = document.querySelector('.img-upload');
const scaleInputElement = imageUploadElement.querySelector('.scale__control--value');
const smallerButtonElement = imageUploadElement.querySelector('.scale__control--smaller');
const biggerButtonElement = imageUploadElement.querySelector('.scale__control--bigger');
const image = imageUploadElement.querySelector('.img-upload__preview img');

const changeScale = (value) => {
  scaleInputElement.value = `${value}%`;
  image.style.transform = `scale(${value / 100})`;
};

const smallerButtonOnClick = () => {
  const newValue = Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE);
  changeScale(newValue);
};

const biggerButtonOnClick = () => {
  const newValue = Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE);
  changeScale(newValue);
};

const resetScale = () => {
  changeScale(DEFAULT_SCALE);
};

smallerButtonElement.addEventListener('click', smallerButtonOnClick);
biggerButtonElement.addEventListener('click', biggerButtonOnClick);

export { resetScale };
