export default class AddActivity {
  constructor(formElement, confirmationElement, checkoutBtn, submitBtn, backBtn) {
    this.formElement = formElement;
    this.confirmationElement = confirmationElement;
    this.checkoutBtn = checkoutBtn;
    this.submitBtn = submitBtn;
    this.backBtn = backBtn;

    // Event Handlers
    checkoutBtn.addEventListener(`click`, (e) => this.handleCheckoutButtonClicked(e));
    submitBtn.addEventListener(`click`, this.handleSubmitButtonClicked);
    backBtn.addEventListener(`click`, (e) => this.handleBackButton(e));
  }

  handleCheckoutButtonClicked(e) {
    e.preventDefault();
    this.formElement.style.display = 'none';
    this.confirmationElement.style.display = 'flex';
  }

  handleSubmitButtonClicked() {
    location.href = 'success.html';
  }

  handleBackButton(e) {
    e.preventDefault();
    this.formElement.style.display = 'block';
    this.confirmationElement.style.display = 'none';
  }
}
