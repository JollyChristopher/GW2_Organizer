import { BaseView } from './base.js';

export class SplashView extends BaseView {
  constructor() {
    super('');
  }

  page () {
    return [
      m('h1', { class: 'title' }, 'My First app'),
      m('a', { href: '#!/api' }, 'Enter!')
    ];
  }
}
