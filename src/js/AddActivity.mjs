import { renderWithTemplate, getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const eServices = new ExternalServices();

const formDataToJSON = (formElement) => {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    if (key === 'image') {
      convertToBase64();
      convertedJSON[key] = { name: value.name, b64: '' };
    } else {
      convertedJSON[key] = value;
    }
  });

  return convertedJSON;
};

const convertToBase64 = () => {
  const fileInput = document.querySelector(`#image`);
  const file = fileInput.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = () => {
    var base64 = reader.result.split(',')[1];
    setLocalStorage(`imgB64`, base64);
  };
  reader.readAsDataURL(file);
};

export default class AddActivity {
  constructor() {
    this.mainElement = document.querySelector(`main`);
    this.emptyData = { title: '', location: '', website: '', info: '', category: '', image: '' };

    renderWithTemplate(this.renderForm(this.emptyData), this.mainElement, 'afterbegin');
    // Store form data to local storage
    document.querySelector(`#addActivity__form__checkoutBtn`).addEventListener(`click`, (e) => {
      const formElement = document.forms[0];
      const json = formDataToJSON(formElement);
      setLocalStorage(`addActivity`, json);
      this.handleCheckoutButtonClicked(e);
    });
  }

  handleCheckoutButtonClicked(e) {
    // Handlers
    e.preventDefault();
    const data = !getLocalStorage(`addActivity`) ? this.emptyData : getLocalStorage(`addActivity`);
    document.querySelector(`.addActivity__form`).remove();
    renderWithTemplate(this.renderConfirmation(data), this.mainElement, 'afterbegin');
    document
      .querySelector(`#addActivity__confirmation__submitBtn`)
      .addEventListener(`click`, this.handleSubmitButtonClicked);
    document
      .querySelector(`#addActivity__confirmation__backBtn`)
      .addEventListener(`click`, (e) => this.handleBackButton(e));
  }

  async handleSubmitButtonClicked() {
    document.querySelector(`#addActivity__confirmation__submitBtn`).disabled = true;
    try {
      const body = getLocalStorage(`addActivity`);
      body.image.b64 = getLocalStorage(`imgB64`) ? getLocalStorage(`imgB64`) : '';
      console.log(body);
      const response = await eServices.addActivity(body);
      const data = await response.json();
      console.log(data);
      if (data.acknowledged === true) {
        location.href = 'success.html';
      } else {
        throw new Error('Failed to Add');
      }
    } catch (error) {
      document.querySelector(`#addActivity__confirmation__submitBtn`).disabled = false;
      alertMessage(error, `error`);
    }
  }

  handleBackButton(e) {
    e.preventDefault();
    const data = !getLocalStorage(`addActivity`) ? this.emptyData : getLocalStorage(`addActivity`);
    document.querySelector(`.addActivity__confirmation`).remove();
    renderWithTemplate(this.renderForm(data), this.mainElement, 'afterbegin');
    document.querySelector(`#addActivity__form__checkoutBtn`).addEventListener(`click`, (e) => {
      const formElement = document.forms[0];
      const json = formDataToJSON(formElement);
      setLocalStorage(`addActivity`, json);
      this.handleCheckoutButtonClicked(e);
    });
  }

  // Templates
  renderForm(data) {
    return `
    <section class="addActivity__form">
        <h2>Add Activity</h2>
        <form>
          <div class="addActivity__input">
            <label for="title">Name:</label>
            <input type="text" id="title" name="title" value="${data.title}" />
          </div>
          <div class="addActivity__input">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" value="${data.location}"/>
          </div>
          <div class="addActivity__input">
            <label for="website">Website:</label>
            <input type="url" id="website" name="website" value="${data.website}"/>
          </div>
          <div class="addActivity__input">
            <label for="category">Category:</label>
            <select id="category" name="category">
              <option value="1">Outdoors</option>
              <option value="2">Indoors</option>
              <option value="3">Restaurant</option>
              <option value="4">Groups</option>
              <option value="5">Outside of Rexburg</option>
              <option value="6">Games</option>
              <option value="7">Sports</option>
              <option value="8">Dessert</option>
              <option value="9">Theater</option>
              <option value="10">Shopping</option>
              <option value="11">Seasonal</option>
            </select>
          </div>
          <div class="addActivity__input">
          <label for="info">Information:</label>
          <textarea id="info" name="info" value="${data.info}"></textarea>
          </div>
          <div class="addActivity__input">
          <label for="image">Select an image to upload:</label>
          <input type="file" id="image" name="image">
          </div>
          <div class="addActivity__btn">
            <button type="submit" id="addActivity__form__checkoutBtn">Checkout</button>
          </div>
        </form>
      </section>
      `;
  }

  renderConfirmation(data) {
    return `
    <section class="addActivity__confirmation">
    <h2>Confirmation</h2>
    <div class="addActivity__confirmation__info">
      <p>Name: ${data.title}</p>
      <p>Location: ${data.location}</p>
      <p>Website: ${data.website}</p>
      <p>Category: ${data.category}</p>
      <p>Information: ${data.info}</p>
      <p>Image: ${data.name}</p>
    </div>
    <div class="addActivity__confirmation__btns">
      <button type="button" id="addActivity__confirmation__backBtn">Back</button>
      <button type="submit" id="addActivity__confirmation__submitBtn">Submit</button>
    </div>
  </section>
  `;
  }
}
