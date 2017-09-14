import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class NavBar {
    ea;

    @bindable router;
    loggedIn = false;

    constructor(eventAggregator) {
        this.ea = eventAggregator;
    }

}