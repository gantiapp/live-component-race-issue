import $ from "jquery";
import {Modal} from "bootstrap";

let modalElement;

export function waitModal(averageTime) {
    if (averageTime !== undefined) {
        let loadingDataProgress = $('#loadingDataProgress');

        loadingDataProgress.attr('aria-valuenow', 0);
        loadingDataProgress.attr('style', 'width: 0%');
        loadingDataProgress.attr('aria-valuenow', 0);

        modalElement = new Modal(document.getElementById("waitLoadingData"), {
            backdrop: 'static',
            keyboard: false
        });
        modalElement.show();

        let process = setInterval(function () {
            if (loadingDataProgress.attr('aria-valuenow') >= 100)
                clearInterval(process);

            else {
                let currentValue = parseInt(loadingDataProgress.attr('aria-valuenow'));
                loadingDataProgress.attr('aria-valuenow', currentValue + 5);
                loadingDataProgress.attr('style', `width: ${currentValue + 5}%`);
            }
        }, averageTime * 1000 * 0.05);        // *1000 for having time in ms
    } else {
        modalElement = new Modal(document.getElementById("waitAjax"), {
            backdrop: 'static',
            keyboard: false
        });
        modalElement.show()
    }

    return modalElement;
}

export function hideModal(modalToHide){
    let element = document.getElementById(modalToHide._element.id);
    if(!modalToHide._isShown || modalToHide._isTransitioning) {
        element.addEventListener("shown.bs.modal", function (event) {
            modalToHide.hide();
        });
    }else{
        modalToHide.hide();
    }
}
