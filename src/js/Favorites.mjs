import ExternalServices from './ExternalServices.mjs';

const externalServices = new ExternalServices();

export default class Favorites {
  constructor(listElement) {
    this.listElement = listElement;
    this.init();
  }

  async init() {
    this.favorites = []; // Get Data using External Services
    this.favorites.forEach((item) => this.renderFavoriteActivity(item));
  }

  renderFavoriteActivity(activity) {
    return `
    <div class="favorites">
      <div class="favoritesInfo">
        <a href="go to activity details">
          <img src="" alt="Activity Name Illustration" />
        </a>
        <div>
          <h3>Activity Name</h3>
          <p>Location</p>
          <a href="">Website</a>
        </div>
      </div>
      <div class="favoritesLike">
        <img src="" alt="Like or Unlike the Activity" />
      </div>
    </div>
    `;
  }
}
