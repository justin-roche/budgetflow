import { inject } from 'aurelia-framework';
import $ from 'jquery'
import { ModalSettings } from '../common/modalWrapper'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class NodeEditor {
    active;
    collapsed = false;
    $nodeId;
    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }
    nodeDescription;
    nodeData;
    outEdges;
    inEdges;
    outNodes;
    inNodes;

    defaultModalSettings = {
        title: 'Node Edit',
        id: 'node-edit',
        x: 0,
        y: 0,
        show: true
    };

    modalSettings = new Rx.BehaviorSubject<ModalSettings>(this.defaultModalSettings);

    constructor(private store: Store) {
        this.$nodeId = this.store.select('ui.graphContainer.selectedNodeId');
        this.$nodeId.subscribe(id => {
            if(id !== null) {
                this.update(id);
            }
        })
    }

    refresh() {
        console.log('new node');
    }

    update(id) {
        this.nodeDescription = this.store.getState().graph.nodes[id];
        this.nodeData = this.store.getState().graph.nodesData[id];
        this.outEdges = this.nodeDescription.outEdges.map(en => this.store.getState().graph.edges[en]);
        this.inEdges = this.nodeDescription.inEdges.map(en => this.store.getState().graph.edges[en]);

        this.outNodes = this.outEdges.map(e => this.store.getState().graph.nodes[e.target]);

        1;
        // this.initializeData();
        // this.emitChildSettings(this.modalSettings, {
        //     x: e.x,
        //     y: e.y,
        //     show: true
        // })
    }



    log() {
        console.log('nodemodel', this.node);
    }

    save() {

    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}