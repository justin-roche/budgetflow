import { bindable } from 'aurelia-framework';
import * as Rx from 'rxjs';


export class ComponentBase {

    @bindable settings;
    protected _settings;

    bindViewSettings() {
        this.settings.subscribe(v => {
            this._settings = v;
        })
    }

}