import { inject } from 'aurelia-framework';
import $ from 'jquery'
import {ModalSettings} from '../common/modalWrapper'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class NodeEditor {
    active;
    collapsed = false;
    $nodeId;
    nodeModel;
    data = {
        adjacentNodes: null,
        outNodes: [],
    }

    modalSettings = new Rx.BehaviorSubject<ModalSettings>( 
        {title: 'Node Edit',
        id: 'node-edit',
        x: 0,
        y: 0,
        show: false
      });

    constructor(private store: Store){
        this.$nodeId = this.store.select('ui.graphController.selectedNodeId');
        this.$nodeId.subscribe(d => {
            this.refresh(d);
        })
    }

    refresh(){
        console.log('new node');
    }

    show(e) {
        this.nodeModel = e.n; //JSON.parse(JSON.stringify(node));
        this.initializeData();
        this.emitChildSettings(this.modalSettings, {
            x: e.x,
            y: e.y,
            show: true
        })
    }

   

    log() {
        console.log('nodemodel', this.node);
    }

    save() {
        
    }

}

export class KeysValueConverter {
    toView(obj) {
        return Reflect.ownKeys(obj);
    }
}