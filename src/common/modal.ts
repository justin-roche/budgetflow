import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'; // the ts import

@inject(EventAggregator)
export class ModalWrapper {

    attached() {
        this.showModal(100,100);
    }

    showModal(clientX, clientY) {
        
        $('#myModal')
        .css({
            // left: clientX+'px',
            // top: clientY+'px'
        })
        .modal({ 
            backdrop: false,
        })
        .draggable({
            handle: ".modal-header"
        })
        .show(); 

        // $('#myModal')
        

        $( "#draggable" ).draggable();
    }

}