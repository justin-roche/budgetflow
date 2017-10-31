import { Store } from './../services/reduxStore';
import { ModalSettings } from './../common/modalWrapper';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import $ from 'jquery';
import * as moment from 'moment';

@inject(Store)
export class Timeline {

    data = {selectedDate: '?'};

    constructor(private store: Store) {

    }

    attached() {

        // Append a suffix to dates.
        // Example: 23 => 23rd, 1 => 1st.


        // Create a string representation of the date.

        function timestamp(str) {
            return new Date(str).getTime();
        }

        var dateSlider: any = document.getElementById('date-slider');

        let weekMs = 7 * 24 * 60 * 60 * 1000;
        let min = timestamp('2016');
        let max = timestamp('2017');
        let range = max - min;
        let pip = max + range / 2;
        noUiSlider.create(dateSlider, {

            // the handle starting positions.
            start: [timestamp('2016')],

            range: {
                min: timestamp('2016'),
                max: timestamp('2018')
            },

            pips: {
                
                //values: [timestamp('2017')],
                mode: 'positions',
                values: [0,10,20,30,40,50,60,70,80,90,100],
                density: 4
            },

            // Steps of one week
            step: weekMs,

            // No decimals
            // format: wNumb({
            //     decimals: 0
            // })
            format: {
                to: function ( value ) {
                  return value // + ',-';
                },
                from: function ( value ) {
                  return value //.replace(',-', '');
                }
              }

            

        });

        this.formatPips();

        var dateValues = [
            // document.getElementById('event-start'),
            document.getElementById('event-end')
        ];

        dateSlider.noUiSlider.on('update', function (values, handle) {            
            this.data.selectedDate = this.formatFromMsString(values[0]);
            this.store.dispatch({type: 'SIMULATION_NEXT_TIME_SET', payload: Number(values[0])});
        }.bind(this));

    }

    formatFromMsString(s: String) {
        let d = new Date(Number(s));
        return moment(d).format('MM/DD/YYYY');
    }

    formatPips() {
        let self = this;
        $('.noUi-value').each(function(elem) {
            console.log($(this).html())
           let d = self.formatFromMsString($(this).html());
           $(this).html(d)
        })
    }

    toggleConditionalTable() {
        this.store.dispatch({ type: 'UI_CONDITIONAL_TABLE_TOGGLE' });
    }


}