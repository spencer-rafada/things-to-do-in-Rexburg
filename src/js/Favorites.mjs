import ExternalServices from './ExternalServices.mjs';
import { renderWithTemplate } from './utils.mjs';

const externalServices = new ExternalServices();

export default class Favorites {
  constructor(listElement) {
    this.listElement = listElement;
    this.init();
  }

  async init() {
    this.favorites = await externalServices.getActivity(); // Get Data using External Services
    console.log(this.favorites);
    this.renderList(this.favorites);
  }

  renderList(activities) {
    const render = activities.map(this.favoriteActivityTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', render.join(''));
  }

  favoriteActivityTemplate(activity) {
    return `
    <div class="favorites">
      <div class="favoritesInfo">
        <a href="go to activity details">
          <img src="" alt="${activity.name} Illustration" />
        </a>
        <div>
          <h3>${activity.name}</h3>
          <p>${activity.location}</p>
          <a href="${activity.website}">${activity.website}</a>
        </div>
      </div>
      <div class="favoritesLike">
        <img src="" alt="Like or Unlike the Activity" />
      </div>
    </div>
    `;
  }
}
