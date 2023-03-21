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

export const renderWithTemplate = (template, parentElement, position, data, callback) => {
  parentElement.innerHTML = ``;
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
};

export const loadHeaderFooter = async () => {
  const footer = await loadTemplate('../partials/footer.html');
  const header = await loadTemplate('../partials/header.html');
  const footerElement = document.querySelector('footer');
  const headerElement = document.querySelector('header');

  renderWithTemplate(header, headerElement, 'afterbegin');
  renderWithTemplate(footer, footerElement, 'afterbegin');
};
