import { bindable } from 'aurelia-framework';
import * as Rx from 'rxjs';

export class ComponentBase {

    @bindable $settings;
    protected settings;

    bindViewSettings() {
        this.$settings.subscribe(v => {
            if(!v._changed) {
                this.zipChanges({}, v);
            }
            this.settings = v;
            this.afterSettingsChanged(this.settings._changed || {});
        })
    }

    afterSettingsChanged(changed) {

    }

    emitSettings(obj) {
        this.zipChanges(this.$settings.value, obj);
        this.$settings.next(Object.assign(this.$settings.value, obj));
    }

    emitChildSettings(obs, obj) {
        this.zipChanges(obs.value, obj)
        obs.next(Object.assign(obs.value, obj));
    }

    zipChanges(prev, newObj) {
        delete newObj._changed;
        let changed = {};
        for (let prop in newObj) {
            changed[prop] = {previous: prev[prop], new: newObj[prop]};
        }
        newObj._changed = changed;
    }

}