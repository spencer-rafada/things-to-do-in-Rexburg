import { convertToJson } from './utils.mjs';

export default class ExternalServices {
  async getActivity() {
    const response = await fetch('/data/activities.json');
    const data = await convertToJson(response);
    return data.activities;
  }
}
