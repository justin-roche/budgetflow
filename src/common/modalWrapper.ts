import { Store } from './../services/reduxStore';
import { ComponentBase } from './componentBase';
import { inject, bindable } from 'aurelia-framework';
import { uiActions } from '../reducers/uiReducer';

import $ from 'jquery'
import * as Rx from 'rxjs'; 

@inject(Store)
export class ModalWrapper {
    @bindable selector;
    public show;
    public settings = null;
    private ref;

    constructor(private store: Store) {
        
    }

    attached() {
        console.log('settings', this.settings)
        this.store.select(this.selector, {bind: [this,'settings'], log: true}).subscribe(_ => {
            this.update();
        });
    }

    update() {

        if(this.settings.x || this.settings.y) {
            $(this.ref).css({
                'z-index': Math.random()*1000,
                left: this.settings.x + 'px',
                top: this.settings.y + 'px'
            });
        }        
    }

    close() {
        uiActions(this.store).closeModal(this.settings);
    }

}
