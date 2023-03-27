import { convertToJson } from './utils.mjs';

const backend_url = 'https://rexcube.onrender.com/';

export default class ExternalServices {
  async getActivity() {
    const response = await fetch('/data/activities.json');
    const data = await convertToJson(response);
    return data.activities;
  }

  async addActivity(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    return await fetch(backend_url + 'activity/new', requestOptions);
  }
}
