const COMMENTS_MAX = 30;
const COUNT_PHOTO = 25;
const Likes = {
  MIN: 15,
  MAX: 200
};
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Настя', 'Алена', 'Алина', 'Лера', 'Ваня', 'Максим', 'Виктор', 'Джонни'];

const description = ['Love', 'Красивая я', 'Лучший день', 'Что за лев этот тигр', 'Доброе утро', 'Как вам?', 'Природа'];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomId (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generate = createRandomId(1, COUNT_PHOTO);


const addComment = () => ({
  id: generate(1, COUNT_PHOTO),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: messages[getRandomInteger(0, messages.length - 1)],
  name: NAMES[getRandomInteger(0, name.length - 1)]
});

const addPhotos = () => ({
  id: generate(1, COUNT_PHOTO),
  url: `photos/${generate()}.jpg`,
  description: description[getRandomInteger(0, description.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, addComment)
});

const getPhoto = () => {
  const photo = Array.from({length: COUNT_PHOTO}, addPhotos);
  return photo;
};

getPhoto();
