import { inject, bindable } from 'aurelia-framework';
import { Store } from './../services/reduxStore';
import { _ } from 'underscore';

@inject(Store)
export class ConditionalTable {
    conditions;

    constructor(private store: Store) {

        store.select('graph.conditions').subscribe( (c) => {
            this.conditions = _.map(c, c => c);
        });
    }
}