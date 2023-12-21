import { Effects } from './constants.js';

const imageUploadElement = document.querySelector('.img-upload');
const imageUploadPreviewElement = imageUploadElement.querySelector('.img-upload__preview img');
const sliderElement = imageUploadElement.querySelector('.img-upload__effect-level');
const effectsFormElement = imageUploadElement.querySelector('.effects');
const effectLevelSliderElement = imageUploadElement.querySelector('.effect-level__slider');
const effectLevelValueElement = imageUploadElement.querySelector('.effect-level__value');
let currentEffect = Effects.NONE;

const hideSlider = () => {
  sliderElement.classList.add('hidden');
};

const showSlider = () => {
  sliderElement.classList.remove('hidden');
};

const changeSlider = () => {
  effectLevelSliderElement.noUiSlider.updateOptions(
    {
      range: {
        min: currentEffect.min,
        max: currentEffect.max
      },
      step: currentEffect.step,
      start: currentEffect.max
    });

  if (currentEffect === Effects.NONE) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = Effects[`${evt.target.value}`.toUpperCase()];
    imageUploadPreviewElement.className = `effects__preview--${currentEffect.name}`;
    changeSlider();
  }
};


const onUpdateValueSlider = () => {
  const sliderValue = effectLevelSliderElement.noUiSlider.get();
  if (currentEffect === Effects.NONE) {
    imageUploadPreviewElement.style.filter = Effects.NONE.style;
    sliderElement.classList.add('hidden');
  }
  else {
    imageUploadPreviewElement.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }

  effectLevelValueElement.value = sliderValue;
};

const resetEffects = () => {
  currentEffect = Effects.NONE;
  changeSlider();
};


noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: Effects.NONE.min,
    max: Effects.NONE.max
  },
  start: Effects.NONE.max,
  step: Effects.NONE.step,
  connect: 'lower'
});

effectsFormElement.addEventListener('change', onEffectsChange);
effectLevelSliderElement.noUiSlider.on('update', onUpdateValueSlider);

export { resetEffects };
