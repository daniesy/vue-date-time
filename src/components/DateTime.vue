<template>
  <div class="picker picker--ats container">
    <div class="row">
      <div class="col-lg-6">
        <DatePicker
          v-model="val"
          :starts-on-monday="startsOnMonday"
          :min-date="minDate"
          :max-date="maxDate"
          :month-format="monthFormat"
          :year-format="yearFormat"
          :presets="presets"
          :date-label="dateLabel"
        />
      </div>
      <div class="col-lg-6">
        <TimePicker
          v-model="val"
          :military-time="militaryTime"
          :day-hour="dayHour"
          :night-hour="nightHour"
          :minute-format="minuteFormat"
          :hour-format="hourFormat"
          :minute-increment="minuteIncrement"
          :min-date="minDate"
          :max-date="maxDate"
          :round-up="roundUp"
          :time-label="timeLabel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "./Date";
import TimePicker from "./Time";

export default {
  name: "DateTime",
  data: () => ({
    val: ""
  }),
  props: {
    locale: { type: String, default: "en" },
    value: {
      type: String,
      default: () =>
        dayjs()
          .second(0)
          .format()
    },
    startsOnMonday: { type: Boolean, default: true },
    monthFormat: {
      type: String,
      default: "MMMM"
    },
    yearFormat: {
      type: String,
      default: "YYYY"
    },
    minDate: {
      type: String,
      default: "1990-01-01"
    },
    maxDate: {
      type: String,
      default: "2100-01-01"
    },
    presets: {
      type: Array,
      default: () => [
        { label: "1 Minute from now", amount: 1, unit: "minute" },
        { label: "5 Minutes from now", amount: 5, unit: "minute" },
        { label: "1 Hour from now", amount: 1, unit: "hour" },
        { label: "Tomorrow", amount: 1, unit: "day" },
        { label: "Next Week", amount: 1, unit: "week" },
        { label: "Next Month", amount: 1, unit: "month" }
      ]
    },
    militaryTime: { type: Boolean },
    dayHour: { type: Number, default: 8 },
    nightHour: { type: Number, default: 20 },
    minuteFormat: { type: String, default: "m" },
    hourFormat: { type: String, default: "H" },
    minuteIncrement: { type: Number, default: 5 },
    roundUp: {
      type: Boolean,
      default: true
    },
    dateLabel: {
      type: String,
      default: "Date"
    },
    timeLabel: {
      type: String,
      default: "Time"
    },
  },
  watch: {
    value(n, o) {
      if (n !== o && !!n) {
        this.val = n;
      }
    },
    val(n) {
      this.$emit("input", n);
    }
  },
  components: { DatePicker, TimePicker },
  created() {
    dayjs.locale(this.locale);
    this.val = this.value
      ? this.value
      : dayjs()
          .second(0)
          .format();
  }
};
</script>

<style scoped>
.picker {
  --accent-color: #000;
  --text-color: #333;
  text-align: left;
}
.picker--ats {
  --accent-color: #ff3366;
  --text-color: #203152;
  --border-color: #ccc;
}
</style>

<style lang="scss">
.picker {
  .header {
    display: flex;
    grid-area: header;
    justify-content: space-between;
    font-size: 1.1rem;
    color: var(--text-color);
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: none;
      border: none;
      border-radius: 3px;
      padding: 0;
      margin: 0;
      width: 20px;
      height: 20px;
      padding: 2px;
      &:hover {
        background: var(--accent-color);
        path {
          fill: white;
        }
      }
    }
  }

  .spacer {
    grid-area: spacer;
    border: none;
    border-bottom: 0.5px solid var(--border-color);
    width: 100%;
  }
  button.selection {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: 1.5px solid transparent;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    user-select: none;
    padding: 0;
    cursor: pointer;
    border-radius: 3px;
    color: var(--text-color);
    &.day__prev,
    &.day__next {
      opacity: 0.3;
    }
    &.day__prev {
      cursor: w-resize;
    }
    &.day__next {
      cursor: e-resize;
    }
    &:hover {
      color: var(--text-color);
      border-color: var(--accent-color);
      opacity: 1;
    }
    &.selection--active {
      background: var(--accent-color);
      color: white;
    }
    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
}
</style>
