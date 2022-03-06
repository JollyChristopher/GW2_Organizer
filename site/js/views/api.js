import { Navbar } from './navbar.js';
import { api } from '../data/util.js';

export class ApiView {
  constructor () {
    this.showApiKey = false;
    this.apiKey = api.getApiKey();
  }

  toggleShowApiKey () {
    this.showApiKey = !this.showApiKey;
  }

  setApiKey (apiKey) {
    this.apiKey = apiKey;
  }

  view () {
    return m('main', [
      m(new Navbar('api')),
      m('div', { class: 'input-group mb-3' }, [
        m('div', { class: 'input-group-preprend' }, [
          m('button', {
            class: 'btn btn-outline-secondary',
            type: 'button',
            onclick: () => {
              api.setApiKey(this.apiKey);
            }
          }, 'Set API Key')
        ]),
        m('input', {
          type: `${this.showApiKey ? 'text' : 'password'}`,
          class: 'form-control',
          placeholder: 'Obtain from Guild Wars Account',
          value: this.apiKey,
          oninput: (e) => { this.setApiKey(e.target.value); }
        }),
        m('div', { class: 'input-group-append' }, [
          m('a', {
            class: 'input-group-text',
            href: '#',
            onclick: (event) => {
              this.toggleShowApiKey();
              event.preventDefault();
            }
          }, [
            m('i', { class: `bi-eye${this.showApiKey ? '' : '-slash'}` })
          ])
        ])
      ])
    ]);
  }
}
