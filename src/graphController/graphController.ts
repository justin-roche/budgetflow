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

        let nodesArray = this.getNodesArray(data.nodes, data);
        let edgesArray = this.getEdgesArray(data.edges, data);

        /* edges */
        this.addLinks(edgesArray, data);
        this.renderLinks(data)

        /* nodes */
        this.addNodes(nodesArray, data);
        this.renderNodes(data);
        
        this.renderForce(nodesArray, edgesArray);

    }

    addLinks(edgesArray, data) {
        let linkGroups = this.svg.selectAll(".linkGroup").data(edgesArray, function (d) {
            return d.key;
        })
        linkGroups.exit().remove();
        linkGroups.enter().append("g").attr("class", "linkGroup").append("line")
    }

    addNodes(nodesArray, data) {
        let nodeGroups = this.svg.selectAll(".nodeGroup").data(nodesArray, function (d) {
            return d.key;
        });
        nodeGroups.exit().remove();

        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
        let newCircles = newGroups.append("circle")
        newGroups.append("text")
        this.addDragListener(newCircles);
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
            .attr("r", 20)
            .attr('cx', function(d){ return d.x})
            .attr('cy', function(d){return d.y});
            .attr('stroke', 'white')
            .attr('stroke-width', 3)
            .attr("fill", function (d, i) {
                return 'blue';
            })

    }

    renderLinks(data) {

        this.svg.selectAll('line')
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr('id', function (d) {
                return d.id;
            })
            .attr('marker-end', "url(#arrow)")
    }

    renderForce(nodes, edges) {
        let d3 = this.d3;
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        let circles = svg.selectAll('circle');
        let links = svg.selectAll('.link')
        let labels = svg.selectAll('.label');

        if(!this.simulation) {
            this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody().strength(-5000))
            .force("center", d3.forceCenter(width / 2, height / 2));
        }
        
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

    addDragListener(circles) {
        let d3 = this.d3;
        let self: any = this;

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
           // if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
           // if (!d3.event.active) self.simulation.alphaTarget(0);
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
        this.store.dispatch({ type: 'ADD_NODE', payload: {x: e.x, y: e.y} });
    }



}