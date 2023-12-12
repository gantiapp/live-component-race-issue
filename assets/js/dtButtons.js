export const language = () => {
    return {
        buttons: {
            pageLength: {
                _: '<span class="d-flex justify-content-center"><i class="material-icons me-2">format_list_numbered</i>%d rows</span>',
                '-1': '<span class="d-flex justify-content-center"><i class="material-icons me-2">format_list_numbered</i>All rows</span>'
            }
        },
        select: {
            rows: {
                _: " - %d rows selected",
                0: "",
                1: " - 1 row selected",
            }
        }
    }
}
