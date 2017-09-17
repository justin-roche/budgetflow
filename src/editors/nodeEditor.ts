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

    modalViewModel = {
        title: 'Node Edit',
        id: 'node-edit-modal',
        x: 0,
        y: 0
    }

    constructor(private ea: EventAggregator, private gs: GraphService) {
        ea.subscribe('show.node.editor', (e) => {
            console.log('e', e)
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
        console.log('adjacent nodes data', this.data.adjacentNodes);
        this.data.outNodes = Object.keys(this.data.adjacentNodes.outEdges).map(n => n);
    }

    clearData() {
        this.data.outNodes = [];
    }

    log() {
        console.log('nodemodel', this.nodeModel);

    }

    showModal(e) {
        this.modalViewModel.x = e.x;
        this.modalViewModel.y = e.y;
        this.active = true;
        console.log(this.modalViewModel)
    }

    attached() {
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