import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs'
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import { createSimulation } from './force';
import { renderLinks, renderNodes, addNodes, addLinks} from './render';
import { addZoomListener, addMouseOverListener, addDragListener, 
    addClickListener, addDblClickListener, onBackgroundClick, addKeyListeners} from './listeners'

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
    ui;
    graph;
    containerRef;
    paused = false;
    container;
    simulation;
    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store) {
        let previousValue;
        let self = this;
        this.renderLinks = renderLinks.bind(this);
        this.renderNodes = renderNodes.bind(this);
        this.addNodes = addNodes.bind(this);
        this.addLinks = addLinks.bind(this);
        this.addZoomListener = addZoomListener.bind(this); 
        this.addMouseOverListener = addMouseOverListener.bind(this);
        this.addDragListener = addDragListener.bind(this);
        this.addClickListener = addClickListener.bind(this);
        this.addDblClickListener = addDblClickListener.bind(this);
        this.onBackgroundClick = onBackgroundClick.bind(this);
        this.addKeyListeners = addKeyListeners.bind(this);

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
        this.addKeyListeners()
        this.svg = this.d3.select('svg');
        this.svg
            .attr("width", 1200)
            .attr("height", 800);

        if (!this.container) {
            this.svg = this.d3.select('svg');
            this.container = this.svg.append('g');
            this.addZoomListener();
        }
        this.container.append("g").attr("id", "linklayer")
        this.container.append("g").attr("id", "nodelayer")

        this.container.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 25)
            .attr("refY", 0)
            .attr("markerWidth", 2)
            .attr("markerHeight", 2)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
    }

    /* refresh */

    refresh(graph: Graph) {
        let d3NodesArray, d3EdgesArray;

        /* state -> d3 data join */
        d3NodesArray = this.convertNodesToArray(graph);
        d3EdgesArray = this.convertEdgesToArray(graph);

        if (this.simulation) {
            d3NodesArray = this.extendNodesWithLayoutProperties(d3NodesArray); /* extend nodes with existing simulation properties */
        }

        /* d3 -> dom data join */
        this.addLinks(d3EdgesArray, graph);
        this.renderLinks(graph)
        this.addNodes(d3NodesArray, graph);
        this.renderNodes();

        // /* adding d3 data to simulation, associates links to nodes */
        if (this.simulation) {
            this.simulation.nodes(d3NodesArray);
            this.simulation.force("link").links(d3EdgesArray);
            let alpha = this.paused? -1 : 1
            this.simulation.alphaTarget(alpha).restart();
        } else {
             this.simulation = createSimulation(d3NodesArray, d3EdgesArray);
        }
        this.addKeyListeners();
         this.addDragListener();
        // this.addMouseOverListener();
        // this.addClickListener();
        // this.addDblClickListener();
    }

    /* state join- joines the d3 config data to redux */

    /* convert graph.nodes object to array with unique keys */
    convertNodesToArray(graph: Graph): Array<D3NodeConfig> {
        return Object.keys(graph.nodes).map(key => {
            return { ...graph.nodes[key], key: graph.id + graph.nodes[key].id }
        });
    }

    /* convert graph.edges object to array with unique keys */
    convertEdgesToArray(graph: Graph): Array<D3EdgeConfig> {
        return Object.keys(graph.edges).map(edgeName => {
            return { ...graph.edges[edgeName], key: graph.id + graph.edges[edgeName].id }
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
