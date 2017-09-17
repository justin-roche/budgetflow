/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import '../static/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';

//  require('jquery')
  require('jquery-ui/ui/widgets/draggable.js');
//  require('jquery-ui/ui/widgets/droppable.js')
//  require('bootstrap'); // reference window.jQuery
 require('sigma')
 require('sigma/plugins/sigma.plugins.dragNodes/sigma.plugins.dragNodes.js');
 
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
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-dialog'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
