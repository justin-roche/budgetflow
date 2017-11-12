import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class NodeEditor {
    collapsed = false;
    nodeId;
    testId = 'x'
    form: any = {}; 
    nodeData;

    constructor(private store: Store) {
        this.store.select('ui.graphContainer.selectedNodeId', { state: true, bind: [this, 'nodeId'] }).subscribe(id => {
            if(id !== null) this.update(id);
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
        let graph = this.store.getPresentState().graph;

        let node = graph.nodes[id];
        this.nodeData = graph.nodesData[id];
        this.form.name = this.nodeData.name;



        // let outEdges = node.outEdges.map(en => graph.edges[en]);
        // let outEdgesData = outEdges.map(ed => graph.edgesData[ed.id]);
        // let inEdges = node.inEdges.map(en => graph.edges[en]);
        // let inEdgesData = inEdges.map(ed => graph.edgesData[ed.id]);
        // let outNodes = outEdges.map(e => graph.nodes[e.target]);
        // let outNodesData = outNodes.map(e => graph.nodesData[e.id]);
        // let inNodes = inEdges.map(e => graph.nodes[e.source]);
        // let inNodesData = inNodes.map(e => graph.nodesData[e.id]);
        
    }

    submit() {
        console.log(this.form);
        this.store.actions.graph.updateNodeData({...this.nodeData, ...this.form});
        this.store.actions.graph.applyDisplayFunctions();
    }

    // matchEdgeData(nodeId) {
    //     let edge = this.nodeModel.outEdges.filter(ed => ed.target === nodeId)[0];
    //     let edgeData = this.nodeModel.outEdgesData.filter(ed => ed.id === edge.id)[0];
    //     return edgeData
    // }

    //matchInEdgeData(nodeId) {
        // let edge = this.inEdges.filter(ed => ed.source === nodeId)[0];
        // let edgeData = this.inEdgesData.filter(ed => ed.id === edge.id)[0];
        // console.log('in edges', edgeData)
        // return edgeData
    //}

    save() {

    }

}