import {Controller} from '@hotwired/stimulus';
import variables from "../../js/variables";
import {Modal} from "bootstrap";
import {createAlert} from "../../js/common/alerts";
import {language, showFilters} from "../../js/dtButtons";
import {columnFiltering} from "../../js/common/columnFiltering";

export default class extends Controller {
  connect() {
    const adminTableElms = document.querySelectorAll('.admin-table');

    if (adminTableElms.length === 0) {
      return;
    }

    adminTableElms.forEach(adminTableElm => {
      adminTableElm.classList.add('display', 'stripe', 'compact');

      let oAdminTable = $(adminTableElm).DataTable({
        "paging":   true,
        "pageLength": 25,
        "order": [],
        "searching":true,
        "scrollX":   true,
        "responsive": true,
        dom: 'frtip',
        colReorder: true,
        select: true,
        autoWidth: false,
        language: language(),
      });

      document.querySelectorAll('.admin-table').forEach(elm => {
        elm.removeAttribute('style');
      })

      if (oAdminTable !== null) {
        oAdminTable.columns.adjust().draw();

        setTimeout(function () {
          oAdminTable.columns.adjust().draw();
        }, 200);
      }
    });
  }
}
