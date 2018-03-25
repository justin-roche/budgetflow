import { Store } from './services/reduxStore';
import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/root';
import { graphActions } from './reducers/graphReducer';
import { uiActions } from './reducers/ui/uiReducer';
import { state } from './state/state';

import logger from 'redux-logger'

@inject(Store)
export class App {
  router: Router;

  constructor(private store: (Store)) {
    store.provideStore(createStore(rootReducer, applyMiddleware(logger)));
    store.provideActions([graphActions, uiActions])
    this.hydrateInitial();
  }

  hydrateInitial() {
    this.store.dispatch({ type: 'GRAPHS_SET', payload: state.graphs });
    
    this.store.dispatch({ type: 'UI_SET', payload: state.ui });
    setTimeout(function(){
      this.store.actions.graph.setGraph(state.graphs.filter(g => g.data.name === 'conditional').pop());
      this.store.actions.graph.applyDisplayFunctions();
      // this.store.actions.ui.selectEdge('e0');
      // this.store.dispatch({ type: 'UI_EDGE_EDITOR_TOGGLE' });
    }.bind(this),0);
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'test'], name: 'test', moduleId: PLATFORM.moduleName('./home/home'), nav: true, title: 'test' },
      // { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('./users'),        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('./child-router'), nav: true, title: 'Child Router' },
    ]);

    this.router = router;
  }
}