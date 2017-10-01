import { BehaviorSubject } from 'rxjs';
import * as Rx from 
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import {SimulationFunctions} from '../simulator/simulationFunctions';

const selectGraph = state => state.graph;

@inject(EventAggregator, Store)
export class GraphController {

    d3 = window['d3'];
    svg;

    dragging = false;
    containerRef;
    container;
    simulation;
    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store<any>) {
        let previousValue;
        this.$graph = this.store.select('graph');
        this.$graph.subscribe(d => {
            this.refresh(d);
        })

    }

    getCurrentGraph(s) {
        return s.graph;
    }

    attached() {
        this.svg = this.d3.select('svg');
        this.svg
            .attr("width", 1200)
            .attr("height", 800);
    }

    getNodesArray(nodesObj, data) {
        return Object.keys(data.nodes).map(key => { return { ...data.nodes[key], key: data.id + data.nodes[key].id } });
    }

    getEdgesArray(edgesObj, data) {
        return Object.keys(data.edges).map(key => { return { ...data.edges[key], key: data.id + data.edges[key].id } });
    }

    refresh(data) {
        if (!this.container) {
            this.svg = this.d3.select('svg');
            this.container = this.svg.append('g');
            this.addZoomListener();
        } else {

        }
        let nodesArray = this.getNodesArray(data.nodes, data);
        let edgesArray = this.getEdgesArray(data.edges, data);

        /* edges */
        this.addLinks(edgesArray, data);
        this.renderLinks(data)

        /* nodes */
        this.addNodes(nodesArray, data);
        this.renderNodes(data);
        

        this.createSimulation();
        this.renderForce(nodesArray, edgesArray);

    }

    addLinks(edgesArray, data) {
        let linkGroups = this.container.selectAll(".linkGroup").data(edgesArray, function (d) {
            return d.key;
        })
        linkGroups.exit().remove();
        linkGroups.enter().append("g").attr("class", "linkGroup").append("line")
    }

    addNodes(nodesArray, data) {
        let nodeGroups = this.container.selectAll(".nodeGroup").data(nodesArray, function (d) {
            return d.key;
        });
        nodeGroups.exit().remove();

        /* propagate data down */
        //nodeGroups.select('circle')
        //nodeGroups.select('text')

        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
        let newCircles = newGroups.append("circle");
        newGroups.append("text")
        this.addDragListener();
        this.addMouseOverListener();
    }

    renderNodes(data) {

        this.svg.
            selectAll("text")
            .attr('class', 'label')
            .text(function (d) {
                return d.id + ':' + data.nodesData[d.id].value;
            })

        this.svg
             .selectAll("circle")
            .attr("class", "node")
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            })
            .attr("cx", function (d) {
                return d.x
            })
            .attr("cy", function (d) {
                return d.y
            })
            .attr("r", function(d) {
                return 20;  
            })
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .attr("fill", function (d, i) {
                return 'blue';
            })

    }

    renderLinks(data) {

        this.container.selectAll('line')
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr('id', function (d) {
                return d.id;
            })
            .attr('marker-end', "url(#arrow)")
    }

    createSimulation() {
        let d3 = this.d3;
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));
    }

    renderForce(nodes, edges) {
        let d3 = this.d3;
        let svg = this.svg;

        let circles = svg.selectAll('circle');
        let links = svg.selectAll('.link')
        let labels = svg.selectAll('.label');

        this.simulation
            .nodes(nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(edges);

        function ticked() {
            links
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            circles
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; });

            labels.attr("transform", function (d) {
                return "translate(" + (d.x + 10) + "," + (d.y + 10) + ")";
            });
        }
    }

    addZoomListener() {
        this.d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        function zoomed() {
            this.container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }
    }

    addMouseOverListener() {
        let node = this.svg.selectAll('circle');
        let link = this.svg.selectAll('line');
        let self = this;
        node.on("mouseover", function (d) {

            node.classed("node-active", function (o) {
                this.setAttribute('fill-opacity', o);
                return true;
            });

            // link.classed("link-active", function (o) {
            //     return true
            // });

            self.d3.select(this).classed("node-active", .5);
            self.d3.select(this).transition()
                .duration(750)
                .attr("r", 50);
        })

            .on("mouseout", function (d) {

                node.classed("node-active", false);
                // link.classed("link-active", false);

                self.d3.select(this).transition()
                    .duration(750)
                    .attr("r", 20);
            });
    }

    addDragListener() {
        let d3 = this.d3;
        let self: any = this;
        let circles = this.svg.selectAll('circle');

        circles.on('mousedown.drag', null);

        console.log('adding listener to', circles)
        circles.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        // circles.on('click', function(d) {
        //     console.log("clicked", d);
        //     d3.event.preventDefault();
        //     d3.event.stopPropagation();
        // })

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
            // self.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }

    onClick(d) {
        console.log('node click', d);
        //        this.store.dispatch({ type: 'SELECT_NODE', payload: d.id });
    }

    onBackgroundClick(e) {
        console.log('background dlick')
        this.store.dispatch({ type: 'ADD_NODE', payload: { x: e.offsetX, y: e.offsetY } });
    }

    force2(nodes, links) {
        //     let d3 = this.d3;

        //     var margin = { top: -5, right: -5, bottom: -5, left: -5 };
        //     var width = 500 - margin.left - margin.right,
        //         height = 400 - margin.top - margin.bottom;

        //     var color = d3.scale.category20();

        //     var force = d3.layout.force()
        //         .charge(-200)
        //         .linkDistance(50)
        //         .size([width + margin.left + margin.right, height + margin.top + margin.bottom]);



        //     var drag = d3.behavior.drag()
        //         .origin(function (d) { return d; })
        //         .on("dragstart", dragstarted)
        //         .on("drag", dragged)
        //         .on("dragend", dragended);


        //     var svg = d3.select("#map").append("svg")
        //         .attr("width", width + margin.left + margin.right)
        //         .attr("height", height + margin.top + margin.bottom)
        //         .append("g")
        //         .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
        //         .call(zoom);

        //     var rect = svg.append("rect")
        //         .attr("width", width)
        //         .attr("height", height)
        //         .style("fill", "none")
        //         .style("pointer-events", "all");

        //     var container = svg.append("g");

        //     force
        //         .nodes(graph.nodes)
        //         .links(graph.links)
        //         .start();



        //     var link = container.append("g")
        //         .attr("class", "links")
        //         .selectAll(".link")
        //         .data(graph.links)
        //         .enter().append("line")
        //         .attr("class", "link")
        //         .style("stroke-width", function (d) { return Math.sqrt(d.value); });

        //     var node = container.append("g")
        //         .attr("class", "nodes")
        //         .selectAll(".node")
        //         .data(graph.nodes)
        //         .enter().append("g")
        //         .attr("class", "node")
        //         .attr("cx", function (d) { return d.x; })
        //         .attr("cy", function (d) { return d.y; })
        //         .call(drag);

        //     node.append("circle")
        //         .attr("r", function (d) { return d.weight * 2 + 12; })
        //         .style("fill", function (d) { return color(1 / d.rating); });


        //     force.on("tick", function () {
        //         link.attr("x1", function (d) { return d.source.x; })
        //             .attr("y1", function (d) { return d.source.y; })
        //             .attr("x2", function (d) { return d.target.x; })
        //             .attr("y2", function (d) { return d.target.y; });

        //         node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
        //     });





        //     function dottype(d) {
        //         d.x = +d.x;
        //         d.y = +d.y;
        //         return d;
        //     }



        //     function dragstarted(d) {
        //         d3.event.sourceEvent.stopPropagation();
        //         d3.select(this).classed("dragging", true);
        //         force.start();
        //     }

        //     function dragged(d) {
        //         d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        //     }

        //     function dragended(d) {
        //         d3.select(this).classed("dragging", false);
        //     }

        // }

    }