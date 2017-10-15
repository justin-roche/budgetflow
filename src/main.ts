﻿/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import { rootReducer } from './reducers/root';
import { createStore } from 'redux';

//  require('jquery-ui/ui/widgets/draggable.js');
//  require('jquery-ui/ui/widgets/resizable.js');
//  require('jquery-ui/ui/widgets/droppable.js')
require('jquery-ui-dist/jquery-ui.js')
require('jquery-ui-dist/jquery-ui.css')
require('bootstrap'); // reference window.jQuery
// require('bootstrap-slider/dist/css/bootstrap-slider.css');
require('nouislider/distribute/nouislider.css');
require('nouislider/distribute/nouislider.js');
require('wnumb/wNumb.js');

// require('bootstrap-slider')
require('aurelia-async')
//require('d3');

//  (<any>require).context(
//   "sigma/plugins", // context folder
//   true, // include subdirectories
//   /.*/ // RegExp
// );
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });
//console.log('platform locates:', PLATFORM.moduleName('aurelia-async/dist/aurelia-async.js'))
export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-binding-functions'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-async')); 
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-redux-plugin'));
  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
