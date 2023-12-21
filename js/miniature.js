import { showBigPicture } from './fullSizePicture.js';
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
let pictures;

const onPicturesContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement) {
    evt.preventDefault();
    const id = targetElement.dataset.id;
    const thumbnail = pictures.find((picture) => picture.id === +id);
    showBigPicture(thumbnail);
  }
};

const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;
  return thumbnail;
};

const clearPhotos = () => {
  const picturesElements = document.querySelectorAll('.picture');
  picturesElements.forEach((picture) => {
    picture.remove();
  });
  pictures = [];
};

const renderPictures = (photos) => {
  clearPhotos();
  pictures = photos;
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });
  picturesList.appendChild(fragment);
  picturesList.addEventListener('click', onPicturesContainerClick);
};

export { renderPictures };
