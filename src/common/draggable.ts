import { inject } from 'aurelia-framework';
import $ from 'jquery';

@inject(Element)
export class DraggableCustomAttribute {  

  element;
  constructor(element) {
      this.element = element;
  }

  attached() {
    $(this.element)
    .draggable({
        handle: '.modal-header'
    })
  }

  
}