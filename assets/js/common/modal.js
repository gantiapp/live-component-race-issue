import { Modal } from "bootstrap";

export const showModal = (element) => {
    getModal(element).show();
}

export const hideModal = (element) => {
    const modal = getModal(element);

    if (!modal._isShown || modal._isTransitioning) {
        element.addEventListener("shown.bs.modal", () => {
            modal.hide();
        });
    } else {
        modal.hide();
    }
}

const getModal = (element) => {
    return Modal.getOrCreateInstance(element);
}