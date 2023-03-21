import { loadHeaderFooter } from '../js/utils.mjs';
import AddActivity from '../js/AddActivity.mjs';

loadHeaderFooter();
const formElement = document.querySelector(`.addActivity__form`);
const checkoutElement = document.querySelector(`.addActivity__confirmation`);
const checkoutBtn = document.querySelector(`#addActivity__form__checkoutBtn`);
const submitBtn = document.querySelector(`#addActivity__confirmation__submitBtn`);
const backBtn = document.querySelector(`#addActivity__confirmation__backBtn`);
const _ = new AddActivity(formElement, checkoutElement, checkoutBtn, submitBtn, backBtn);
