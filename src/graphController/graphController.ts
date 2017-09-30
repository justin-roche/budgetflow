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

    dragging = false;
    containerRef;

    settings;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private ea: EventAggregator, private store: Store<any>, private gs: GraphService) {
        let previousValue;
        this.$graph = this.store.select('graph');
        this.$graph.subscribe(d => {
            this.refresh(d);
        })

    }

    graphChanged(current, last) {

    }

    getCurrentGraph(s) {
        return s.graph;
    }

    attached() {
        let svg = this.d3.select('svg');
        // this.appendDefs(svg);
        //var c10 = d3.scale.category10();
        svg
            .attr("width", 1200)
            .attr("height", 800);
    }

    refresh(data) {
        let d3 = this.d3;
        let svg = d3.select('svg');
        let drag = this.onDrag();

        let links, nodes;
        let self = this;

        let nodesArray = this.getNodesArray(data.nodes, data);
        let edgesArray = this.getEdgesArray(data.edges, data);
        console.log('current edge keys', edgesArray.map(edge => edge.key))
         // /* edges */
         let linkGroups = svg.selectAll(".linkGroup").data(edgesArray, function (d) {
            console.log('edge keys', d.key);
            return d.key;
        })
        console.log('links', linkGroups)
        linkGroups.exit().remove();
        let newLinkGroups = linkGroups.enter().append("g").attr("class", "linkGroup")
        newLinkGroups.append("line")
        var newLinks = this.renderLinks(newLinkGroups, data)

        /* nodes */
        let nodeGroups = svg.selectAll(".nodeGroup").data(nodesArray, function (d) {
            console.log('node keys', d.key)
            return d.key;
        });
        console.log('nodegroups', nodeGroups)
        nodeGroups.exit().remove();

        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
        newGroups.append("circle")
        newGroups.append("text")
        let newnodes = this.renderNodes(newGroups, data);
        
        let oldNodes = nodeGroups.attr("class", "nodeGroup")
        this.renderNodes(oldNodes, data);

        let labels = svg.selectAll('text.label');

        this.renderForce(newnodes, newLinks, labels, nodesArray, edgesArray);

        
    }

    renderNodes(selection, data) {
        let d3 = this.d3;

        selection.
            selectAll("text")
            .attr('class', 'label')
            .text(function (d) {
                // console.log(d.id);
                return d.id + ':' + data.nodesData[d.id].value;
            })

        return selection
            .selectAll("circle")
            .attr("class", "node")
            .attr("r", 20)
            .attr("fill", function (d, i) {
                return 'blue';
            })

    }

    renderLinks(selection, data) {

        return selection.selectAll('line')
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr('id', function (d) {
                return d.id;
            })
            .attr('marker-end', "url(#arrow)")
    }

    getNodesArray(nodesObj, data) {
        return Object.keys(data.nodes).map(key => { return { ...data.nodes[key], key: data.id + data.nodes[key].id } });
    }

    getEdgesArray(edgesObj, data) {
        return Object.keys(data.edges).map(key => { return { ...data.edges[key], key: data.id + data.edges[key].id } });
    }

    onDrag() {
        let d3 = this.d3;
        let svg = this.d3.select('svg');

        return d3.drag()
            .on("start", function () { })
            .on("drag", function (n, i) {
                let nodeDescription = n; //nd.x is the original origin
                let group = this;
                group.x = group.x || 0 // group.x is the accumulated transformation
                group.y = group.y || 0

                group.x += d3.event.dx; //d.x is the instance transformation
                group.y += d3.event.dy;
                d3.select(this).attr("transform", "translate(" + group.x + "," + group.y + ")");
                // d3.select(this).attr("cx", 100).attr("cy", 100);

                let links = svg.selectAll(".link");

                links.each(function (l, li) {
                    if (l.sourceId == nodeDescription.id) {
                        d3.select(this).attr("x1", nodeDescription.x + group.x).attr("y1", nodeDescription.y + group.y);
                    } else if (l.targetId == nodeDescription.id) {
                        d3.select(this).attr("x2", nodeDescription.x + group.x).attr("y2", nodeDescription.y + group.y);
                    }

                });
            })
            .on("end", function () { });
    }

    appendDefs(svg) {
        let d3 = this.d3;
        var data = [
            { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
            , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
            , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
            , { id: 2, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
        ]

        //var color = d3.scale.category10(),
        var color = 'black',
            margin = { top: 50, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select('svg')
        //   .append('svg:svg')
        //     .attr('width', width + margin.left + margin.right)
        //     .attr('height', height + margin.top + margin.bottom);

        var defs = svg.append('svg:defs')

        var paths = svg.append('svg:g')
            .attr('id', 'markers')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var marker = defs.selectAll('marker')
            .data(data)
            .enter()
            .append('svg:marker')
            .attr('id', function (d) { return 'marker_' + d.name })
            .attr('markerHeight', 5)
            .attr('markerWidth', 5)
            .attr('markerUnits', 'strokeWidth')
            .attr('orient', 'auto')
            .attr('refX', 0)
            .attr('refY', 0)
            .attr('viewBox', function (d) { return d.viewbox })
            .append('svg:path')
            .attr('d', function (d) { return d.path })
            .attr('fill', function (d, i) { return 'black' });

        var path = paths.selectAll('path')
            .data(data)
            .enter()
            .append('svg:path')
            .attr('d', function (d, i) { return 'M 0,' + (i * 100) + ' L ' + (width - margin.right) + ',' + (i * 100) + '' })
            .attr('stroke', function (d, i) { return 'black' })
            .attr('stroke-width', 5)
            .attr('stroke-linecap', 'round')
            .attr('marker-start', function (d, i) { return 'url(#marker_' + d.name + ')' })
            .attr('marker-end', function (d, i) { return 'url(#marker_' + d.name + ')' })

    }

    onClick(d) {
        this.store.dispatch({ type: 'SELECT_NODE', payload: d.id });
    }

    renderForce(circles, links, labels, nodes, edges) {

        let d3 = this.d3;
        var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

        circles.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

        var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody().strength(-5000))
        .force("center", d3.forceCenter(width / 2, height / 2));
        
        simulation
        .nodes(nodes)
        .on("tick", ticked);
  
    simulation.force("link")
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

            labels.attr("transform", function(d) {
                    return "translate(" + (d.x + 10) + "," + (d.y + 10) + ")";
                });
        }


        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        //  }
    }

    // var dragTarget = d3.select(this);
    // dragTarget
    //   .attr('cx', function() {
    //     return e.dx + parseInt(dragTarget.attr('cx'))
    //   })
    //   .attr('cy', function() {
    //     return e.dy + parseInt(dragTarget.attr('cy'))
    //   })
    // return d3.drag()
    // .on("drag", function (d, i) {
    //     /*mutates state */
    //     d.x += d3.event.dx
    //     d.y += d3.event.dy
    //     d3.select(this).attr("cx", d.x).attr("cy", d.y);
    //     let links = svg.selectAll(".link");
    //     links.each(function (l, li) {
    //         if (l.sourceId == d.id) {
    //             d3.select(this).attr("x1", d.x).attr("y1", d.y);
    //         } else if (l.targetId == d.id) {
    //             d3.select(this).attr("x2", d.x).attr("y2", d.y);
    //         }
    //     });

    // });


    render() {
        // this.sigmaInstance.refresh();
    }

    // addListeners() {
    //     this.addEaListeners();
    //     this.addClickListeners();
    //     this.addDragListeners();
    //     // this.addKeyListeners();
    // }

    // addEaListeners() {
    //     // this.ea.subscribe('saveNode', this.refresh.bind(this));
    //     // this.ea.subscribe('graph.add', this.add.bind(this));
    //     // this.ea.subscribe('graph.force', this.toggleForceAtlas.bind(this));
    //     // this.ea.subscribe('graph.clear', this.clear.bind(this));
    //     // this.ea.subscribe('graph.step', this.graphStep.bind(this));
    //     // this.ea.subscribe('graph.setStart', this.setStart.bind(this));
    // }

    // addClickListeners() {

    //     this.sigmaInstance.bind("clickNode", (d) => {
    //         let n = d.data.node
    //         this.link(n);
    //     });

    //     this.sigmaInstance.bind("doubleClickNode", (d) => {
    //         let n = d.data.node
    //         let c = d.data.captor;
    //         this.nodeEdit(n, c);
    //     });

    //     this.sigmaInstance.bind("clickEdge", (d) => {
    //         let e = d.data.edge
    //         this.setActiveEdge(e);
    //     });
    // }

    // addDragListeners() {
    //     sigma.plugins.dragNodes(this.sigmaInstance, this.sigmaInstance.renderers[0])
    //         .bind('drop', (d) => {
    //             let n = d.data.node
    //             this.link(n);
    //         })
    // }

    // addKeyListeners() {
    //     let self = this;
    //     document.addEventListener("keydown", keyDownTextField, false);

    //     function keyDownTextField(e) {
    //         var keyCode = e.keyCode;
    //         console.log(keyCode)
    //         if (keyCode == 8) {
    //             if (self.sigmaInstance.graph.activeNode) {
    //                 self.removeNode(self.sigmaInstance.graph.activeNode);
    //             }
    //             if (self.sigmaInstance.graph.activeEdge) {
    //                 self.removeEdge(self.sigmaInstance.graph.activeEdge);
    //             }
    //         }
    //     }
    // }

    // /* graph modification */

    // nodeEdit(n, c) {
    //     this.ea.publish('show.node.editor', { n, x: c.clientX, y: c.clientY });
    // }

    // refresh() {
    //     this.sigmaInstance.refresh();
    // }

    // setStart() {
    //     //this.gs.setStart()
    // }

    // graphStep(time) {
    //     // this.gs.applySimulation(time);
    //     this.refresh();
    // }

    // clear() {
    //     this.sigmaInstance.graph.clear();
    //     this.sigmaInstance.refresh();
    // }

    // add() {
    //     // this.sigmaInstance.graph.addNode(this.gg.generateRandomNode())
    //     this.sigmaInstance.refresh();
    // }

    // removeNode(n) {
    //     this.sigmaInstance.graph.activeNode = null;
    //     this.sigmaInstance.graph.dropNode(n.id);
    //     this.sigmaInstance.refresh()
    // }

    // removeEdge(e) {
    //     this.sigmaInstance.graph.activeEdge = null;
    //     this.sigmaInstance.graph.dropEdge(e.id);
    //     this.sigmaInstance.refresh()
    // }

    // addEdge() {

    // }

    // setActiveEdge(e) {
    //     this.setActiveNodeToNull();
    //     console.log('this', this, this.sigmaInstance.graph)
    //     if (e === this.sigmaInstance.graph.activeEdge) {
    //         e.color = this.settings.defaultEdgeColor;
    //         this.sigmaInstance.graph.activeEdge = null;
    //     } else {
    //         this.sigmaInstance.graph.activeEdge = e;
    //         e.color = this.settings.activeEdgeColor;
    //     }

    //     this.sigmaInstance.refresh();
    // }

    // setActiveNode(n) {
    //     this.setActiveEdgeToNull();
    //     if (n === this.sigmaInstance.graph.activeNode) {
    //         n.color = this.settings.defaultNodeColor;
    //         this.sigmaInstance.graph.activeNode = null;
    //     } else {
    //         this.sigmaInstance.graph.activeNode = n;
    //         n.color = this.settings.activeNodeColor;
    //     }
    //     this.sigmaInstance.refresh();
    // }

    // link(node) {
    //     let fromNode = this.sigmaInstance.graph.activeNode;
    //     this.setActiveNode(node);
    //     let toNode = this.sigmaInstance.graph.activeNode;
    //     if (fromNode && toNode && (toNode !== fromNode)) {
    //         let newEdge = {
    //             id: 'e' + fromNode.id + toNode.id,
    //             source: fromNode.id,
    //             target: toNode.id,
    //             size: this.settings.defaultNodeSize,
    //             color: this.settings.activeEdgeColor,
    //             type: 'arrow'
    //         }
    //         this.sigmaInstance.graph.addEdge(newEdge);
    //         fromNode.color = this.settings.defaultNodeColor;
    //         toNode.color = this.settings.defaultNodeColor;
    //         this.setActiveNodeToNull();
    //     }

    //     this.sigmaInstance.refresh();
    // }

    // setActiveEdgeToNull() {
    //     if (this.sigmaInstance.graph.activeEdge) this.sigmaInstance.graph.activeEdge.color = this.settings.defaultEdgeColor;
    //     this.sigmaInstance.graph.activeEdge = null;
    // }

    // setActiveNodeToNull() {
    //     if (this.sigmaInstance.graph.activeNode) this.sigmaInstance.graph.activeNode.color = this.settings.defaultNodeColor;
    //     this.sigmaInstance.graph.activeNode = null;
    // }

    // toggleForceAtlas() {
    //     if (this.sigmaInstance.isForceAtlas2Running()) {
    //         this.sigmaInstance.stopForceAtlas2();
    //     } else this.sigmaInstance.startForceAtlas2({ worker: true, barnesHutOptimize: false });
    // }

    // log() {
    //     console.log('sigmaInstance graph', this.sigmaInstance.graph)
    //     console.log('nodes', this.sigmaInstance.graph.nodes())
    //     console.log('edges', this.sigmaInstance.graph.edges())
    // }

}