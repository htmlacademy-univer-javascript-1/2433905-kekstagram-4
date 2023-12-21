import { Filters, PICTURES_COUNT } from './data.js';
import { renderPictures } from './miniature.js';
import { debounce } from './utils.js';

const filterFormElement = document.querySelector('.img-filters');
let currentFilter = Filters.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (firstPicture, secondPicture) => secondPicture.comments.length - firstPicture.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filters.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filters.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const onFilterClick = (callback) => {
  filterFormElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    currentFilter = clickedButton.id;
    const currentActiveFilter =
      filterFormElement.querySelector('.img-filters__button--active');
    currentActiveFilter.classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    callback(getFilteredPictures());
  });
};

const showFilters = (loadedPictures) => {
  filterFormElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];

  const debouncedRender = debounce((photos) => {
    renderPictures(photos);
  });

  onFilterClick(debouncedRender);
};

export { showFilters };
