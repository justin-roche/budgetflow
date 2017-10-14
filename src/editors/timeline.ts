import { inject, bindable } from 'aurelia-framework';
import $ from 'jquery'
import { ModalSettings } from '../common/modalWrapper'
import * as Rx from 'rxjs';
import { Store } from '../services/reduxStore';

@inject(Store)
export class Timeline {

    attached() {
        
            $("#ex2").bootstrapSlider({
              tooltip: 'always'
            });
            
            $("#mainslider").addClass('main-slider');
        }
}