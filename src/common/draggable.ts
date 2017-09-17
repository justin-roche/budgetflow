import { inject, bindable, bindingMode } from 'aurelia-framework';
import * as interact from "interact.js";

@inject(Element)
export class InteractDraggableCustomAttribute {
  
  // we make options bindable, so that the interact draggable options can be customized declaratively
  @bindable({ defaultBindingMode: bindingMode.oneTime }) options;
  
  element;
  constructor(element) {
    this.element = element;
  }
  
  attached() {
      console.log('draggable attached')
    interact(this.element)

      // we can set default options if we want, overriding any options that were passed in
      .draggable(Object.assign({}, this.options || {}))

      // for each event, we dispatch an bubbling, HTML5 CustomEvent, which the aurelia
      // binding engine will be able to listen for
      .on('dragstart', (event) => this.dispatch('interact-dragstart', event))
      .on('dragmove', (event) => this.dispatch('interact-dragmove', event))
      .on('draginertiastart', (event) => this.dispatch('interact-draginertiastart', event))
      .on('dragend', (event) => this.dispatch('interact-dragend', event));
  }
  
  dispatch(name, data) {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data
      })
    );
  }
}