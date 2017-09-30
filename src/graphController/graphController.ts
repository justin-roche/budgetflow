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

        /* nodes */
        let nodesArray = Object.keys(data.nodes).map(key => { return {...data.nodes[key], key: data.id+data.nodes[key].id }});
        let nodeGroups = svg.selectAll(".nodeGroup").data(nodesArray, function(d){
            return d.key;
        });
        nodeGroups.exit().remove();
        
        let newGroups = nodeGroups.enter().append("g").attr("class", "nodeGroup")
        newGroups.append("circle")
        newGroups.append("text")
        this.renderNodes(newGroups, data);
        newGroups .on('click', function(d){
            self.onClick(d)
        })
        newGroups.call(drag);       

         let oldNodes = nodeGroups.attr("class", "nodeGroup")
         this.renderNodes(oldNodes, data);

        /* edges */
        let edgesArray = Object.keys(data.edges).map(key => { return {...data.edges[key], key: data.id+data.edges[key].id }});
        links = svg.selectAll(".link").data(edgesArray || [])
        console.log('edges', links);

        links.exit().remove();

        let newLinks = links.enter().append("line")
        this.renderLinks(newLinks, data)

        let oldLinks = links.attr("class", "link");
        // this.renderLinks(oldLinks, data)
    }

    renderNodes(selection, data) {
        let d3 = this.d3;
        let drag = this.onDrag();

        selection.
            selectAll("text")
            .attr("x", function (d) {
                return d.x
            })
            .attr("y", function (d) {
                return d.y
            })
            .attr('fill', 'white')
            .text(function (d) {
                console.log(d.id);
                return d.id + ':' + data.nodesData[d.id].value;
            })

        return selection
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
            .attr("r", 20)
            .attr("fill", function (d, i) {
                return 'blue';
            })
            
        //.call(drag)

    }

    renderLinks(selection, data) {


        let d3 = this.d3;

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
            .attr("stroke-width", 1)
            .attr('id', function (d) {
                return d.id;
            })
            .attr('marker-end',"url(#arrow)")
            
          
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
           var   color = 'black',
                    margin = {top: 50, right: 20, bottom: 30, left: 40},
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
              .attr('id', function(d){ return 'marker_' + d.name})
              .attr('markerHeight', 5)
              .attr('markerWidth', 5)
              .attr('markerUnits', 'strokeWidth')
              .attr('orient', 'auto')
              .attr('refX', 0)
              .attr('refY', 0)
              .attr('viewBox', function(d){ return d.viewbox })
              .append('svg:path')
                .attr('d', function(d){ return d.path })
                .attr('fill', function(d,i) { return 'black'});
        
          var path = paths.selectAll('path')
            .data(data)
            .enter()
            .append('svg:path')
              .attr('d', function(d,i){ return 'M 0,' + (i * 100) + ' L ' + (width - margin.right) + ',' + (i * 100) + '' })
              .attr('stroke', function(d,i) { return 'black'})
              .attr('stroke-width', 5)
              .attr('stroke-linecap', 'round')
              .attr('marker-start', function(d,i){ return 'url(#marker_' + d.name + ')' })
              .attr('marker-end', function(d,i){ return 'url(#marker_' + d.name  + ')' })

          
    }

    onClick(d) {
        this.store.dispatch({type: 'SELECT_NODE', payload: d.id});
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