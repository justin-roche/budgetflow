import { GraphService } from '../graph/graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'

@inject(EventAggregator, GraphService)
export class NodeEditor {
    active;
    collapsed = false;

    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }

    constructor(private ea: EventAggregator, private gs: GraphService) {
        ea.subscribe('show.node.editor', (n, x, y) => {
            this.show(n, x, y);
        })
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
       this.active = true;
    }
    
    attached(){
        $('#thisModal').draggable();
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