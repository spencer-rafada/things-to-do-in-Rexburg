import { renderWithTemplate, getLocalStorage, setLocalStorage } from './utils.mjs';

const formDataToJSON = (formElement) => {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
};

export default class AddActivity {
  constructor() {
    this.mainElement = document.querySelector(`main`);
    this.emptyData = { name: '', location: '', website: '', information: '' };

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

  handleSubmitButtonClicked() {
    location.href = 'success.html';
    // document.querySelector(`#addActivity__confirmation__submitBtn`).disabled = true;
    // try {
    // } catch (error) {}
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
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${data.name}"/>
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
            <label for="information">Information:</label>
            <textarea id="information" name="information" value="${data.information}"></textarea>
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
      <p>Name: ${data.name}</p>
      <p>Location: ${data.location}</p>
      <p>Website: ${data.website}</p>
      <p>Information: ${data.information}</p>
    </div>
    <div class="addActivity__confirmation__btns">
      <button type="button" id="addActivity__confirmation__backBtn">Back</button>
      <button type="submit" id="addActivity__confirmation__submitBtn">Submit</button>
    </div>
  </section>
  `;
  }
}
