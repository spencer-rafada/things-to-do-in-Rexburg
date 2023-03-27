import ExternalServices from './ExternalServices.mjs';
import { alertMessage } from './utils.mjs';

const externalServices = new ExternalServices();

export default class Favorites {
  constructor(listElement) {
    this.listElement = listElement;
    this.init();
  }

  async init() {
    this.favorites = await externalServices.getActivity(); // Get Data using External Services
    this.renderList(this.favorites);

    // Event Handlers
    document.querySelectorAll(`.favoritesLike img`).forEach((item) => {
      item.addEventListener(`click`, async () => {
        // TODO: Send a delete request for this.
        try {
          const response = await externalServices.unlikeActivity(item.dataset.id);
          if (response.status === 204) {
            alertMessage('Successfully Unliked', 'success');
            const parent = item.parentNode.parentNode;
            parent.parentNode.removeChild(parent);
          } else {
            throw new Error('Failed to unlike activity.');
          }
        } catch (error) {
          alertMessage(error, 'error');
        }
      });
    });
  }

  renderList(activities) {
    const render = activities.map(this.favoriteActivityTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', render.join(''));
  }

  favoriteActivityTemplate(activity) {
    return `
    <div class="favorites">
      <div class="favoritesInfo">
        <a href="${activity.website}">
          <img src="${activity.image}" alt="${activity.title} Illustration" />
        </a>
        <div>
          <h3>${activity.title}</h3>
          <p>${activity.location}</p>
        </div>
      </div>
      <div class="favoritesLike">
        <img src="../images/NavFavoritesFilled.png" alt="Like or Unlike the Activity" data-id="${activity._id}"/>
      </div>
    </div>
    `;
  }
}
