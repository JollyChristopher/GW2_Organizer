import { Navbar } from './navbar.js';

export class BaseView {
  constructor(pageIndex) {
    this.pageIndex = pageIndex;
  }

  view () {
    return m('main', [
      m(new Navbar(this.pageIndex)),
      m('div', { class: 'container-fluid' }, this.page())
    ]);
  }
}
