import { Store } from 'aurelia-redux-plugin';
import { Aurelia, inject } from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root';
import { state } from '../test/mock-data/state';
import logger from 'redux-logger'

@inject(Store)
export class App {
  router: Router;

  constructor(private store: (Store<any>)) {
    store.provideStore(createStore(rootReducer, applyMiddleware()));
    this.hydrateInitial();
  }

  hydrateInitial() {
    this.store.dispatch({type: 'GRAPHS_SET', payload: state.graphs});
    this.store.dispatch({type: 'UI_SET', payload: state.ui});
    console.log('store hydrated', this.store.getState())
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