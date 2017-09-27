import { BehaviorSubject } from 'rxjs';
import * as Rx from 
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import { createSelector } from '../reducers/selectors';

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

        //var c10 = d3.scale.category10();
        svg
            .attr("width", 1200)
            .attr("height", 800);
    }

    refresh(data) {
        let d3 = this.d3;
        let svg = d3.select('svg');
        let links, nodes;

        
        
        let nodesArray = Object.keys(data.nodes).map(key => { return data.nodes[key] });        
        nodes = svg.selectAll(".node").data(nodesArray);

        /* nodes */
        nodes.exit().remove();

        let newGroups = nodes.enter().append("g")
        let newCircles = newGroups.append("circle")
        newCircles = this.renderCircle(newGroups);
        
        // newNodes.append("text")
        // .attr("dx", 12)
        // .attr("dy", ".35em")
        // .attr('color', 'black')
        // .text(function(d) { 
        //     console.log(d.id);
        //     return d.id });

        // let oldNodes = nodes.attr("class", "node")
        // this.renderNode(oldNodes);

        // /* edges */

        // let edgesArray = Object.keys(data.edges).map(key => { return data.edges[key] });        
        // links = svg.selectAll(".link").data(edgesArray || [])
        
        // links.exit().remove();

        // let newLinks = links.enter().append("line")
        // this.renderLinks(newLinks, data)

        // let oldLinks = links.attr("class", "link");
        // this.renderLinks(oldLinks, data)
    }

    renderCircle(selection) {
        let drag = this.onDrag();

        return selection
        .selectAll("circle")
        .attr("class", "node")
        .attr("cx", function (d) {
            return d.x
        })
        .attr("cy", function (d) {
            return d.y
        })
        .attr("r", 20)
        .attr("fill", function (d, i) {
            return 'blue';
        })
        .call(drag)
        
        
    }

    renderLinks(selection, data) {
        let d3 = this.d3;
        let drag = this.onDrag();

        return selection.attr("class", "link")
        .attr("x1", function (l) {
            var sourceNode = data.nodes[l.sourceId];
            d3.select(this).attr("y1", sourceNode.y);
            return sourceNode.x
        })
        .attr("x2", function (l) {
            var targetNode = data.nodes[l.targetId];
            d3.select(this).attr("y2", targetNode.y);
            return targetNode.x
        })
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr('id', function (d) {
            return d.id;
        })
        .call(drag);
    }

    onDrag() {
        let d3 = this.d3;
        let svg = this.d3.select('svg');
        
        return d3.drag()
        .on("drag", function (d, i) {
            /*mutates state */
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("cx", d.x).attr("cy", d.y);
            let links = svg.selectAll(".link");
            links.each(function (l, li) {
                if (l.sourceId == d.id) {
                    d3.select(this).attr("x1", d.x).attr("y1", d.y);
                } else if (l.targetId == d.id) {
                    d3.select(this).attr("x2", d.x).attr("y2", d.y);
                }
            });
        });
    }

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