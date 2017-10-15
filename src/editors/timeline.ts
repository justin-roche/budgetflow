import { Store } from '../services/reduxStore';
import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

@inject(Store)
export class Timeline {

    constructor() {


    }

    attached() {
        

        // Append a suffix to dates.
        // Example: 23 => 23rd, 1 => 1st.
        

        // Create a string representation of the date.

        function timestamp(str) {
            return new Date(str).getTime();
        }

        var dateSlider: any = document.getElementById('date-slider');

        let min = timestamp('2016');
        let max = timestamp('2017');
        let range = max-min;
        let pip = max + range/2;
        noUiSlider.create(dateSlider, {
            // Create two timestamps to define a range.
            range: {
                min: timestamp('2016'),
                max: timestamp('2018')
            },
            pips: {
                mode: 'values',
                values: [timestamp('2017')],
                density: 4
            },

            // Steps of one week
            step: 7 * 24 * 60 * 60 * 1000,

            // Two more timestamps indicate the handle starting positions.
            start: [timestamp('2016')],

            // No decimals
            format: wNumb({
                decimals: 0
            })


        });

        var dateValues = [
            // document.getElementById('event-start'),
            document.getElementById('event-end')
        ];

        dateSlider.noUiSlider.on('update', function (values, handle) {
            console.log('new values', values)
            dateValues[handle].innerHTML = (new Date(+values[handle])).getTime();
        });

        // Create a list of day and monthnames.



    }


}