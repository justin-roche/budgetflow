import { GraphService } from './services/graphService';
import { NodeEditor } from './nodeEditor';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
require('sigma/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js')
declare var Sigma;

@inject(EventAggregator, GraphService)
export class GraphContainer {
    sigma;
    dragging = false;
    nodeEditor;
    gs;
    ea;

    public displaySettings = {
        defaultEdgeColor: 'black',
        defaultNodeColor: 'gray',
        activeNodeColor: 'green',
        activeEdgeColor: 'green',
        defaultNodeSize: 50,
    }

    public sigmaSettings = {
        doubleClickZoomingRatio: 1,
        maxNodeSize: 16,
        minNodeSize: 45,
        minEdgeSize: 5,
        maxEdgeSize: 5,
        minArrowSize: 25,
        enableEdgeHovering: true,
    };

    constructor(EventAggregator, GraphService) {
        this.gs = GraphService;
        this.ea = EventAggregator
        this.ea.subscribe('saveNode',(n)=>{
            this.refresh();
        });
    }

    attached() {
        console.log('sigma', Sigma);
        console.log('sigma classes', Sigma.classes)
        console.log('sigma plugins', Sigma.plugins)
        // console.log('jquery', $);
        this.addMethods();
         this.graph();
    }

    addMethods() {
        Sigma.classes.graph.addMethod('neighbors', function(nodeId) {
            var k,
                neighbors = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            for (k in index) {
                neighbors[k] = this.nodesIndex[k];
            }
            return neighbors;
        });

        Sigma.classes.graph.addMethod('neighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            return index;
        });

        Sigma.classes.graph.addMethod('outNeighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.outNeighborsIndex[nodeId] || {};
        
            return index;
        });
    }

    graph() {
        let g = this.gs.generateRandom(5);
        
        this.sigma = new Sigma({
            graph: g,
            renderers: [
                {
                  container: document.getElementById('container'),
                  type: 'canvas' // sigma.renderers.canvas works as well
                }
              ],
            settings: this.sigmaSettings
        });

        this.gs.graph = this.sigma.graph;
        g.activeNode = null;
        g.activeEdge = null;
        this.addListeners();
        this.sigma.refresh();
    }

    nodeEdit(n, c) {
        this.nodeEditor.show(n, c.clientX, c.clientY);
    }

    addListeners() {
        this.addClickListeners()
        this.addDragListeners();
        this.addKeyListeners();

        // this.sigma.bind("overEdge", function () { 
        //     //console.log('over');
        // });

         // dragNodes.bind('startdrag', () => {
        //     console.log('startdrag')
        //     self.dragging = true;
        // })

        // this.sigma.bind("overNode", function () { 
        //     //console.log(arguments[0].data.node);
        // });

        // this.sigma.bind("overEdges", function () { 
        //     console.log(arguments[0].data);
        // });
    }

    addClickListeners() {

        this.sigma.bind("clickNode", (d) => { 
            let n = d.data.node
            this.link(n);
        });

        this.sigma.bind("doubleClickNode", (d) => { 
            let n = d.data.node
            let c = d.data.captor;
            this.nodeEdit(n, c);
        });

        this.sigma.bind("clickEdge", (d) => { 
            let e = d.data.edge
            this.setActiveEdge(e);
        });
    }

    addDragListeners() {
        // console.log('drag listeners', Sigma.plugins.dragNodes);
        let dragNodes = Sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
        dragNodes.bind('drop', (d) => {
            console.log('end of drag', d)
            let n = d.data.node
            this.link(n);
        })
    }

    addKeyListeners() {
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

    refresh() {
        this.sigma.refresh();
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

    setActiveEdge(e) {
        this.setActiveNodeToNull();
        console.log('this', this, this.sigma.graph)
        if(e === this.sigma.graph.activeEdge) {
            e.color = this.displaySettings.defaultEdgeColor;
            this.sigma.graph.activeEdge = null;
        } else {
            this.sigma.graph.activeEdge = e;
            e.color = this.displaySettings.activeEdgeColor;
        }
        
        this.sigma.refresh();
    }

    setActiveNode(n) {
        this.setActiveEdgeToNull();
        if(n === this.sigma.graph.activeNode) {
            n.color = this.displaySettings.defaultNodeColor;
            this.sigma.graph.activeNode = null;
        } else {
            this.sigma.graph.activeNode = n;
            n.color = this.displaySettings.activeNodeColor;
        }
        this.sigma.refresh();
    }

    link(node) {
        let fromNode = this.sigma.graph.activeNode; 
        this.setActiveNode(node);
        let toNode = this.sigma.graph.activeNode;
        if (fromNode && toNode && (toNode !== fromNode)){
            let newEdge = {
                id: 'e' + fromNode.id + toNode.id,
                source: fromNode.id,
                target: toNode.id,
                size: this.displaySettings.defaultNodeSize,
                color: this.displaySettings.activeEdgeColor,
                type: 'arrow'
            }
            this.sigma.graph.addEdge(newEdge);
            fromNode.color = this.displaySettings.defaultNodeColor;
            toNode.color = this.displaySettings.defaultNodeColor;
            this.setActiveNodeToNull();
        }
        
        this.sigma.refresh();
    }

    setActiveEdgeToNull() {
        if(this.sigma.graph.activeEdge) this.sigma.graph.activeEdge.color = this.displaySettings.defaultEdgeColor;
        this.sigma.graph.activeEdge = null;
    }

    setActiveNodeToNull() {
        if(this.sigma.graph.activeNode) this.sigma.graph.activeNode.color = this.displaySettings.defaultNodeColor;
        this.sigma.graph.activeNode = null;
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