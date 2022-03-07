import { api } from '../data/util.js';
import { BaseView } from './base.js';

const PAGE_SIZE = 5;

export class CharactersView extends BaseView {
  constructor() {
    super('characters');
  }

  oninit () {
    this.characterNames = [];
    this.activeCharacter = 0;
    this.loadCharacterNames();
  }

  loadCharacterNames () {
    api.getData('characters').then((data) => {
      this.characterNames = data;
    }).catch((error) => {
      console.log(`Failed to load character names, likely no API key set: ${error}`);
    });
  }

  setDisplay(name, index) {
    if(index === this.activeCharacter) {
      return [
        name,
        m('span', { class: 'sr-only' }, '(current)')
      ];
    } else {
      return name;
    }
  }

  activePage() {
    return Math.floor(this.activeCharacter / PAGE_SIZE);
  }

  lastPage() {
    return Math.floor(this.characterNames.length / PAGE_SIZE);
  }

  isActivePage(index) {
    return Math.floor(index / PAGE_SIZE) === this.activePage();
  }

  getCurrentPagination() {
    let pageElement = [
      m('li', { class: `page-item${this.activeCharacter === 0 ? ' disabled' : ''}` }, [
        m('a', { 
          class: 'page-link', 
          href: '#', 
          'aria-label': 'Previous', 
          tabindex: (this.activeCharacter === 0 ? '-1' : undefined), 
          'aria-disabled': (this.activeCharacter === 0 ? true : undefined),
          onclick: (event) => {
            this.activeCharacter -= PAGE_SIZE;
            if(this.activeCharacter < 0) this.activeCharacter = 0;
            event.preventDefault();
          }
        }, [
          m('span', { 'aria-hidden': true }, '«')
        ])
      ])
    ];

    this.characterNames.forEach((name, index) => {
      if(this.isActivePage(index)) {
        pageElement.push(m('li', { 
          class: `page-item${index === this.activeCharacter ? ' active' : ''}`,
          'aria-current': (index === this.activeCharacter ? 'page' : undefined)
        }, [
          m('a', { 
            class: 'page-link jolly-no-wrap', 
            href: '#',
            onclick: (event) => {
              this.activeCharacter = index;
              event.preventDefault();
            }
          }, this.setDisplay(name, index))
        ]));
      }
    });

    pageElement.push(m('li', { class: `page-item${this.activeCharacter === this.characterNames.length - 1 ? ' disabled' : ''}` }, [
      m('a', { 
        class: 'page-link', 
        href: '#', 
        'aria-label': 'Next', 
        tabindex: (this.activeCharacter === this.characterNames.length - 1 ? '-1' : undefined), 
        'aria-disabled': (this.activeCharacter === this.characterNames.length - 1 ? true : undefined),
        onclick: (event) => {
          this.activeCharacter += PAGE_SIZE;
          if(this.activeCharacter >= this.characterNames.length) this.activeCharacter = this.characterNames.length - 1;
          event.preventDefault();
        }
      }, [
        m('span', { 'aria-hidden': true }, '»')
      ])
    ]));
    return pageElement;
  }

  page () {
    return [
      `Page ${this.activePage() + 1} of ${this.lastPage() + 1}`,
      m('nav', { 'aria-label': 'Page navigation' }, [
        m('ul', { class: 'pagination' }, this.getCurrentPagination())
      ])
    ];
  }
}
