import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs'
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import { createSimulation, updateSimulationElements, initializeSimulation } from './simulation';
import { addContainer, renderLinks, renderNodes, addNodes, addLinks } from './render';
import {
    addZoomListener, addMouseOverListener, addDragListener,
    addClickListener, addDblClickListener, onBackgroundClick, addKeyListeners
} from './listeners'
import { _ } from 'underscore';

const selectGraph = state => state.graph;

declare interface D3NodeConfig extends AppNode {
    key: String,
}
declare interface D3EdgeConfig extends Edge {
    key: String,
}

@inject(EventAggregator, Store)
export class GraphController {

    d3 = window['d3'];
    svg;
    $graph;
    $ui;
    dragging = false;
    simulate = false;
    ui;
    graph;
    containerRef;
    paused = false;
    container;
    simulation;
    settings;
    onBackgroundClick = onBackgroundClick.bind(this);
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    edges = [];
    nodes = [];

    constructor(private ea: EventAggregator, private store: Store) {
        let previousValue;
        let self = this;

        this.store.select('graph', { bind: [this, 'graph'] }).subscribe(d => {
            this.refresh(d);
        })
        this.store.select('ui.graphContainer', { bind: [this, 'ui'] }).subscribe(d => {
            if (this.container && this.graph) {
                this.refresh(this.graph);
            }
        })
    }

    attached() {
        addKeyListeners.call(this)
        addContainer.call(this);
    }

    /* refresh */

    refresh(graph: Graph) {

        /* state -> d3 data join */
        this.nodes = this.convertNodesToArray(graph);
        this.edges = this.convertEdgesToArray(graph);

        if (this.simulation) {
            this.nodes = this.extendNodesWithLayoutProperties(this.nodes); /* extend nodes with existing simulation properties */
        }

        /* d3 -> dom data join */
        addLinks.call(this, this.edges, graph);
        renderLinks.call(this, graph)
        addNodes.call(this, this.nodes, graph);
        renderNodes.call(this);
        
        // /* adding d3 data to simulation, associates links to nodes */
        if (this.simulation) {
            updateSimulationElements.call(this);
        } else {
            this.simulation = createSimulation.call(this);
        }
        addKeyListeners.call(this);
        addDragListener.call(this);
        // this.addMouseOverListener();
        addClickListener.call(this);
        addDblClickListener.call(this);
    }

    /* state join- joines the d3 config data to redux */

    /* convert graph.nodes object to array with unique keys */
    convertNodesToArray(graph: Graph): Array<D3NodeConfig> {
        return Object.keys(graph.nodesData).map(key => {
            return { ...graph.nodesData[key].d3, key: graph.id + graph.nodesData[key].d3.id }
        });
    }

    /* convert graph.edges object to array with unique keys */
    convertEdgesToArray(graph: Graph): Array<D3EdgeConfig> {
        let edgeList = _.flatten(graph.edgesData)
        .filter(ed => Boolean(ed));
        
        return edgeList.map(edgeData => {
            return { ...edgeData.d3, key: graph.id + edgeData.id }
        });
    }

  

    /* copy the input nodes state to the existing layout nodes array */
    extendNodesWithLayoutProperties(nodesArr) {
        let simNodes = this.simulation.nodes();
        nodesArr.forEach(node => {
            let match = simNodes.filter(n => n.key === node.key)[0];
            if (match) {
                for (let prop in node) {
                    if (prop !== 'x' && prop !== 'y') {
                        match[prop] = node[prop]; // update the existing properties on nodes already in the graph simulation
                    }
                }
            } else {
                simNodes.push(node); // add nodes for which no key exists
            }
        });

        simNodes = simNodes.filter(simNode => nodesArr.some(node => {
            return node.key === simNode.key // remove sim nodes that no longer exist in the graph Nodes
        }));

        return simNodes;
    }

}
