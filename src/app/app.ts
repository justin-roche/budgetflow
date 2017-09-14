import { inject }       from "aurelia-framework";
import { ITodoEntity }  from "./../entities/ITodoEntity";
import { TodoService }  from "./../services/TodoService";
import {Redirect} from 'aurelia-router';

@inject(TodoService)
export class App {
    Sigma;
    router;

    configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia';
        config.map([
          { route: [''],     title: 'graph',  name: 'home', moduleId: './graph-container.ts', nav: true      },
        ]);
      }
      
}
