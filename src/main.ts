/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import { rootReducer } from './reducers/root';
import { createStore } from 'redux';
 
require('jquery-ui-dist/jquery-ui.js')
require('jquery-ui-dist/jquery-ui.css')
require('bootstrap'); // reference window.jQuery
require('nouislider/distribute/nouislider.css');
require('nouislider/distribute/nouislider.js');
require('wnumb/wNumb.js');
require('moment');

//require('aurelia-async')
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-binding-functions'));
  //aurelia.use.plugin(PLATFORM.moduleName('aurelia-async')); 
 

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
