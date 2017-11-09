import { SimulationService } from './../services/simulationService';
import { Store } from './../services/reduxStore';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import $ from 'jquery';
import * as moment from 'moment';

@inject(Store, SimulationService)
export class TimeSlider {
    _simulation: Simulation;
    ref;
    displayedSelectedDate;

    constructor(private store: Store, private sim: SimulationService) {
        store.select('simulation', { log: true, bind: [this, '_simulation'] }).subscribe(_ => {
            this.updateDisplay();
        });
    }

    updateDisplay() {
        this._simulation.on? $('.noUi-handle').addClass('active-simulation-handle') : $('.noUi-handle').removeClass('active-simulation-handle');
    }

    attached() {
        let pipSize = 7 * 24 * 60 * 60 * 1000;
        let min = this._simulation.beginRangeTime;
        let max = this._simulation.endRangeTime;

        this.createSlider(min, max, pipSize);
        this.formatPips();
        this.addListeners();

    }

    createSlider(min, max, pipSize) {
        this.ref = document.getElementById('date-slider');
        noUiSlider.create(this.ref, {
            start: [this._simulation.beginRangeTime],

            range: {
                min: min,
                max: max
            },

            pips: {
                mode: 'positions',
                values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                density: 4
            },

            step: pipSize,
        });
    }

    formatPips() {
        let self = this;
        $('.noUi-value').each(function (elem) {
            let d = self.formatFromMsString($(this).html());
            $(this).html(d)
        })
    }

    addListeners() {
        $('.noUi-handle').dblclick(()=>{
            this.store.dispatch({ type: 'SIMULATION_ON_TOGGLE'})
        });

        this.ref.noUiSlider.on('update', function (values, handle) {
            this.displayedSelectedDate = this.formatFromMsString(values[0]);
            let nextTime = Number(values[0]);
            this.sim.setNextTime(nextTime);
        }.bind(this));
    }

    formatFromMsString(s: String) {
        let d = new Date(Number(s));
        return moment(d).format('MM/DD/YYYY');
    }

    timestamp(str) {
        return new Date(str).getTime();
    }

}