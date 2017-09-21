import { inject } from 'aurelia-framework';
import { GraphService } from './graph/graphService';
import $ from 'jquery'
import * as Rx from 'rxjs';

@inject(GraphService)
export class Home {

    constructor(private gs: GraphService) {
        
    }
    attached() {
        // $('#resizeable').resizable({
        //     handles: "n, e, s, w"
        // })
        // let o = Rx.Observable.of(true);
        // console.log(o);
    }
    
}