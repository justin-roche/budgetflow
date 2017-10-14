import { Store } from './services/reduxStore';
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
    store.provideStore(createStore(rootReducer, applyMiddleware(logger)));
    this.hydrateInitial();
  }

  hydrateInitial() {
    this.store.store.dispatch({type: 'GRAPHS_SET', payload: state.graphs});
    this.store.store.dispatch({type: 'GRAPH_SET', payload: state.graph});
    this.store.store.dispatch({type: 'UI_SET', payload: state.ui});
    this.store.store.dispatch({type: 'SIMULATION_SET', payload: state.simulation});
    setTimeout(function(){
      this.store.store.dispatch({type: 'GRAPH_SET', payload: state.graphs.filter(g => g.data.name === '1-2-3').pop()});
      this.store.dispatch({ type: 'DISPLAY_FUNCTIONS_APPLY'});
    }.bind(this),0)
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