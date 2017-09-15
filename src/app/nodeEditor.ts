import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
require('jquery');

@inject(EventAggregator)
export class NodeEditor {

    nodeModel;

    constructor(private ea: EventAggregator) {

    }

    show(node, clientX, clientY) {
        //node.label = 'r'
        this.nodeModel = node; //JSON.parse(JSON.stringify(node));
        console.log('nodemodel', this.nodeModel)
        let $ = window['$']
        console.log('setting clientX', clientX);
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

    attached(){
       
    }

    save() {
        let $ = window['$']
        $('#myModal').hide();
        this.ea.publish('saveNode', this.nodeModel);
    }
   
}