const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const TAG_MAX_COUNT = 5;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const VALID_CHARS = /^#[a-zа-яё0-9]{1,19}$/i;

const TagsErrorMessages = {
  NOT_UNIQUE: 'Хэштеги должны не повторяться',
  NOT_VALID: 'Хэштег должен начинаться с # и состоять только из букв русского или английского алфавита или цифр',
  REACHED_MAX_COUNT: 'Максимальное число хэштегов: 5'
};

const Effects = {
  NONE: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  CHROME: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  SEPIA: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  MARVIN: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  PHOBOS: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  HEAT: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const ServerErrorText = {
  GET_DATA: '',
  SEND_DATA: '',
};

const SubmitButtonElementText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const PICTURES_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export {  VALID_CHARS, TAG_MAX_COUNT, TagsErrorMessages, SCALE_STEP, DEFAULT_SCALE, MIN_SCALE, MAX_SCALE, Effects, Methods, Route, BASE_URL, ServerErrorText, SubmitButtonElementText, PICTURES_COUNT, Filters, FILE_TYPES };
