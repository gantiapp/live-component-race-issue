// common variables
const d = new Date();
const month = d.getMonth() + 1;
const day = d.getDate();
const hour = d.getHours();
const minute = d.getMinutes();
const date_output = d.getFullYear() + (month<10 ? '0' : '') + month + (day<10 ? '0' : '') + day + (hour<10 ? '0' : '') + hour + (minute<10 ? '0' : '') + minute;

export default {
    date_output: date_output
}
