import { GraphService } from './services/graphService';
import { Simulator } from './simulator/simulator';
import { inject } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';
import { Store, select } from 'aurelia-redux-plugin';
import {simple } from '../test/mock-data/graphs';

@inject(Store, Simulator)
export class Home {

    constructor(private sim: Simulator, private gs: GraphService) {

    }

    attached() {

        
    }

    
    
}