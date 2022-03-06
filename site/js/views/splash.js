import { Navbar } from './navbar.js';

export class SplashView {
  view () {
    return m('main', [
      m(new Navbar('')),
      m('h1', { class: 'title' }, 'My First app'),
      m('a', { href: '#!/test' }, 'Enter!'),
    ]);
  }
}
