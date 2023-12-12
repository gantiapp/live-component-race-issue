import $ from "jquery";

export const addAlert = (alert, alertPosition = 'append', alertParentSelector = '.alert-ganti', alreadyExisting = true) => {
    if (alertDuration <= 0) {
        const button = document.createElement('button');
        button.classList.add('btn-close');
        button.setAttribute('data-bs-dismiss', 'alert');
        button.setAttribute('aria-label', 'Close');

        alert.appendChild(button);
    }

    if (!alreadyExisting) {
        let alertParent = document.querySelector(alertParentSelector);

        if (alertPosition === 'append') {
            alertParent.append(alert);
        } else {
            alertParent.prepend(alert);
        }
    }

    $(alert).fadeIn(500, function () {
        let createdAlert = $(this);

        if (alertDuration > 0) {
            setTimeout(function () {
                createdAlert.fadeOut(500, function () {
                    createdAlert.remove();
                });
            }, alertDuration)
        }
    });
}

export const createAlert = (color, message, alertId, alertPosition = 'append', alertParentSelector = '.alert-ganti') => {
    let alert = document.createElement('div');
    alert.classList.add('alert', `alert-${color}`, 'alert-dismissible', 'show');
    alert.setAttribute('role', 'alert');
    alert.innerHTML = message;

    if (alertId !== 'undefined') {
        let existingAlert = document.getElementById(alertId);

        if (existingAlert !== null) {
            existingAlert.remove();
        }

        alert.setAttribute('id', alertId);
    }


    addAlert(alert, alertPosition, alertParentSelector, false)
}

export const removeAlert = (alertId) => {
    const alert = document.getElementById(alertId);

    if (alert !== null) {
        alert.remove();
    }
}

export default class Alert {
}
