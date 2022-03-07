import { PAGES } from './data/util.js';

const routes = {};
PAGES.forEach((page) => {
  routes[`/${page.id}`] = page.page;
});

m.route(document.body, '/', routes);
