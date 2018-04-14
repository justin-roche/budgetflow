import { inject, bindable } from 'aurelia-framework';
import { Store } from './../services/reduxStore';
import { _ } from 'underscore';

@inject(Store)
export class SearchBar {

    searchTerms = [];

    constructor(private store: Store) {

       
    }

    onSearch() {
        
    }
}