// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

const loadTemplate = async (path) => {
  const response = await fetch(path);
  const template = response.text();
  return template;
};

export const renderWithTemplate = (template, parentElement, position, callback, data) => {
  parentElement.innerHTML = ``;
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
};

import ExternalServices from './ExternalServices.mjs';
const eService = new ExternalServices();

export const loadHeaderFooter = async () => {
  const footer = await loadTemplate('../partials/footer.html');
  const header = await loadTemplate('../partials/header.html');
  const footerElement = document.querySelector('footer');
  const headerElement = document.querySelector('header');

  renderWithTemplate(header, headerElement, 'afterbegin');
  renderWithTemplate(footer, footerElement, 'afterbegin');

  document.querySelector(`#login`).addEventListener(`click`, () => {
    eService.login();
  });
};

export function alertMessage(alertMessage, alertType, scroll = true) {
  const alert = document.createElement(`div`);
  alert.classList.add(`alert`);
  alert.classList.add(`${alertType}`);
  alert.innerHTML = `<p>${alertMessage}</p>`;
  const spanClose = document.createElement(`span`);
  spanClose.innerHTML = 'X';
  alert.appendChild(spanClose);

  alert.addEventListener(`click`, (e) => {
    if (e.target.tagName === 'SPAN') {
      main.removeChild(alert);
    }
  });
  const main = document.querySelector(`main`);
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// converting to json
export async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    throw { name: `servicesError`, message: response };
  }
}
