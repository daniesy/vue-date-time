import Vue from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(localeData);
dayjs.extend(isBetween);

require("dayjs/locale/ro");
require("dayjs/locale/es");
require("dayjs/locale/pt");

window.dayjs = dayjs;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
