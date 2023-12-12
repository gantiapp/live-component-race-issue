import $ from "jquery";
import {Modal} from "bootstrap";

export const hideColumn = (event) => {
    let element = $(event.target);
    let table = event.data.table;
    let columnId = element.parents('th').attr('data-column-index');

    let column = table.column(columnId);
    column.visible(!column.visible());

    event.stopImmediatePropagation();
}

export const createSearchPanes = (button, table, event, params) => {
    button.setAttribute('id', 'filterButton');
    let target = button.getAttribute('data-bs-target').substring(1);
    let modalElement = Modal.getOrCreateInstance(document.getElementById('waitAjax'), {
        backdrop: 'static',
        keyboard: false
    })
    modalElement.show();

    let afterElement = button.closest('.dt-buttons');

    new $.fn.dataTable.SearchPanes(table, params);
    $(afterElement).after(table.searchPanes.container().addClass('collapse').attr('id', target));

    $(`#${target}`).on('hidden.bs.collapse', function () {
        table.columns.adjust().draw();
    });

    button.setAttribute('aria-expanded', "true");
    document.getElementById(target).classList.add("show");
    table.searchPanes.resizePanes();

    setTimeout(function () {
        hideModal(modalElement)
    }, 100);
}

function hideModal(modalToHide){
    let element = document.getElementById(modalToHide._element.id);
    if(!modalToHide._isShown || modalToHide._isTransitioning) {
        element.addEventListener("shown.bs.modal", function (event) {
            modalToHide.hide();
        });
    }else{
        modalToHide.hide();
    }
}
