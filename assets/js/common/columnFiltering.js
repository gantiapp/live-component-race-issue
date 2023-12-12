import $ from "jquery";

let cursorPosition = '';

export function columnFiltering(table, selector, disableColumnTrashIcon = false) {

    $.each(table.columns().header(), function (key, columnHeader) {
        const title = columnHeader.innerText; // Select the th name of each column

        if (!disableColumnTrashIcon) {
            addTitleAndTrashIconInsideTheTH(title, columnHeader);
        }

        addInputFilterInsideTheTH(title, key, columnHeader);
    });

    table.columns().eq(0).each(function (colIdx) {
        // For each column
        $(`${selector} thead tr th div`).eq(colIdx)
            .on('click mousedown', (e) => {
                e.stopPropagation()
            });
        $(`${selector} thead tr th .datatables-input-filter`).eq(colIdx)
            .on('input', function (e) {
                $(this).attr('title', $(this).val()); // Update the input value everytime we write
                let regex = '({search})';
                cursorPosition = this.selectionStart;

                table
                    .column(e.currentTarget.closest('th'))
                    .search((this.value !== '') ? regex.replace('{search}', '(((' + this.value + ')))') : '',
                        this.value !== '',
                        this.value === '')
                    .draw();
                $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition);
            });

        table.column(colIdx).search('');
    });
}

function addTitleAndTrashIconInsideTheTH(title, columnHeader) {
    columnHeader.innerText = '';

    // Create a span and add the title in the span
    const titleContainer = document.createElement('span');
    titleContainer.classList.add('header-name');
    titleContainer.innerText = title;

    // Create a span and add the trash icon inside it
    const trashIcon = document.createElement('span');
    trashIcon.classList.add('material-icons', 'showHideColumn');
    trashIcon.title = 'Hide the column';
    trashIcon.innerText = 'delete_forever';

    // Create a span (container) and append the title and the trash icon inside it
    const thContainer = document.createElement('span');
    thContainer.classList.add('th-container', 'd-flex');
    thContainer.appendChild(titleContainer);
    thContainer.appendChild(trashIcon);

    columnHeader.appendChild(thContainer);
}

function addInputFilterInsideTheTH(title, key, columnHeader) {
    const inputFilter = document.createElement('input');
    inputFilter.setAttribute('class', 'datatables-input-filter w-100');
    inputFilter.setAttribute('datatables-input-id', key);

    if (columnHeader.classList.contains('dt-input-filter-disabled')) {
        inputFilter.disabled = true;
        inputFilter.style.backgroundColor = '#C3C3C3';
    }

    const icon = document.createElement('i');
    icon.setAttribute('class', 'material-icons');
    icon.innerText = 'filter_alt';

    const inputContainer = document.createElement('div');
    inputContainer.style.minWidth = '70px';
    inputContainer.classList.add('dt-input-filter', 'd-none');
    inputContainer.appendChild(icon);
    inputContainer.appendChild(inputFilter);

    columnHeader.appendChild(inputContainer); // Display the input the in th
}
