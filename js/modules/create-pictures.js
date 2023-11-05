import { COMMENTS_MAX, COUNT_PHOTO, Likes, messages, NAMES, description } from './constant.js';
import { getRandomInteger, createRandomId } from './utils.js';

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

export { getPhoto };
