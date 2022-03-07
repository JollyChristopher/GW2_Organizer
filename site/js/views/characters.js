import { api } from '../data/util.js';
import { BaseView } from './base.js';

const PAGE_SIZE = 5;

export class CharactersView extends BaseView {
  constructor() {
    super('characters');
  }

  oninit () {
    this.characterNames = [];
    this.characterData = {};
    this.activeCharacter = 0;
    this.loadCharacterNames();
  }

  loadCharacterNames () {
    api.getData('characters').then((data) => {
      this.characterNames = data.sort();
      this.setCharacter(0);
    });
  }

  setCharacter(index) {
    this.activeCharacter = index;
    if(!this.characterData[this.characterNames[index]]) {
      api.getData(`characters/${this.characterNames[index]}`).then((data) => {
        this.characterData[this.characterNames[index]] = data;
        m.redraw();
      });
    }
  }

  getCharacterData(index) {
    return this.characterData[this.characterNames[index]];
  }

  isActiveCharacter(index) {
    return index === this.activeCharacter;
  }

  isFirstCharacter(index) {
    return index === 0;
  }

  isLastCharacter(index) {
    return index === (this.characterNames.length - 1);
  }

  getPageSize() {
    const ARROW_WIDTH = 34.1 * 2;
    const PADDING = 15 * 2;
    const CHARACTER_WIDTH = 200;
    let screenWidth = $(window).width();

    screenWidth -= ARROW_WIDTH;
    screenWidth -= PADDING;

    return Math.floor(screenWidth / CHARACTER_WIDTH);
  }

  activePage() {
    return Math.floor(this.activeCharacter / this.getPageSize());
  }

  lastPage() {
    return Math.floor(this.characterNames.length / this.getPageSize());
  }

  isActivePage(index) {
    return Math.floor(index / this.getPageSize()) === this.activePage();
  }

  setCharacterNavDisplay(name, index) {
    if(this.isActiveCharacter(index)) {
      return [
        name,
        m('span', { class: 'sr-only' }, '(current)')
      ];
    } else {
      return name;
    }
  }

  getCurrentPagination() {
    let pageElement = [
      m('li', { class: `page-item${this.isFirstCharacter(this.activeCharacter) ? ' disabled' : ''}` }, [
        m('a', { 
          class: 'page-link', 
          href: '#', 
          'aria-label': 'Previous', 
          tabindex: (this.isFirstCharacter(this.activeCharacter) ? '-1' : undefined), 
          'aria-disabled': (this.isFirstCharacter(this.activeCharacter) ? true : undefined),
          onclick: (event) => {
            let index = this.activeCharacter;
            index -= this.getPageSize();
            if(index < 0) index = 0;
            this.setCharacter(index);
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
          class: `page-item${this.isActiveCharacter(index) ? ' active' : ''}`,
          'aria-current': (this.isActiveCharacter(index) ? 'page' : undefined)
        }, [
          m('a', { 
            class: 'page-link jolly-no-wrap', 
            href: '#',
            onclick: (event) => {
              this.setCharacter(index);
              event.preventDefault();
            }
          }, this.setCharacterNavDisplay(name, index))
        ]));
      }
    });

    pageElement.push(m('li', { class: `page-item${this.isLastCharacter(this.activeCharacter) ? ' disabled' : ''}` }, [
      m('a', { 
        class: 'page-link', 
        href: '#', 
        'aria-label': 'Next', 
        tabindex: (this.isLastCharacter(this.activeCharacter) ? '-1' : undefined), 
        'aria-disabled': (this.isLastCharacter(this.activeCharacter) ? true : undefined),
        onclick: (event) => {
          let index = this.activeCharacter;
          index += this.getPageSize();
          if(index >= this.characterNames.length) index = this.characterNames.length - 1;
          this.setCharacter(index);
          event.preventDefault();
        }
      }, [
        m('span', { 'aria-hidden': true }, '»')
      ])
    ]));
    return pageElement;
  }

  getCharacterNav() {
    return [
      `Page ${this.activePage() + 1} of ${this.lastPage() + 1}`,
      m('nav', { 'aria-label': 'Page navigation' }, [
        m('ul', { class: 'pagination' }, this.getCurrentPagination())
      ])
    ];
  }

  getCharacter() {
    let data = this.getCharacterData(this.activeCharacter);
    if(!data) return [];
    return [
      m('div', { class: 'container' }, [
        m('div', { class: 'row' }, [
          m('div', { class: 'col-sm' }, [
            m('div', { class: 'card' }, [
              m('div', { class: 'card-body' }, [
                m('h5', { class: 'card-title' }, data.name),
                m('h6', { class: 'card-subtitle mb-2 text-muted' }, `Level ${data.level} ${data.gender} ${data.race} ${data.profession}`),
                m('p', { class: 'card-text' }, `some text`)
              ])
            ])
          ]),
          m('div', { class: 'col-sm' }, []),
          m('div', { class: 'col-sm' }, [])
        ])
      ]),
      JSON.stringify(data)
    ];
  }

  page () {
    let pageContent = this.getCharacterNav();
    pageContent = pageContent.concat(this.getCharacter());

    return pageContent;
  }
}
