import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs'
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';

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
    container;
    simulation;
    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store) {
        let previousValue;
        let self = this;

        this.store.select('graph', {bind: [this, 'graph']}).subscribe(d => {
            this.refresh(d);
        })
        this.store.select('ui', {bind: [this, 'ui']}).subscribe(d => {
            if(this.container && this.graph) {
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

    /* state join- joines the d3 config data to redux */

    /* convert graph.nodes object to array with unique keys */
    convertNodesToArray(graph: Graph) : Array<D3NodeConfig> {
        return Object.keys(graph.nodes).map(key => 
            { return { ...graph.nodes[key], key: graph.id + graph.nodes[key].id } 
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
            this.simulation.alpha(1).restart();
        } else {
            this.createSimulation(d3NodesArray, d3EdgesArray);
        }

        this.addDragListener();
        // this.addMouseOverListener();
        this.addClickListener();
        this.addDblClickListener();
    }

    addLinks(edgesArray, data) {
        let linkGroups = this.container.select('#linklayer')
        .selectAll(".linkGroup")
        .data(edgesArray, function (d) {
            return d.key;
        })
        linkGroups.exit().remove();
        linkGroups.enter().append("g").attr("class", "linkGroup").append("line").attr("marker-end", "url(#end)");
    }

    addNodes(nodesArray, data) {
        let self = this;
        let d3 = this.d3;

        let l = this.container.select('#nodelayer');
        let x = l.selectAll(".nodeGroup");
        let nodeGroups = x.data(nodesArray, function (d) {
            return d.key;
        });

        nodeGroups.exit().remove(); // remove all nodes for which no key exists in the d3 graph config
        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup") // add new nodes where no key exists in the Dom
        console.log(newGroups);

        let newCircles = newGroups
            .each(function (d, i, groups) {
                if (d.shape === 'square') {
                    d3.select(this).append("rect")
                        .attr('class', 'node')
                } else {
                    d3.select(this).append("circle")
                        .attr('class', 'node')
                }
            })

        newGroups.append("text")

    }

    renderNodes() {
        let d3 = this.d3;
        let selectedNodeId = this.ui.graphContainer.selectedNodeId;
        let data = this.graph; 
        
        this.svg.
            selectAll("text")
            .attr('class', 'label')
            .text(function (d) {
                let dd = data.nodesData[d.id].displayData;
                return dd.label;
            })

        this.svg
            .selectAll(".node")
            .each(function (d) {
                let selected = d3.select(this);
                let nd = data.nodesData[d.id];
                let dd = nd.displayData;
                if(selectedNodeId === d.id){
                    selected.classed('selected-node', true);
                } else {
                    selected.classed('selected-node', false);
                }

                
                if (dd.shape === 'square') {
                    selected
                        .attr("x", d.x)
                        .attr("y", d.y)
                        .attr("height", 20)
                        .attr('width', 20)
                } else {
                    selected
                        .attr("x", d.x)
                        .attr("y", d.y)
                        .attr("cx", d.x)
                        .attr("cy", d.y)
                        .attr("r", 20)
                }

                if(nd.displayData.active === false) {
                    selected.attr('fill', 'gray')
                    // selected.classed('inactive-node', true);
                } else {
                    selected.attr('fill', 'white');
                    // selected.classed('inactive-node', false);
                }

                selected
                // .attr('stroke', 'white')
                // .attr('stroke-width', 3)
                // .attr("fill", function (d, i) {
                //     return dd.outlineColor;
                // })
                
            })
            
           
    }

    renderLinks(data) {
        let selectedEdgeId = this.ui.graphContainer.selectedEdgeId;
        let d3 = this.d3;

        this.container.selectAll('line')
            .attr("class", "link")
            .attr('id', function (d) {
                return d.id;
            })
            .each(function(d){
                let selected = d3.select(this);
                if(selectedEdgeId === d.id){
                    selected.classed('selected-edge', true);
                } else {
                    selected.classed('selected-edge', false);
                }
            })
    }

    /* simuluation */

    createSimulation(_nodes, _links) {
        let d3 = this.d3;
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let labels = svg.selectAll('.label');

        this.simulation = d3.forceSimulation(_nodes)
            .force("link", d3.forceLink(_links).id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .velocityDecay(0.9)
            .alphaTarget(1)
            .on("tick", ticked);

        function ticked() {
            let nodes = svg.selectAll('.node');
            let links = svg.selectAll('.link')
            let labels = svg.selectAll('.label')

            links
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            nodes.each(function (d) {
                if (d.shape === 'square') {
                    d3.select(this)
                        .attr("x", function (d) { return d.x; })
                        .attr("y", function (d) {
                            return d.y - Number(d3.select(this).attr('height') / 2);
                        })
                    // .attr("rx", function (d) { return d.x; })
                    // .attr("ry", function (d) { return d.y; });
                } else {
                    d3.select(this)
                        .attr("cx", function (d) { return d.x; })
                        .attr("cy", function (d) { return d.y; })
                }
            })

            labels.attr("transform", function (d) {
                return "translate(" + (d.x + 20) + "," + (d.y + 20) + ")";
            });
        }
    }

    renderForce(_nodes, edges) {
        let d3 = this.d3;
        let svg = this.svg;

    }

    addZoomListener() {
        let self = this;
        let d3 = this.d3;

        let zoomHandler = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        this.container.call(zoomHandler);

        function zoomed(e) {
            self.container.attr("transform", d3.event.transform)
        }
    }

    addMouseOverListener() {
        let node = this.svg.selectAll('.node');
        let link = this.svg.selectAll('line');
        let self = this;
        node.on("mouseover", function (d) {

           
            self.d3.select(this)
                .attr('class', 'selected-node')
           
        })

            .on("mouseout", function (d) {

                self.d3.select(this)
                    .attr('class', 'node')
             
            });
    }

    addDragListener() {
        let d3 = this.d3;
        let self: any = this;
        let circles = this.svg.selectAll('.node');

        circles.on('mousedown.drag', null);

        circles.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        function dragstarted(d) {
            self.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            self.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    addClickListener() {
        let d3 = this.d3;
        let nodes = this.container.selectAll('.node')
        let self = this;
        nodes.on('click', function (d) {
            d3.event.preventDefault();
            d3.event.stopPropagation();
            let previous = self.ui.graphContainer.selectedNodeId; 
            
            if(previous) {
                if(previous === d.id) {
                    self.store.dispatch({ type: 'SELECT_NODE', payload: null });
                } 
                if(previous !== d.id) {
                    self.store.dispatch({ type: 'EDGE_ADD', payload: {edge:{ source: previous, target: d.id }} });
                    self.store.dispatch({ type: 'SELECT_NODE', payload: null });
                }
            }
            else {
                self.store.dispatch({ type: 'SELECT_NODE', payload: d.id });
            }
            
            
        })

        let links = this.container.selectAll('.link')

        links.on('click', function (d) {
            d3.event.preventDefault();
            d3.event.stopPropagation();
            let previous = self.ui.graphContainer.selectedEdgeId; 
            if(previous === d.id) {
                self.store.dispatch({ type: 'UI_SELECT_EDGE', payload: null });
                self.store.dispatch({ type: 'UI_EDGE_EDITOR_TOGGLE'});
            } else {
                self.store.dispatch({ type: 'UI_SELECT_EDGE', payload: d.id });
                self.store.dispatch({ type: 'UI_EDGE_EDITOR_TOGGLE'});
            }
        })
        
    }

    addDblClickListener() {
        let d3 = this.d3;
        let nodes = this.container.selectAll('.node')
        let self = this;
        nodes.on('dblclick', function (d) {
            d3.event.preventDefault();
            d3.event.stopPropagation();
            let previous = self.ui.selectedNodeId; 
            alert(previous)
            self.store.dispatch({ type: 'SELECT_NODE', payload: d.id });
            self.store.dispatch({type: 'SHOW', payload: 'Node_Editor'});
            
        })
        
    }

    onBackgroundClick(e) {
        console.log('background dlick')
        this.store.dispatch({ type: 'ADD_NODE', payload: { x: e.offsetX, y: e.offsetY } });
    }

    addEdge() {
        this.store.dispatch({ type: 'ADD_EDGE', payload: { source: 'n6', target: 'n7' } });
    }

    addKeyListeners() {
        let self = this;
        document.onkeydown =  function(e) {
            console.log(e);
            // if(e.key === "Backspace") {
            //     if(self.ui.selectedNodeId) {
            //         self.store.dispatch({ type: 'DELETE_NODE', payload: { id: self.ui.selectedNodeId } });
            //         self.store.dispatch({ type: 'SELECT_NODE', payload: null });
            //     }
            // }
        }
    }

}
