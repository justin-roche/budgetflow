import { GraphService } from './services/graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';


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
        this.clearData();
        this.data.adjacentNodes = this.gs.getAdjacentNodes(this.nodeModel);
        console.log('adjacent nodes data', this.data.adjacentNodes);
        this.data.outNodes = Object.keys(this.data.adjacentNodes.outEdges).map(n => n);
    }

    clearData() {
        this.data.outNodes = [];
    }

    log() {
        console.log('nodemodel', this.nodeModel);
    }

    showModal(clientX, clientY) {
       
        // ('#myModal')
        // .css({
        //     left: clientX+'px',
        //     top: clientY+'px'
        // })
        // .modal({ 
        //     backdrop: false,
        // })
        // .show();
        
        // ('.modal-dialog')
        // .draggable({
        //     handle: ".modal-header"
        // })
    }
    
    attached(){
       
    }

    save() {
        // ('#myModal').hide();
        // this.ea.publish('saveNode', this.nodeModel);
    }
   
}

export class KeysValueConverter {
    toView(obj) {
        console.log(obj);
      return Reflect.ownKeys(obj);
    }
  }