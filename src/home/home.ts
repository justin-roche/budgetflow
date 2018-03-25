import { Store } from './../services/reduxStore';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(Store)
export class Home {
    public availableEffects = [
        {value: 'activate', name: 'activate' },
        {value: 'deactivate', name: 'deactivate'},
        {value: 'activate', name: 'activate' },
        {value: 'deactivate', name: 'deactivate'},
        {value: 'activate', name: 'activate' },
        {value: 'deactivate', name: 'deactivate'},
        {value: 'activate', name: 'activate' },
        {value: 'deactivate', name: 'deactivate'}
    ];
    names = ['john', 'james','john', 'james','john', 'james','john', 'james','john', 'james']
    constructor(private store: Store) {
       
    }

}