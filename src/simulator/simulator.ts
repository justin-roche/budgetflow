import { BehaviorSubject } from 'rxjs';
import { GraphService } from './../services/graphService';
import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../services/reduxStore';
import {createSelector} from '../reducers/selectors';
import { _ } from 'underscore';

@inject(Store, GraphService)
export class Simulator {
    t = new BehaviorSubject(null);
    //@select(createSelector('ui.simulation.time', t), {subscribe: true})
    $time;


    dragging = false;
    containerRef;

    sigmaInstance;

    sigmaSettings;
    settings;

    graph;
    simulation;

    g;

    constructor(private store: Store<any>) {
        // // select('ui.simulation.time', { subscribe: true })(this, 'simulationTime');   
       // this.$time = this.store.select('ui.simulation.time');   
        // this.$time.subscribe(d => {
        //     console.log('received from time', d);
        // })
        this.$step = this.store.select('simulation.step');   
        this.$step.subscribe(d => {
           // this.store.dispatch({type: 'BREADTH_TRAVERSE'})
            this.store.dispatch({type: 'UPDATE_DISPLAY_FUNCTIONS'})
            //let g = this.store.getState().graph;

            

            //console.log(recurse([g.nodesData['n1']]));
        })
       // this.test();
    }

    timeChanged(current, last) {
       // this.store.dispatch({type: 'BREADTH_TRAVERSE', payload: {}})
    }

    test() {
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

       
        setInterval(function(){
            let data = getData(5,5, 50+c);
            c++;
            console.log('dispatching')
            //this.store.dispatch({type: 'GRAPH_SET', payload: data});
            this.store.dispatch({type: 'NODES_SET', payload: data.nodes});
        }.bind(this), 100)

         // this.onSimulate.skip(1).subscribe((x)=>{
        //     console.log('on simulate')
        //     let data = getData(10,10, c);
        //     c= c++;
        //     this.newGraph.next(data);
        //     // this.store.dispatch({type: 'GRAPH_SET', payload: data});
        // })
    }

    initialize() { // initialize description-dependent derived properties
        this.sigmaInstance.graph.iterationTraverse((node) => {
            this.runDisplayUpdateFunction(node);
            return true;
        });
        // console.log('sim export: initial')
    }

    simulationTimeChanged(current, last) {
        if (current && current !== last) {
            console.log('sim time changed', current, last)
            this.applySimulation(current);
        }
    }

    applySimulation(time) {
        let numberOfCycles = this.convertTimeToCycles(time);
        for (let c = 0; c < numberOfCycles; c++) {
            this.sigmaInstance.graph.breadthTraverse(this.simulateNode.bind(this)); //;
        }
        this.graph.data.currentStep = numberOfCycles;
        // console.log('sim export: simulated')
    }

    // setStart() {
    //     console.log(this.graph.nodes());
    // }

    convertTimeToCycles(time) {
        return time;
    }

    simulateNode(source, target) {
        this.runLinkFunction(source, target);
        this.runStepFunction(target);
        this.runDisplayUpdateFunction(target);
        if (target.data.active) {
            return true;
        }
    }

    runLinkFunction(source, target) {
        // let edge = this.sigmaInstance.graph.getEdgeById('e' + source.id + target.id);
        // this.sf.linkFunctions[edge.data.linkFunction](source, target, 1);
    }

    runStepFunction(target) {
        target.data.stepFunctions.forEach(fnObj => {
            this.sf.stepFunctions[fnObj.name](target, fnObj.argument);
        });
    }

    runDisplayUpdateFunction(target) {
        target.data.displayFunctions.forEach(fnName => {
            this.sf.displayFunctions[fnName](target);
        });

        this.graph.data.displayFunctions.nodes.forEach(fnName => {
            this.sf.displayFunctions[fnName](target);
        });
    }

    // resetNodeValues() {
    //     this.graph.nodes()[0].data.value = 0;
    // }

    // getAdjacentNodes(n) {


    // }
}