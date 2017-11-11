import { TimeSlider } from './timeSlider';
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
    sliderSettings;

    constructor(private store: Store, private sim: SimulationService) {
        this.store.actions.ui.updateSliderSettings();
        
        this.store.select('simulation', {bind: [this, '_simulation'] }).subscribe(_ => {
            this._simulation.on? $('.noUi-handle').addClass('active-simulation-handle') : $('.noUi-handle').removeClass('active-simulation-handle');            
        });
        
    }

    updateDisplay() {
        
    }

    attached() {
        this.store.select('ui.timeSlider.sliderSettings.beginRangeTime', {log: true, bind: [this, 'sliderSettings']}).subscribe(settings => {
            this.createSlider(this.store.getPresentState().ui.timeSlider.sliderSettings);
        });
        this.store.select('simulation.currentTime', {log: true}).subscribe(t => {
            this.ref.noUiSlider.set(t);
        })        
    }

    createSlider(settings) {
         this.ref = document.getElementById('date-slider');
         noUiSlider.create(this.ref, settings);
         this.formatPips();
         this.addListeners();

         $('.noUi-handle').dblclick(()=>{
            this.store.dispatch({ type: 'SIMULATION_ON_TOGGLE'})
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
        this.ref.noUiSlider.on('slide', function (values, handle) {
            this.displayedSelectedDate = this.formatFromMsString(values[0]);
            let t = Number(values[0]);
            console.log('user update', t)
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