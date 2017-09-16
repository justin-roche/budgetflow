import { GraphService } from './../services/graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
require('jquery');

@inject(EventAggregator, GraphService)
export class NodeEditor {

    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }

    constructor(private ea: EventAggregator, private gs: GraphService) {

    }

    show(node, clientX, clientY) {
        this.nodeModel = node; //JSON.parse(JSON.stringify(node));
        this.initializeData();
        this.showModal(clientX, clientY);
    }

    initializeData() {
        this.data.adjacentNodes = this.gs.getAdjacentNodes(this.nodeModel);
        console.log('adjacent nodes data', this.data.adjacentNodes);
        console.log(Array.isArray(this.data.adjacentNodes.outEdges));
        for(let prop of Object.keys(this.data.adjacentNodes.outEdges)) {
            this.data.outNodes.push(prop);
        }
        console.log('outNodes', this.data.adjacentNodes.outNodes)
    }

    log() {
        console.log('nodemodel', this.nodeModel);
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
    
    attached(){
       
    }

    save() {
        let $ = window['$']
        $('#myModal').hide();
        this.ea.publish('saveNode', this.nodeModel);
    }
   
}

export class KeysValueConverter {
    toView(obj) {
        console.log(obj);
      return Reflect.ownKeys(obj);
    }
  }