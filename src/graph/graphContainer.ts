import { GraphService } from './graphService';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
declare var sigma;

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
        this.addMethods();
        this.graph();
    }

    addMethods() {
        sigma.classes.graph.addMethod('neighbors', function(nodeId) {
            var k,
                neighbors = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            for (k in index) {
                neighbors[k] = this.nodesIndex[k];
            }
            return neighbors;
        });

        sigma.classes.graph.addMethod('neighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.allNeighborsIndex[nodeId] || {};
        
            return index;
        });

        sigma.classes.graph.addMethod('outNeighboringEdges', function(nodeId) {
            var k,
                edges = {},
                index = this.outNeighborsIndex[nodeId] || {};
        
            return index;
        });
    }

    graph() {
        let g = this.gs.generateSimple();
        
        this.sigma = new sigma({
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
        this.ea.publish('show.node.editor', {n, x: c.clientX, y: c.clientY});
    }

    addListeners() {
        this.addClickListeners()
        this.addDragListeners();
        this.addKeyListeners();
        this.addEaListeners();

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
        let dragNodes = sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
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

    addEaListeners() {
        this.ea.subscribe('graph.create',this.graph.bind(this));
        this.ea.subscribe('graph.add',this.add.bind(this));
        this.ea.subscribe('graph.force',this.toggleForceAtlas.bind(this));
        this.ea.subscribe('graph.clear',this.clear.bind(this));
        this.ea.subscribe('graph.step', this.graphStep.bind(this));
    }

    refresh() {
        this.sigma.refresh();
    }

    graphStep(step) {
        this.gs.applyStep(step);
        this.refresh();
    }

    clear() {
        this.sigma.graph.clear();
        this.sigma.refresh();
    }

    add() {
        this.sigma.graph.addNode(this.gs.generateRandomNode())
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

    toggleForceAtlas() {
        if(this.sigma.isForceAtlas2Running()){
            this.sigma.stopForceAtlas2();
        }else this.sigma.startForceAtlas2({worker: true, barnesHutOptimize: false});
    }

    log() {
        console.log('sigma graph', this.sigma.graph)
        console.log('nodes', this.sigma.graph.nodes())
        console.log('edges', this.sigma.graph.edges())
    }

}