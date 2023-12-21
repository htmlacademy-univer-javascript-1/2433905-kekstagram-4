import { getRandomInteger, createRandomId, getId } from './utils.js';

const COMMENTS_MAX = 30;
const COUNT_PHOTO = 25;
const Likes = {
  MIN: 15,
  MAX: 200
};
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Настя', 'Алена', 'Алина', 'Лера', 'Ваня', 'Максим', 'Виктор', 'Джонни'];

const description = ['Love', 'Красивая я', 'Лучший день', 'Что за лев этот тигр', 'Доброе утро', 'Как вам?', 'Природа'];

const VALID_CHARS = /^#[a-zа-яё0-9]{1,19}$/i;

const TAG_MAX_COUNT = 5;

const TagsErrorMessages = {
  NOT_UNIQUE: 'Хэштеги должны не повторяться',
  NOT_VALID: 'Хэштег должен начинаться с # и состоять только из букв русского или английского алфавита или цифр',
  REACHED_MAX_COUNT: 'Максимальное число хэштегов: 5'
};

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

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

const generateCommentId = getId();
const generateId = createRandomId(1, COUNT_PHOTO);

const addComment = () => ({
  id: generateCommentId(1, COUNT_PHOTO),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: messages[getRandomInteger(0, messages.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const addPhotos = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({ length: getRandomInteger(0, COMMENTS_MAX) }, addComment)
});

const getPhoto = () => {
  const photo = Array.from({ length: COUNT_PHOTO }, () => addPhotos(generateId()));
  return photo;
};

export { getPhoto, VALID_CHARS, TAG_MAX_COUNT, TagsErrorMessages, SCALE_STEP, DEFAULT_SCALE, MIN_SCALE, MAX_SCALE, Effects, Methods, Route, BASE_URL, ServerErrorText, SubmitButtonElementText };
