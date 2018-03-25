import { _ } from 'underscore';
import { Store } from './../services/reduxStore';
import { inject, bindable, observable } from 'aurelia-framework';
import { uiActions } from '../reducers/ui/uiReducer';
import { TemplateModel } from './models/template-model';
import { sm } from './models/state-model';
import { DataModel } from './models/data-model';

import * as Rx from 'rxjs'; 

@inject(Store)
export class ConditionEditor {

    public tm = new TemplateModel();
    public dm = new DataModel();

    constructor(s: Store) {
        s.mapStateToMethods(this, sm);
    }

    selectedConditionsUpdated(d) {
        this.dm.setData(d);
        this.tm.compute(this.dm);
    }
}