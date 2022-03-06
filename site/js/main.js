import { PAGES } from './data/util.js';

const routes = {};
PAGES.forEach((page) => {
  routes[`/${page.id}`] = new page.Page();
});

m.route(document.body, '/', routes);
