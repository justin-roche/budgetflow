import { inject } from 'aurelia-framework';
import { GraphService } from '../services/graphService';

@inject(GraphService)
export class GraphContainer {
    sigma;
    Sigma;

    constructor(private gs: GraphService) {

    }

    attached() {
        this.Sigma = window['sigma'];
        
        this.graph();
    }

    graph() {
        let g = this.gs.generateRandom(5);
       
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
                maxNodeSize: 16,
                minNodeSize: 45,
                minEdgeSize: 5,
                maxEdgeSize: 5,
                minArrowSize: 25,
                enableEdgeHovering: true,
            }
        });
        this.sigma.renderers.def = this.sigma.renderers.canvas
        
        this.addListeners();
        //this.sigma.refresh();

    }

    addListeners() {
        let dragListener = this.Sigma.plugins.dragNodes(this.sigma, this.sigma.renderers[0]);
        
        this.sigma.bind("clickNode", function () { 
            console.log(arguments[0].data.node);
        });

        this.sigma.bind("overNode", function () { 
            console.log(arguments[0].data.node);
        });

        // this.sigma.bind("clickEdge", function () { 
        //     console.log('clicked');
        // });

        // this.sigma.bind("clickEdges", function () { 
        //     console.log(arguments[0].data);
        // });

        this.sigma.bind("overEdge", function () { 
            console.log('over');
        });

        // this.sigma.bind("overEdges", function () { 
        //     console.log(arguments[0].data);
        // });
    }

    log() {
        console.log(this.sigma, this.sigma.graph.nodes().length)        
    }

    clear() {
        this.sigma.graph.clear();
        this.sigma.refresh();
    }

    add() {
        this.sigma.graph.addNode(this.gs.generateRandomNode())
        this.sigma.refresh();
    }

    addEdge() {

    }

}