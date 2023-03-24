import { loadHeaderFooter } from '../js/utils.mjs';
import Favorites from '../js/Favorites.mjs';

loadHeaderFooter();

const listElement = document.querySelector(`.favoritesSection__list`);
const favorites = new Favorites(listElement);
