import { SplashView } from '../views/splash.js';
import { CharactersView } from '../views/characters.js';
import { ApiView } from '../views/api.js';

class ApiLoader {
  constructor () {
    this.apiKey = this.loadApiKey();
  }

  loadApiKey () {
    return window.localStorage.getItem('apiKey') || '';
  }

  saveApiKey () {
    window.localStorage.setItem('apiKey', this.apiKey);
  }

  setApiKey (apiKey) {
    this.apiKey = apiKey;
    this.saveApiKey();
  }

  getApiKey () {
    return this.apiKey;
  }

  getApiToken() {
    return this.apiKey;
  }

  getData(resource) {
    return m.request({
      method: 'GET',
      url: `https://api.guildwars2.com/v2/${resource}?v=latest&access_token=${api.getApiToken()}`,
    });
  }
}

export const api = new ApiLoader();
export const PAGES = [
  { id: '', name: 'Home', Page: SplashView },
  { id: 'characters', name: 'Characters', Page: CharactersView },
  { id: 'api', name: 'Set Up API', Page: ApiView },
];
