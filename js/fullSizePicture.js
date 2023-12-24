import { isEscapeKey } from './utils.js';
import { COMMENTS_STEP } from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const commentTemplate = document.querySelector('.social__comment');
const commentsCounter = bigPicture.querySelector('.social__comment-count');

let shownCommentsCount = COMMENTS_STEP;
let commentsArray = [];

const createComment = (comment) => {
  const { avatar, name, message } = comment;
  const currentComment = commentTemplate.cloneNode(true);

  currentComment.querySelector('.social__picture').src = avatar;
  currentComment.querySelector('.social__picture').alt = name;
  currentComment.querySelector('.social__text').textContent = message;
  return currentComment;
};

const changeCommentCount = (currentShownCommentsCount, pictureCommentsCount) => {
  commentsCounter.textContent = `${currentShownCommentsCount} из ${pictureCommentsCount} комментариев`;
};


const createComments = () => {
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  const fragment = document.createDocumentFragment();
  const slicedComments = commentsArray.slice(0, shownCommentsCount);

  for (const comment of slicedComments) {
    fragment.append(createComment(comment));
  }

  if (shownCommentsCount >= commentsArray.length) {
    shownCommentsCount = commentsArray.length;
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }

  changeCommentCount(shownCommentsCount, commentsArray.length);
  commentsList.append(fragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  shownCommentsCount = COMMENTS_STEP;
  commentsArray = [];
};

function onCommentsLoaderClick() {
  shownCommentsCount += COMMENTS_STEP;
  createComments();
}

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeBigPicture();
    document.removeEventListener('keydown', onBigPictureEscKeydown); // удаляем обработчик
  }
};

const onBigPictureCancelClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onBigPictureEscKeydown); // удаляем обработчик эскейпа
  pictureCloseButton.removeEventListener('click', onBigPictureCancelClick); // и обработчик клика
};

const showBigPicture = (picture) => {
  const { url, description, likes, comments } = picture;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  commentsCount.textContent = comments.length;
  commentsArray = comments;

  createComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onBigPictureEscKeydown);
  pictureCloseButton.addEventListener('click', onBigPictureCancelClick);
};

export { showBigPicture };

