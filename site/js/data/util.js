import { SplashView } from '../views/splash.js';
import { CharactersView } from '../views/characters.js';
import { ApiView } from '../views/api.js';

class ApiLoader {
  constructor () {
    this.apiKey = this.loadApiKey();
    this.dataCache = {};
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

  getApiToken () {
    return this.apiKey;
  }

  getData (resource) {
    return new Promise((resolve, reject) => {
      if(this.dataCache[resource]) {
        resolve(this.dataCache[resource]);
      } else {
        m.request({
          method: 'GET',
          url: `https://api.guildwars2.com/v2/${resource}?v=latest&access_token=${api.getApiToken()}`
        }).then((data) => {
          this.dataCache[resource] = data;
          resolve(this.dataCache[resource]);
        }).catch((error) => {
          console.log(`Failed to load data, likely no API key set: ${error}`);
          resolve();
        });
      }
    });
  }
}

export const api = new ApiLoader();
export const PAGES = [
  { id: '', name: 'Home', page: SplashView },
  { id: 'characters', name: 'Characters', page: CharactersView },
  { id: 'api', name: 'Set Up API', page: ApiView }
];
