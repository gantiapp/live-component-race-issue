import {Tooltip} from "bootstrap";

export const updateAfterQuickEdit = (result) => {
    if (result.controlType === 'domain') {
        updateDomainAfterQuickEdit(result);
    } else {
        return updateQueryAfterQuickEdit(result);
    }

    return null;
}

const updateDomainAfterQuickEdit = (result) => {
    let name = '';
    const description = result.description ?? '';
    const title = `${result.name} : ${description} / ${result.key}`;

    if (result.type === 'tbl') {
        name = result.secondname;
    } else {
        name = result.name;
    }

    const head = document.querySelector(`#head-t-${result.id}`)
    head.closest('li').setAttribute('data-bs-original-title', description);
    head.querySelector('.header-dataset-name').innerText = result.name;

    const exportCheckboxLabel = document.querySelector(`label[for="exportCheckbox-${result.id}"`);

    if (exportCheckboxLabel !== null) {
        exportCheckboxLabel.innerText = result.name;
    }

    if (head.querySelectorAll('.badge').length === 0 && head.querySelector('.header-dataset-warning').innerText === '') {
        const badgeColor = `btn-${result.emptyContentBadgeColor}`;

        if (!head.classList.contains(badgeColor)) {
            head.className = head.className.replace(/btn-(success|danger|warning|info|primary|secondary)/g, badgeColor);
        }
    }

    new Tooltip(head, {boundary: 'window'});

    $(`#js-table-${result.id} > .card-header > span:first-child`)
        .html(title)
        .attr('data-bs-original-title', name);
    ;
}

const updateQueryAfterQuickEdit = (result) => {
    let title = '';

    if (result.hasOwnProperty('database')) {
        title = `${result.name} / ${result.database}`;
    } else if (result.hasOwnProperty('system')) {
        title = `${result.name} / ${result.system}`;
    } else {
        title = result.name;
    }

    $('#nav_screen h2')
        .attr('title', result.description)
        .find('#control_name').html(title)
    ;

    $('.modal.fade.modal-comment-xl > div > div > div.modal-header > h5').html(result.name);
    document.title = result.name;

    let alertMessage = null;

    if (typeof result.query !== 'undefined') {
        if ($('.quickedit textarea').text() !== result.query)
            alertMessage = 'Query changed : if you want to execute it, you have to reload the page';
        else if ($('.quickedit select option[selected]').val() !== result.type)
            alertMessage = 'Type changed : if you want to have it, you have to reload the page';
    }
    else if (typeof result.command !== 'undefined') {
        if ($('.quickedit textarea').text() !== result.command)
            alertMessage = 'Command changed : if you want to execute it, you have to reload the page';
    }

    return alertMessage;
}
