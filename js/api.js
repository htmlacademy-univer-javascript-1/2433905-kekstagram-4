import { BASE_URL, Methods, ServerErrorText, Route } from './data.js';

const load = (route, errorText, method = Methods.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ServerErrorText.GET_DATA);

const sendData = (body) => {
  load(Route.SEND_DATA, ServerErrorText.POST_DATA, Methods.POST, body);
};

export { getData, sendData };
