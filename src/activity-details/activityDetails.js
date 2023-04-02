import { loadHeaderFooter, getParam } from '../js/utils.mjs';
import ActivityDetails from '../js/ActivityDetails.mjs';

const activityId = getParam("activity");
const activityDet = new ActivityDetails(activityId);
activityDet.init();

loadHeaderFooter();
