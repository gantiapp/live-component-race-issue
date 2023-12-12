import {Controller} from '@hotwired/stimulus';
import {Tooltip} from "bootstrap";

export default class extends Controller {
  connect() {
    if (Tooltip.getInstance(this.element) === null) {
      const tooltip = new Tooltip(this.element, {
        boundary: 'window'
      });

      tooltip.hide();
    }
  }
}
