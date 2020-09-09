import Vue from "vue";
import DateTime from "./components/DateTime.vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

if (!window.dayjs) {    
    window.dayjs = dayjs;
}

window.dayjs.extend(localeData);
window.dayjs.extend(isBetween);
window.dayjs.extend(utc);

require("dayjs/locale/ro");
require("dayjs/locale/es");
require("dayjs/locale/pt");

Vue.component("DateTime", DateTime);
export default DateTime;