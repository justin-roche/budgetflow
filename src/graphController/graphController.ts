import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store, select } from 'aurelia-redux-plugin';

@inject(EventAggregator, Store)
export class GraphController {
    sigma = window['sigma'];

    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;
    graph;
    graphName;
    g;

    constructor(private ea: EventAggregator, private store: Store<any>) {
        select('graph', { subscribe: true })(this, 'graph');
        // select('graph',{ subscribe: true })(this, 'graph');
        select('graph.data.currentStep', { subscribe: true })(this, 'currentStep');

        this.sigmaInstance = new this.sigma();
    }

    attached() {
        this.sigmaInstance.addRenderer({
            container: this.containerRef,
            type: 'canvas',
            settings: this.sigmaSettings
        });
    }

    currentStepChanged(newValue, oldValue) {
        if (newValue !== null) {
            console.log('rendering step')
            // this.import();
            // this.render();
        }
    }

    graphChanged(newValue, oldValue) {
        if (!oldValue || newValue.data.name !== oldValue.data.name) {
            console.log('rendering new graph')
            this.import();
            this.render();
        }

    }

    import() {
        this.sigmaInstance.graph.clear();
        this.sigmaInstance.graph.addNode({id: 'x'});
        // if (this.graph.nodes) {
        //     this.graph.nodes.forEach(node => {
        //         this.sigmaInstance.graph.addNode(Object.assign({}, node));
        //     });
        //     this.graph.edges.forEach(edge => {
        //         this.sigmaInstance.graph.addEdge(Object.assign({}, edge));
        //     })
        // }
    }

    // settingsChanged(newValue, oldValue) {

    // }

    render() {
        this.sigmaInstance.refresh();
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