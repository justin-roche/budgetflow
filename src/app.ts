import { Store } from 'aurelia-redux-plugin';
import { Aurelia, inject } from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { createStore } from 'redux';
import { rootReducer } from './reducers/root';

@inject(Store)
export class App {
  router: Router;

  constructor(store: Store) {
    store.provideStore(createStore(rootReducer));
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'test'], name: 'test',      moduleId: PLATFORM.moduleName('./home'),      nav: true, title: 'test' },
      // { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('./users'),        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('./child-router'), nav: true, title: 'Child Router' },
    ]);

    this.router = router;
  }
}