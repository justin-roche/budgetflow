/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';

//require('jquery/dist/jquery.js');
require('jquery')


// window['jQuery'] = window['$'];
//require('sigma/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js');
 require('jquery-ui/ui/widgets/draggable.js');
 require('bootstrap'); // reference window.jQuery
 require('jquery-ui/plugin.js');
 require('jquery-ui/ui/effect.js');

//import 'jquery-ui';


// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
