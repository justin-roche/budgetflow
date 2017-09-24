import { BehaviorSubject } from 'rxjs';
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store, select } from 'aurelia-redux-plugin';

@inject(EventAggregator, Store, GraphService)
export class GraphController {
    sigma = window['sigma'];
    d3 = window['d3'];

    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;
    graph;
    graphName;
    g;
    newGraph: BehaviorSubject<any> = new BehaviorSubject(null);
    onSimulate: BehaviorSubject<any> = new BehaviorSubject(null);
    

    constructor(private ea: EventAggregator, private store: Store<any>, private gs: GraphService) {
        
        let previousValue;
        this.store.subscribe(() => {
            let currentValue = this.store.getState().graph;
            if(currentValue === previousValue) {
                console.log('same graph');
            } else {
                //console.log('different graph');
                this.newGraph.next(currentValue);
            }
        });
        this.simulate();
    }

    simulate() {
        function getData(rows, columns, offset) {
            let nodes = {};
            let edges = [];

            for (let i = 0; i < rows; i++) {
                for (let ii = 0; ii < columns; ii++) {
                   nodes[`n${i}_${ii}`]= {x: offset+ (i * 50), y: offset+(ii * 50) };
                    if (i > 0 && ii>0) {
                        edges.push({ sourceId: `n${i}_${ii}`, targetId: `n${i-1}_${ii-1}` });
                    }
                }

            }
            return { nodes, edges };
            //  console.log(myNodes, edges);

        }
        let c = 50;

        // this.onSimulate.skip(1).subscribe((x)=>{
        //     console.log('on simulate')
        //     let data = getData(10,10, c);
        //     c= c++;
        //     this.newGraph.next(data);
        //     // this.store.dispatch({type: 'GRAPH_SET', payload: data});
        // })
        setInterval(function(){
            let data = getData(5,5, 50+c);
            c++;
            this.store.dispatch({type: 'GRAPH_SET', payload: data});
        }.bind(this), 100)
    }

    attached() {

        let d3 = this.d3;
        let svg = d3.select('svg');

       
         
          //var c10 = d3.scale.category10();
          svg
            .attr("width", 1200)
            .attr("height", 800);
         
          var drag = d3.drag()
            .on("drag", function(d, i) {
              d.x += d3.event.dx
              d.y += d3.event.dy
              d3.select(this).attr("cx", d.x).attr("cy", d.y);
            //   links.each(function(l, li) {
            //     if (l.source == i) {
            //       d3.select(this).attr("x1", d.x).attr("y1", d.y);
            //     } else if (l.target == i) {
            //       d3.select(this).attr("x2", d.x).attr("y2", d.y);
            //     }
            //   });
            });
         
         
        let nodesArray = [];
        
        function setNodes(data) {

           

            nodesArray = Object.keys(data.nodes).map(key => {return data.nodes[key]});
            // console.warn('update data', nodesArray)
            var nodes = svg.selectAll(".node")
            .data(nodesArray);

            // console.log('entered', nodes.enter())
            // console.log('exited', nodes.exit())
            // console.log('join', nodes);

            nodes.exit().remove();

            nodes.enter()
            .append("circle")
            .attr("class", "node")
            .attr("cx", function(d) {
                console.log('new x', d.x)
              return d.x
            })
            .attr("cy", function(d) {
              return d.y
            })
            .attr("r", 20)
            .attr("fill", function(d, i) {
              //return c10(i);
            })
            .call(drag);

            //update
            nodes.attr("class", "node")
            .attr("cx", function(d) {
                //console.log('new x in update', d.x)
              return d.x
            })
            .attr("cy", function(d) {
              return d.y
            })
            .attr("r", 20)
            .attr("fill", function(d, i) {
              //return c10(i);
            })
            .call(drag);
            
            

            var links = svg.selectAll(".link")
            .data(data.edges)

            links.attr("class", "link")
            .attr("x1", function(l) {
              var sourceNode = data.nodes[l.sourceId];
              d3.select(this).attr("y1", sourceNode.y);
              return sourceNode.x
            })
            .attr("x2", function(l) {
              var targetNode = data.nodes[l.targetId];  
              d3.select(this).attr("y2", targetNode.y);
              return targetNode.x
            })
            .attr("fill", "none")
            .attr("stroke", "white");
            
            links.enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", function(l) {
              var sourceNode = data.nodes[l.sourceId];
              d3.select(this).attr("y1", sourceNode.y);
              return sourceNode.x
            })
            .attr("x2", function(l) {
              var targetNode = data.nodes[l.targetId];  
              d3.select(this).attr("y2", targetNode.y);
              return targetNode.x
            })
            .attr("fill", "none")
            .attr("stroke", "white");
           
            // .attr("cx", function(d) {
            //   return d.x
            // })
            // .attr("cy", function(d) {
            //   return d.y
            // })
            // .attr("r", 20)
            // .attr("fill", function(d, i) {
            //   //return c10(i);
            // })
            // .call(drag);

           
            
        }
        
       
        this.newGraph.skip(1).subscribe(g => {
            if(g) setNodes(g);
        })





        // d3.interval(function () {
        //    
        //     
        //     
        // }, 5000, d3.now() + 1000);
  
 

                //setNodes();
                // setNodes();

                //  function setNodes() {
                //     var nodes = svg.selectAll("node")
                //     .data(data.nodes);

                //     nodes.enter()
                //     .append("circle")
                //     .attr("class", "node")
                //     .attr("cx", function(d) {
                //       return d.x
                //     })
                //     .attr("cy", function(d) {
                //       return d.y
                //     })
                //     .attr("r", 15)
                //     .attr("fill", function(d, i) {
                //       //return c10(i);
                //     })
                //     .call(drag);

                //     nodes.exit().remove();
                //   }




        //   var links = svg.selectAll("link")
        //     .data(data.links)
        //     .enter()
        //     .append("line")
        //     .attr("class", "link")
        //     .attr("x1", function(l) {
        //       var sourceNode = data.nodes.filter(function(d, i) {
        //         return i == l.source
        //       })[0];
        //       d3.select(this).attr("y1", sourceNode.y);
        //       return sourceNode.x
        //     })
        //     .attr("x2", function(l) {
        //       var targetNode = data.nodes.filter(function(d, i) {
        //         return i == l.target
        //       })[0];
        //       d3.select(this).attr("y2", targetNode.y);
        //       return targetNode.x
        //     })
        //     .attr("fill", "none")
        //     .attr("stroke", "white");

    }

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