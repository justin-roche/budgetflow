import { ComponentBase } from './../common/componentBase';
import { GraphService } from '../services/graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery'
import {ModalSettings} from '../common/modalWrapper'
import * as Rx from 'rxjs';

@inject(EventAggregator, GraphService)
export class NodeEditor extends ComponentBase{
    active;
    collapsed = false;

    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }

    modalSettings = new Rx.BehaviorSubject<ModalSettings>( 
        {title: 'Node Edit',
        id: 'node-edit',
        x: 0,
        y: 0,
        show: false
      });

    constructor(private ea: EventAggregator, 
        private gs: GraphService) {
        super()
        ea.subscribe('show.node.editor', (e) => {
            this.show(e);
        })
    }

    settingsChanged() {

    }

    show(e) {
        this.nodeModel = e.n; //JSON.parse(JSON.stringify(node));
        this.initializeData();
        this.emitChildSettings(this.modalSettings, {
            x: e.x,
            y: e.y,
            show: true
        })
    }

    initializeData() {
        // this.clearData();
        // this.data.adjacentNodes = this.gs.getAdjacentNodes(this.nodeModel);
        // this.data.outNodes = Object.keys(this.data.adjacentNodes.outEdges).map(n => n);
    }

    clearData() {
        this.data.outNodes = [];
    }

    log() {
        console.log('nodemodel', this.nodeModel);
    }

    save() {
        // ('#myModal').hide();
        // this.ea.publish('saveNode', this.nodeModel);
    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}