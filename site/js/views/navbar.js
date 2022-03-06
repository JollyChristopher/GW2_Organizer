import { PAGES } from '../data/util.js';

export class Navbar {
  constructor (active) {
    this.active = active;
  }

  getPageActive (page) {
    if (this.active === page.id) {
      return [
        page.name,
        m('span', { class: 'sr-only' }, '(current)')
      ];
    } else {
      return page.name;
    }
  }

  links () {
    return PAGES.map((page) => {
      return m('a', { class: `nav-item nav-link${this.active === page.id ? ' active' : ''}`, href: `#!/${page.id}` }, this.getPageActive(page));
    });
  }

  view () {
    return m('nav', { class: 'navbar navbar-expand-lg navbar-light bg-light' }, [
      m('a', { class: 'navbar-brand', href: '#!/' }, 'Navbar'),
      m('button', { class: 'navbar-toggler', type: 'button', 'data-toggle': 'collapse', 'data-target': '#navbarNavAltMarkup', 'aria-controls': 'navbarNavAltMarkup', 'aria-expanded': false, 'aria-label': 'Toggle navigation' }, [
        m('span', { class: 'navbar-toggler-icon' }, '')
      ]),
      m('div', { class: 'collapse navbar-collapse', id: 'navbarNavAltMarkup' }, [
        m('div', { class: 'navbar-nav' }, this.links())
      ])
    ]);
  }
}
