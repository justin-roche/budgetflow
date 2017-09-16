import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { GraphService } from './../services/graphService';

@inject(EventAggregator, GraphService)
export class ModalWrapper {

    attached() {
        this.showModal(100,100);
    }

    showModal(clientX, clientY) {
        let $ = window['$']
        $('#myModal')
        .css({
            left: clientX+'px',
            top: clientY+'px'
        })
        .modal({ 
            backdrop: false,
        })
        .draggable({
            handle: ".modal-header"
        })
        .show(); 
    }

}