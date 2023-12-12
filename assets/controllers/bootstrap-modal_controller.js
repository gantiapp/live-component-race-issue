import {Controller} from '@hotwired/stimulus';
import {Modal} from 'bootstrap';

export default class extends Controller {
    initialize() {
        window.addEventListener('modal:close', () => Modal.getInstance(this.element).hide());
    }
}
