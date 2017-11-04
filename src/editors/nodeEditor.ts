import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import { ModalSettings } from '../common/modalWrapper'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class NodeEditor {
    collapsed = false;
    $nodeId;
    @bindable nodeModel;
    
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
            if (id !== null) {
                this.update(id);
            }
        })
    }

    refresh() {
        console.log('new node');
    }

    toggled(s) {
        console.log('toggled', s)
    }

    selectActivationSource(c) {
        console.log(c)
    }

    update(id) {
        this.buildNodeModel(id);
    }

    buildNodeModel(id) {
        let graph = this.store.getState().graph.present;

        let node = graph.nodes[id];
        let nodeData = graph.nodesData[id];
        let outEdges = node.outEdges.map(en => graph.edges[en]);
        let outEdgesData = outEdges.map(ed => graph.edgesData[ed.id]);
        let inEdges = node.inEdges.map(en => graph.edges[en]);
        let inEdgesData = inEdges.map(ed => graph.edgesData[ed.id]);
        let outNodes = outEdges.map(e => graph.nodes[e.target]);
        let outNodesData = outNodes.map(e => graph.nodesData[e.id]);
        let inNodes = inEdges.map(e => graph.nodes[e.source]);
        let inNodesData = inNodes.map(e => graph.nodesData[e.id]);

        this.nodeModel = JSON.parse(JSON.stringify({
            node: node,
            nodeData: nodeData,
            outEdges: outEdges,
            outEdgesData: outEdgesData,
            inEdges: inEdges,
            inEdgesData: inEdgesData,
            outNodes: outNodes,
            outNodesData: outNodesData,
            inNodes: inNodes,
            inNodesData: inNodesData,
        }));
        this.nodeModel = JSON.parse(JSON.stringify(this.nodeModel));
        this.store.dispatch({type: 'NODE_EDITOR_MODEL_SET', payload: this.nodeModel})
    }

    matchEdgeData(nodeId) {
        let edge = this.nodeModel.outEdges.filter(ed => ed.target === nodeId)[0];
        let edgeData = this.nodeModel.outEdgesData.filter(ed => ed.id === edge.id)[0];
        return edgeData
    }

    matchInEdgeData(nodeId) {
        // let edge = this.inEdges.filter(ed => ed.source === nodeId)[0];
        // let edgeData = this.inEdgesData.filter(ed => ed.id === edge.id)[0];
        // console.log('in edges', edgeData)
        // return edgeData
    }

    save() {

    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}