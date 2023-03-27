const backend_url = 'https://rexcube.onrender.com/';

export default class ExternalServices {
  async getActivity() {
    const response = await fetch(backend_url + 'activity');
    const data = await response.json();
    return data;
  }

  async addActivity(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    return await fetch(backend_url + 'requests/new', requestOptions);
  }

  async login() {
    return await fetch(backend_url + 'login');
  }
}
