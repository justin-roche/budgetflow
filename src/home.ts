import { Simulator } from './simulator/simulator';
import { SigmaDecorator } from './services/sigmaDecorator';
import { GraphService } from './services/graphService';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(GraphService, Simulator)
export class Home {

    constructor(private gs: GraphService, private sim: Simulator) {
       
    }


    
    
}