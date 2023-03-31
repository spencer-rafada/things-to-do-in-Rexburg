import { loadHeaderFooter } from '../js/utils.mjs';
import Activity from '../js/ActivityData.mjs';

const activity = new Activity("category");
activity.init();

//event listner for a search form
document.querySelector(".search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.querySelector("#query").value;
    activity.searchActivity(value);
  });
loadHeaderFooter();
