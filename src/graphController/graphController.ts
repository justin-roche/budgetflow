import { BehaviorSubject } from 'rxjs';
import * as Rx from 
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';

const selectGraph = state => state.graph;

@inject(EventAggregator, Store, GraphService)
export class GraphController {

    d3 = window['d3'];
    svg;

    dragging = false;
    containerRef;
    container;
    simulation;
    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store<any>, private gs: GraphService) {
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
        } 

        if(this.simulation) {
            
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
        let self = this;
        let d3 = this.d3;

        let nodeGroups = this.container.selectAll(".nodeGroup").data(nodesArray, function (d) {
            return d.key;
        });
        nodeGroups.exit().remove();

        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
        console.log(newGroups);
       
        let newCircles = newGroups
        .each(function(d,i,groups){
            if(d.shape === 'square') {
                d3.select(this).append("rect")
                .attr('class', 'node')
            } else {
                d3.select(this).append("circle")
                .attr('class', 'node')
            }
            
        })
        
        
        //.append("circle")
        
         //.append('path')
        //.attr("d", d3.symbol('circle').size(30)) 
        //.type('square')
        //.size(100) 

        newGroups.append("text")
        this.addDragListener();
        this.addMouseOverListener();
    }

    renderNodes(data) {
        let d3 = this.d3;

        this.svg.
            selectAll("text")
            .attr('class', 'label')
            .text(function (d) {
                return d.id + ':' + data.nodesData[d.id].value;
            })

        this.svg
            .selectAll(".node")
            .each(function(d){
                if(d.shape === 'square'){
                    d3.select(this)
                     .attr("x", d.x)
                     .attr("y", d.y)
                    //  .attr("rx", d.x)
                    //  .attr("ry", d.y)
                    .attr("height", 20)
                    .attr('width', 20)
                } else {
                    d3.select(this)
                    .attr("x", d.x)
                    .attr("y",  d.y)
                    .attr("cx", d.x)
                    .attr("cy", d.y)
                    .attr("r", 20)
                }
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
            .attr('id', function (d) {
                return d.id;
            })
            //.attr('marker-end', "url(#arrow)")
    }

    /* simuluation */

    createSimulation() {
        let d3 = this.d3;
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2));
    }

    renderForce(_nodes, edges) {
        let d3 = this.d3;
        let svg = this.svg;

        let nodes = svg.selectAll('.node');
        let links = svg.selectAll('.link')
        let labels = svg.selectAll('.label');

        this.simulation
            .nodes(_nodes)
            .on("tick", ticked);

        this.simulation.force("link")
            .links(edges);

        function ticked() {
            links
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            nodes.each(function(d) {
                if(d.shape === 'square'){
                    d3.select(this)
                    .attr("x", function (d) { return d.x; })
                    .attr("y", function (d) { 
                        return d.y - Number(d3.select(this).attr('height')/2); 
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
                return "translate(" + (d.x + 10) + "," + (d.y + 10) + ")";
            });
        }
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

            // node.classed("node-active", function (o) {
            //     this.setAttribute('fill-opacity', o);
            //     return true;
            // });

            // link.classed("link-active", function (o) {
            //     return true
            // });

            // self.d3.select(this).classed("node-active", .5);
            self.d3.select(this)
                .attr('class', 'selected-node')
                // .transition()
                // .duration(750)
                // .attr("r", 50);
        })

            .on("mouseout", function (d) {

                //node.classed("node-active", false);
                // link.classed("link-active", false);

                self.d3.select(this)
                    .attr('class', 'node')
                    // .transition()
                    // .duration(750)
                    // .attr("r", 20);
            });
    }

    addDragListener() {
        let d3 = this.d3;
        let self: any = this;
        let circles = this.svg.selectAll('.node');

        circles.on('mousedown.drag', null);

        console.log('adding listener to', circles)
        circles.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        circles.on('click', function(d) {
            console.log("clicked", d);
            d3.event.preventDefault();
            d3.event.stopPropagation();
        })

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
        this.simulation.alpha(0);
        // this.simulation.force("charge", this.d3.forceManyBody().strength(0))
        this.store.dispatch({ type: 'ADD_NODE', payload: { x: e.offsetX, y: e.offsetY } });
    }

    force2(nodes, links) {

    }