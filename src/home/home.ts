import { Store } from './../services/reduxStore';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(Store)
export class Home {
   

    constructor(private store: Store) {
       
    }

}