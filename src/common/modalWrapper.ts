import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'

@inject(EventAggregator)
export class ModalWrapper {
    collapsed = false;

    @bindable settings: any = {};
    @bindable active; //bindable for use with class-type components
    constructor(private ea: EventAggregator) {

    }

    attached() {
        $(`#${this.settings.id}`)
        .draggable()
        .css({'z-index': 3000,
            left: this.settings.x+'px',
            top: this.settings.y+'px'
        });
    }

    close() {
        this.active = false;
    }

    save() {
        this.active = false;
    }

}
