import Vue from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

require("dayjs/locale/ro");
require("dayjs/locale/es");
require("dayjs/locale/pt");

window.dayjs = dayjs;
window.dayjs.extend(localeData);
window.dayjs.extend(isBetween);
window.dayjs.extend(utc);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
