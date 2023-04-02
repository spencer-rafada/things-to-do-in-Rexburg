import { loadHeaderFooter } from '../js/utils.mjs';
import AddActivity from '../js/AddActivity.mjs';

loadHeaderFooter();
// Remove add activity when newly loaded
localStorage.removeItem(`addActivity`);
localStorage.removeItem(`imgB64`);
const _ = new AddActivity();
