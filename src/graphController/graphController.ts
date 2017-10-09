import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs'
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';

const selectGraph = state => state.graph;

@inject(EventAggregator, Store)
export class GraphController {

    d3 = window['d3'];
    svg;
    $graph;
    $ui;
    dragging = false;
    ui;
    containerRef;
    container;
    simulation;
    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store) {
        let previousValue;
        let self = this;
        this.$graph = this.store.select('graph');
        this.$graph.subscribe(d => {
            this.refresh(d);
        })
        this.$ui = this.store.select('ui.graphContainer');
        this.$ui.subscribe(d => {
            self.ui = d;
            if(this.container) {
                this.refresh(this.store.getState().graph);
            }
        })

    }

    getCurrentGraph(s) {
        return s.graph;
    }

    attached() {
        this.addKeyListeners()
        this.svg = this.d3.select('svg');
        this.svg
            .attr("width", 1200)
            .attr("height", 800);
    }

    /* state join */

    getNodesArray(nodesObj, data) {
        return Object.keys(data.nodes).map(key => { return { ...data.nodes[key], key: data.id + data.nodes[key].id } });
    }

    getEdgesArray(edgesObj, data) {
        return Object.keys(data.edges).map(key => { return { ...data.edges[key], key: data.id + data.edges[key].id } });
    }

    /* copy the input nodes state to the existing layout nodes array */
    addLayoutState(nodesArr) {
        let base = this.simulation.nodes();
        nodesArr.forEach(node => {
            let match = base.filter(n => n.key === node.key)[0];
            if (match) {
                for (let prop in node) {
                    if (prop !== 'x' && prop !== 'y') {
                        match[prop] = node[prop];
                    }
                }
            } else {
                base.push(node);
            }
        });
        base = base.filter(baseNode => nodesArr.some(node => node.key === baseNode.key));
        return base;
    }

    /* refresh */

    refresh(data) {
        let nodesArray, edgesArray;

        if (!this.container) {
            this.svg = this.d3.select('svg');
            this.container = this.svg.append('g');
            this.addZoomListener();
        }

        nodesArray = this.getNodesArray(data.nodes, data); // returns pure original, lost x,y
        edgesArray = this.getEdgesArray(data.edges, data);

        if (this.simulation) {
            nodesArray = this.addLayoutState(nodesArray); /* data join on force layout data */
        }

        /* edges */
        this.addLinks(edgesArray, data);
        this.renderLinks(data)

        /* nodes */
        this.addNodes(nodesArray, data);
        this.renderNodes();

        if (this.simulation) {
            this.simulation.nodes(nodesArray);
            this.simulation.force("link").links(edgesArray);
            this.simulation.alpha(1).restart();
        } else {
            this.createSimulation(nodesArray, edgesArray);
        }

        this.addDragListener();
        // this.addMouseOverListener();
        this.addClickListener();
        this.addDblClickListener();
    }

    addLinks(edgesArray, data) {
        let linkGroups = this.container.selectAll(".linkGroup").data(edgesArray, function (d) {
            return d.key;
        })
        linkGroups.exit().remove();
        linkGroups.enter().append("g").attr("class", "linkGroup").append("line")
    }

    addNodes(nodesArray, data) {
        let self = this;
        let d3 = this.d3;

        let nodeGroups = this.container.selectAll(".nodeGroup").data(nodesArray, function (d) {
            return d.key;
        });

        nodeGroups.exit().remove();

        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
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
        let selectedNodeId = this.store.getState().ui.graphContainer.selectedNodeId;
        let data = this.store.getState().graph; 
        
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

                if(nd.active === false) {
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

        this.container.selectAll('line')
            .attr("class", "link")
            .attr('id', function (d) {
                return d.id;
            })
        //.attr('marker-end', "url(#arrow)")
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
            let previous = self.ui.selectedNodeId; 

            if(previous) {
                if(previous === d.id) {
                    self.store.dispatch({ type: 'SELECT_NODE', payload: null });
                } 
                if(previous !== d.id) {
                    self.store.dispatch({ type: 'ADD_EDGE', payload: { source: previous, target: d.id } });
                    self.store.dispatch({ type: 'SELECT_NODE', payload: null });
                }
            }
            else {
                self.store.dispatch({ type: 'SELECT_NODE', payload: d.id });
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
            if(e.key === "Backspace") {
                if(self.ui.selectedNodeId) {
                    self.store.dispatch({ type: 'DELETE_NODE', payload: { id: self.ui.selectedNodeId } });
                    self.store.dispatch({ type: 'SELECT_NODE', payload: null });
                }
            }
        }
    }

}
