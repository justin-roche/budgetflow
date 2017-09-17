import { GraphService } from '../graph/graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'
import {ModalSettings} from '../common/modalWrapper'

@inject(EventAggregator, GraphService)
export class NodeEditor {
    active;
    collapsed = false;

    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }

    modalSettings : ModalSettings = 
        {title: 'Node Edit',
        id: 'node-edit',
        x: 0,
        y: 0,
        show: false
    };


    constructor(private ea: EventAggregator, 
        private gs: GraphService) {
        ea.subscribe('show.node.editor', (e) => {
            console.log('show.node.editor.event', e)
            this.show(e);
        })
    }

    show(e) {
        this.nodeModel = e.n; //JSON.parse(JSON.stringify(node));
        this.initializeData();
        this.showModal(e);
    }

    initializeData() {
        this.clearData();
        this.data.adjacentNodes = this.gs.getAdjacentNodes(this.nodeModel);
        this.data.outNodes = Object.keys(this.data.adjacentNodes.outEdges).map(n => n);
    }

    clearData() {
        this.data.outNodes = [];
    }

    log() {
        console.log('nodemodel', this.nodeModel);
    }

    showModal(e) {
        this.modalSettings.x = e.x;
        this.modalSettings.y = e.y;
        this.modalSettings.show = true;
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