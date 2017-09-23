import { ComponentBase } from './componentBase';
import { ModalSettings } from './modalWrapper';
import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import * as Rx from 'rxjs';

export interface ModalSettings {
    title: string;
    id: string;
    x: number;
    y: number;
    show: boolean;
}

export class ModalWrapper extends ComponentBase {
    @bindable $settings: Rx.BehaviorSubject<ModalSettings>;
    modalRef;

    constructor() {
        super();
    }

    attached() {
        this.bindViewSettings();
        this.createModal();
    }

    createModal() {
        // $(this.modalRef)
        //     .resizable({
        //         handles: "s, e"
        //     })
           
    }

    afterSettingsChanged(v) {

        if(v.x || v.y) {
            $(this.modalRef).css({
                'z-index': Math.random()*1000,
                left: this.settings.x + 'px',
                top: this.settings.y + 'px'
            });
        }
        if(v.show) {

        }
        
    }

    close() {
        this.emitSettings({show: false});
    }

    save() {

    }

}
