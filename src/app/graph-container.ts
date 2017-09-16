import { GraphService } from './../services/graphService';
import { NodeEditor } from './nodeEditor';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator, GraphService)
export class GraphContainer {
    sigma;
    Sigma;
    dragging = false;
    nodeEditor;
    gs;
    ea;

    constructor(EventAggregator, GraphService) {
        this.gs = GraphService;
        this.ea = EventAggregator
        this.ea.subscribe('saveNode',(n)=>{
            this.refresh();
        });
    }

    attached() {
        this.Sigma = window['sigma'];
        this.graph();
    }

    nodeEdit(n, c) {
        this.nodeEditor.show(n, c.clientX, c.clientY);
    }

    graph() {
        let g = this.gs.generateRandom(5);
       
        this.Sigma.classes.graph.addMethod('neighbors', function(nodeId) {
            var k,
                neighbors = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            for (k in index) {
                neighbors[k] = this.nodesIndex[k];
            }
            return neighbors;
        });

        this.Sigma.classes.graph.addMethod('neighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            // for (k in index) {
            //     edges[k] = this.edgesIndex[k];
            // }
            return index;
        });

        this.Sigma.classes.graph.addMethod('outNeighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.outNeighborsIndex[nodeId] || {};
        
            // for (k in index) {
            //     edges[k] = this.edgesIndex[k];
            // }
            return index;
        });

        this.sigma = new this.Sigma({
            graph: g,
            //container: ,
            renderers: [
                {
                  container: document.getElementById('container'),
                  type: 'canvas' // sigma.renderers.canvas works as well
                }
              ],
            settings: {
                doubleClickZoomingRatio: 1,
                maxNodeSize: 16,
                minNodeSize: 45,
                minEdgeSize: 5,
                maxEdgeSize: 5,
                minArrowSize: 25,
                enableEdgeHovering: true,
            }
        });

        

        this.gs.graph = this.sigma.graph;
        this.addListeners();
        this.sigma.refresh();

    }

    addListeners() {
        let self = this;
    
        this.sigma.bind("clickNode", function () { 
            let n = arguments[0].data.node
            self.link(n);
        });

        this.sigma.bind("doubleClickNode", function () { 
            let n = arguments[0].data.node
            let c = arguments[0].data.captor;
            self.nodeEdit(n, c);
        });

        this.sigma.bind("doubleClickEdge", function () { 
            let e = arguments[0].data.edge
            console.log('clicked edge', e);
            self.setActiveEdge(e);
        });

        let dragNodes = this.Sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
               
        this.addDeleteListener();

        // this.sigma.bind("overEdge", function () { 
        //     //console.log('over');
        // });

         // dragNodes.bind('startdrag', () => {
        //     console.log('startdrag')
        //     self.dragging = true;
        // })

        // this.sigma.bind('dragend', () => {
        //     self.dragging = false;
        // })

        // this.sigma.bind("overNode", function () { 
        //     //console.log(arguments[0].data.node);
        // });

        // this.sigma.bind("overEdges", function () { 
        //     console.log(arguments[0].data);
        // });
    }

    addDeleteListener() {
        let self = this;
        document.addEventListener("keydown", keyDownTextField, false);
        
        function keyDownTextField(e) {
        var keyCode = e.keyCode;
        console.log(keyCode)
          if(keyCode==8) {
            if(self.sigma.graph.activeNode){
                self.removeNode(self.sigma.graph.activeNode);
            }
            if(self.sigma.graph.activeEdge){
                self.removeEdge(self.sigma.graph.activeEdge);
            }
          } 
        }
    }

    clear() {
        this.sigma.graph.clear();
        this.sigma.refresh();
    }

    add() {
        this.sigma.graph.addNode(this.generateRandomNode())
        this.sigma.refresh();
    }

    removeNode(n) {
        this.sigma.graph.activeNode = null;
        this.sigma.graph.dropNode(n.id);
        this.sigma.refresh()
    }

    removeEdge(e) {
        this.sigma.graph.activeEdge = null;
        this.sigma.graph.dropEdge(e.id);
        this.sigma.refresh()
    }

    addEdge() {

    }

    refresh() {
        this.sigma.refresh();
    }

    setActiveEdge(e) {
        this.setActiveNodeToNull();
        this.sigma.graph.activeEdge = e; 
        e.color = 'green';
        this.sigma.refresh();
    }

    setActiveEdgeToNull() {
        if(this.sigma.graph.activeEdge) this.sigma.graph.activeEdge.color = 'black';
        this.sigma.graph.activeEdge = null;
    }

    setActiveNodeToNull() {
        if(this.sigma.graph.activeNode) this.sigma.graph.activeNode.color = 'gray';
        this.sigma.graph.activeNode = null;
    }

    link(node) {
        
        if(!this.sigma.graph.activeNode) {
            this.sigma.graph.activeNode = node;
            this.setActiveEdgeToNull();
            node.color = 'green';
        } else if(this.sigma.graph.activeNode === node){
            this.sigma.graph.activeNode = null;
            node.color = 'gray';
        } else {
            this.sigma.graph.addEdge({
                id: 'e' + this.sigma.graph.activeNode.id + node.id,
                source: this.sigma.graph.activeNode.id,
                target: node.id,
                size: 50,
                color: 'green',
                type: 'arrow'
            });
            this.sigma.graph.activeNode.color = 'blue';
            this.sigma.graph.activeNode = null;
        }
        this.sigma.refresh();
    }

    generateRandomNode() {
        return {
            id: 'n' + this.sigma.graph.nodes().length,
            label: 'n'+this.sigma.graph.nodes().length,
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666'
        }
    }

    force() {
        this.sigma.startForceAtlas2({worker: true, barnesHutOptimize: false});
    }

    log() {
        console.log('sigma graph', this.sigma.graph)
        console.log('nodes', this.sigma.graph.nodes())
        console.log('edges', this.sigma.graph.edges())
        
    }

}