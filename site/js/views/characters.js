import { Navbar } from './navbar.js';
import { api } from '../data/util.js';

export class CharactersView {
  constructor() {
    this.characterNames = [];
    this.loadCharacterNames();
  }

  loadCharacterNames() {
    api.getData('characters').then((data) => {
      this.characterNames = data;
    });
  }

  view () {
    return m('main', [
      m(new Navbar('characters')),
      m('h1', { class: 'title' }, `Characters: ${this.characterNames}`),
    ]);
  }
}