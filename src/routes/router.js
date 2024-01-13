import Utils from '../libs/utils.js';
import { Localization } from '../libs/localization.js';

export default class Router {
  static instance = null;

  static getInstance(routes) {
    if (!Router.instance) {
      Router.instance = new Router(routes);
    }
    return Router.instance;
  }
  constructor(routes) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = routes;
    this._loadInitialRoute();
    this.currentCSSLink = null;
    this.routeChangeTimeout = null;
    this.currentRoute = null;
  }

  // Public methods
  async loadRoute(path) {
    if (this.currentRoute && typeof this.currentRoute === 'function') {
      this.currentRoute();
    }
    clearTimeout(this.routeChangeTimeout);
    this.routeChangeTimeout = setTimeout(async () => {
      const matched_route = this._matchUrlToRoute(path);
      const content = document.getElementById('app');
      if (typeof matched_route.template === 'function') {
        const loader = Utils.createElement('div', { class: 'loader' }, []);
        document.body.appendChild(loader);
        try {
          const { html, css, afterRender, teardown } = await matched_route.template();
          content.innerHTML = ''; // Clear the existing content
          content.insertAdjacentHTML('beforeend', html);

          // Handle the CSS
          if (this.currentCSSLink) {
            this.currentCSSLink.forEach((e) => e.remove());
          }
          this.currentCSSLink = css;

          // Add localization logic here
          const localization = new Localization();
          localization.initLocalization().then(() => {
            if (typeof afterRender === 'function') 
            {
              afterRender();
            }
            if (typeof matched_route.init === 'function') {
              matched_route.init();
            }
          });

          this.currentRoute = teardown;
        } catch (error) {
          console.log(error);
          content.innerHTML = 'Failed to load content';
        } finally {
          loader.remove();
        }
      } else {
        content.innerHTML = matched_route.template;
      }
      if (typeof matched_route.init === 'function') {
        matched_route.init();
      }
    }, 50);
  }
  navigate(url) {
    this.navigateTo(url);
    history.pushState({}, '', url);
  }
  navigateTo(url) {
    const pathWithoutQuery = url.split('?')[0];
    const url_segs = pathWithoutQuery.split('/').slice(3); // Remove protocol and domain
    this.loadRoute(url_segs);
    history.pushState({}, '', url); // Update browser URL
}


  // Private Methods
  _matchUrlToRoute(url_segs) {
    const matched_route = this.routes.find(route => {
      const route_path_segs = route.path.split('/').slice(1);
      if (route_path_segs.length !== url_segs.length) return false;

      return route_path_segs.every((routePathSeg, i) => routePathSeg === url_segs[i]);
    });
    return matched_route;
  }

  _loadInitialRoute() {
    const path_name_split = window.location.pathname.split('/');
    const path_segs = path_name_split.length > 1 ? path_name_split.slice(1) : '';
    this.loadRoute(path_segs);
  }
}
