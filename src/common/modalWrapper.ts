import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'

@inject(EventAggregator)
export class ModalWrapper {
    collapsed = false;

    @bindable settings: any = {};
    @bindable active; //bindable for use with class-type components
    constructor(private ea: EventAggregator) {
        // this.active = true;
    }

    show(node, clientX, clientY) {
        this.showModal(clientX, clientY);

    }


    log() {

    }

    showModal(clientX, clientY) {
        this.active = true;
    }

    attached() {
        //$('#thisModal').draggable();
        console.log('settings id', this.settings.id);
        $(`#${this.settings.id}`)
        .draggable()
        .css('z-index', 3000);
    }

    close() {
        this.active = false;
    }

    save() {
        this.active = false;
    }

}
