import { renderPictures } from './miniature.js';
import { getData } from './api.js';
import './scale.js';
import { onFormSubmit } from './form.js';
import './effects.js';
import { showFilters } from './filter.js';
import { showAlert } from './utils.js';

onFormSubmit();

getData().then((data) => {
  renderPictures(data);
  showFilters(data);
}).catch(() => {
  showAlert('Данные не загрузились с сервера');
});


