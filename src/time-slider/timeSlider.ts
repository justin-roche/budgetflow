import { Store } from './../services/reduxStore';
import *  as Rx from 'rxjs';
import { inject } from 'aurelia-framework';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import $ from 'jquery';
import * as moment from 'moment';
import { sm } from './state-model';

@inject(Store)
export class TimeSlider {
    _simulation: Simulation;
    ref;
    displayedSelectedDate;
    sliderSettings;

    constructor(private store: Store) {
        
    }

    updateDisplay() {

    }

    attached() {
        this.store.mapStateToMethods(this, sm)
    }

    sliderUpdated({state, timeSlider}) {
        this.ref = document.getElementById('date-slider');
        if(!this.ref.noUiSlider) {
            noUiSlider.create(this.ref, timeSlider);
            this.formatPips();
            this.addListeners();
        }
    }

    simulationUpdated({state, simulation}) {
        simulation.on ? $('.noUi-handle')
        .addClass('active-simulation-handle') : $('.noUi-handle').removeClass('active-simulation-handle');
    }

    currentTimeUpdated({state, currentTime}) {
        this.ref.noUiSlider.set(currentTime);
    }

    rangeUpdated({state, range, timeSlider}) {
        this.ref.noUiSlider.updateOptions(timeSlider);
        this.formatPips();
    }

    formatPips() {
        let self = this;
        $('.noUi-value').each(function (elem) {
            let d = self.formatFromMsString($(this).html());
            $(this).html(d)
        })
    }

    lowerMin() {
        let {min, max} = this.store.getPresentState().ui.timeSlider.range;
        this.store.actions.ui.updateSliderRange({min: min - 1000000000});
    }

    increaseMin() {
        let {min, max} = this.store.getPresentState().ui.timeSlider.range;
        this.store.actions.ui.updateSliderRange({min: min + 1000000000});
    }

    lowerMax() {
        let {min, max} = this.store.getPresentState().ui.timeSlider.range;
        this.store.actions.ui.updateSliderRange({max: max - 1000000000});
    }

    increaseMax() {
        let {min, max} = this.store.getPresentState().ui.timeSlider.range;
        this.store.actions.ui.updateSliderRange({max: max + 1000000000});
    }

    addListeners() {
        $('.noUi-handle').dblclick(() => {
            this.store.dispatch({ type: 'SIMULATION_ON_TOGGLE' })
        });

        this.ref.noUiSlider.on('slide', function (values, handle) {
            this.displayedSelectedDate = this.formatFromMsString(values[0]);
            let t = Number(values[0]);
            this.store.actions.simulation.setTargetTime(t)
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