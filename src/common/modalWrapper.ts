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
    @bindable settings: Rx.BehaviorSubject<ModalSettings>;
    modalRef;

    constructor() {
        super();
    }

    attached() {
        this.bindViewSettings();
        this.createModal();
    }

    createModal() {

        $(this.modalRef)
            .draggable({
                handle: '.modal-header'
            })
            .resizable({
                handles: "s, e"
            })
            .css({
                'z-index': 3000,
                left: this._settings.x + 'px',
                top: this._settings.y + 'px'
            });

    }

    close() {

    }

    save() {

    }

}
