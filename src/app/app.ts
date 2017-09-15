import { inject } from "aurelia-framework";
import { ITodoEntity } from "./../entities/ITodoEntity";
import { TodoService } from "./../services/TodoService";
import { Redirect } from 'aurelia-router';

@inject(TodoService)
export class App {
  router;

  configureRouter(config, router) {
    this.router = router;
    //config.options.root = '/';
    config.options.pushState = false;
    
    config.title = 'Aurelia';
    config.map([
      { route: '',             
      redirect: 'home' },
      {
        route: ['home'],
        title: 'graph',
        name: 'home',
        moduleId: './graph-container.ts',
        nav: true
      },
      {
        route: ['test'],
        title: 'test',
        name: 'test',
        moduleId: './nodeEditor.ts',
        nav: true
      },
    ]);
  }

}
