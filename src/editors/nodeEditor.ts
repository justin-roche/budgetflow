import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import { ModalSettings } from '../common/modalWrapper'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class NodeEditor {
    collapsed = false;
    $nodeId;

    
    node: AppNode;
    nodeData: NodeData;
    outEdges: Array<Edge>;
    outEdgesData: Array<EdgeData>;
    inEdges: Array<Edge>;
    inEdgesData: Array<EdgeData>;
    outNodes: Array<AppNode>;
    outNodesData: Array<NodeData>;
    inNodes: Array<AppNode>;
    inNodesData: Array<NodeData>;
    
    @bindable nodeActive: Boolean;

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

    toggleActive() {
        setTimeout(function(){
            let nodeData = {id: this.node.id, active: this.nodeActive};
        this.store.dispatch({type: 'NODE_PROPERTY_SET', payload: {nodeData: nodeData}});
        }.bind(this),100)
    }

    update(id) {
        this.node = this.store.getState().graph.nodes[id];
        this.nodeData = this.store.getState().graph.nodesData[id];
        
        
        this.outEdges = this.node.outEdges.map(en => this.store.getState().graph.edges[en]);
        this.outEdgesData = this.outEdges.map(ed => this.store.getState().graph.edgesData[ed.id]);

        this.inEdges = this.node.inEdges.map(en => this.store.getState().graph.edges[en]);
        this.inEdgesData = this.inEdges.map(ed => this.store.getState().graph.edgesData[ed.id]);
        
        this.outNodes = this.outEdges.map(e => this.store.getState().graph.nodes[e.target]);
        this.outNodesData = this.outNodes.map(e => this.store.getState().graph.nodesData[e.id]);

        this.inNodes = this.inEdges.map(e => this.store.getState().graph.nodes[e.source]);
        this.inNodesData = this.inNodes.map(e => this.store.getState().graph.nodesData[e.id]);
        
        this.nodeActive = this.nodeData.active;

    }

    matchEdgeData(nodeId) {
        let edge = this.outEdges.filter(ed => ed.target === nodeId)[0];
        let edgeData = this.outEdgesData.filter(ed => ed.id === edge.id)[0];
        return edgeData
    }

    matchInEdgeData(nodeId) {
        let edge = this.inEdges.filter(ed => ed.source === nodeId)[0];
        let edgeData = this.inEdgesData.filter(ed => ed.id === edge.id)[0];
        console.log('in edges', edgeData)
        return edgeData
    }



    save() {

    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}