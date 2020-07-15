<template>
  <div class="date" :class="{ 'date--w-presets': presets.length }">
    <div class="header">
      <strong>Date</strong>
      <div class="date-display">
        <button @click="prevMonth">
          <svg
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path
              d="M 34.960938 2.980469 C 34.441406 2.996094 33.949219 3.214844 33.585938 3.585938 L 13.585938 23.585938 C 12.804688 24.367188 12.804688 25.632813 13.585938 26.414063 L 33.585938 46.414063 C 34.085938 46.9375 34.832031 47.148438 35.535156 46.964844 C 36.234375 46.78125 36.78125 46.234375 36.964844 45.535156 C 37.148438 44.832031 36.9375 44.085938 36.414063 43.585938 L 17.828125 25 L 36.414063 6.414063 C 37.003906 5.839844 37.183594 4.960938 36.863281 4.199219 C 36.539063 3.441406 35.785156 2.957031 34.960938 2.980469 Z"
            ></path>
          </svg>
        </button>
        <div>{{ selectedMonth }} {{ selectedYear }}</div>
        <button @click="nextMonth">
          <svg
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <path
              d="M 14.980469 2.980469 C 14.164063 2.980469 13.433594 3.476563 13.128906 4.230469 C 12.820313 4.984375 13.003906 5.847656 13.585938 6.414063 L 32.171875 25 L 13.585938 43.585938 C 13.0625 44.085938 12.851563 44.832031 13.035156 45.535156 C 13.21875 46.234375 13.765625 46.78125 14.464844 46.964844 C 15.167969 47.148438 15.914063 46.9375 16.414063 46.414063 L 36.414063 26.414063 C 37.195313 25.632813 37.195313 24.367188 36.414063 23.585938 L 16.414063 3.585938 C 16.035156 3.199219 15.519531 2.980469 14.980469 2.980469 Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <hr class="spacer" />
    <div class="presets" v-if="presets.length">
      <div class="label">Presets</div>
      <button
        v-for="preset in presets"
        :key="preset.label"
        @click="jumpTo(preset)"
      >
        {{ preset.label }}
      </button>
    </div>
    <div class="calendar">
      <div class="weekday label" v-for="weekday in weekdays" :key="weekday">
        {{ weekday }}
      </div>
      <button
        class="selection day day__prev"
        @click="selectDate(day, 'prev')"
        :disabled="checkDisabledDate(day)"
        :title="day.title"
        :key="`prev-${day.value}`"
        v-for="day in lastMonthDays"
      >
        {{ day.display }}
      </button>
      <button
        class="selection day"
        :class="{ 'selection--active': selectedDay === day.display }"
        @click="selectDate(day, 'current')"
        :disabled="checkDisabledDate(day)"
        :title="day.title"
        :key="day.value"
        v-for="day in currentMonthDays"
      >
        {{ day.display }}
      </button>
      <button
        class="selection day day__next"
        @click="selectDate(day, 'next')"
        :disabled="checkDisabledDate(day)"
        :title="day.title"
        :key="`next-${day.value}`"
        v-for="day in futureMonthDays"
      >
        {{ day.display }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Date",
  data: () => ({
    date: null
  }),
  props: {
    value: {
      type: String
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
      default: "1900-01-01"
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
    dateLabel: {
      type: String,
      default: "Date"
    }
  },
  watch: {
    value(n, o) {
      if (n !== o) {
        this.date = n;
      }
    }
  },
  computed: {
    weekdays() {
      let weekdays = dayjs.weekdaysMin();
      if (this.startsOnMonday) {
        weekdays.push(weekdays.shift());
      }
      return weekdays;
    },
    current() {
      return dayjs(this.date);
    },
    selectedMonth() {
      return this.current.format(this.monthFormat);
    },
    selectedYear() {
      return this.current.format(this.yearFormat);
    },
    selectedDay() {
      return parseInt(this.current.format("D"), 10);
    },
    lastMonth() {
      return this.current
        .clone()
        .subtract(1, "month")
        .startOf("month");
    },
    currentMaxDays() {
      return this.current.daysInMonth();
    },
    currentMonthOffset() {
      const offset = this.current
        .clone()
        .startOf("month")
        .day();
      return this.startsOnMonday ? offset - 1 : offset;
    },
    currentMonthDays() {
      let date = this.current.clone().date(1);
      return [...Array(this.currentMaxDays)].map((item, i) => {
        const data = {
          display: i + 1,
          value: date.format(),
          title: date.format("LL")
        };
        date = date.add(1, "day");
        return data;
      });
    },
    lastMonthDays() {
      const max = this.lastMonth.daysInMonth();
      let date = this.current
        .clone()
        .subtract(1, "month")
        .date(max);

      return [...Array(this.currentMonthOffset)]
        .map((item, i) => {
          const data = {
            display: max - i,
            value: date.format(),
            title: date.format("LL")
          };
          date = date.subtract(1, "day");
          return data;
        })
        .reverse();
    },
    futureMaxDays() {
      return 7 * 6 - this.currentMaxDays - this.currentMonthOffset;
    },
    futureMonthDays() {
      let date = this.current
        .clone()
        .date(1)
        .add(1, "month");

      return [...Array(this.futureMaxDays)].map((item, i) => {
        const data = {
          display: i + 1,
          value: date.format(),
          title: date.format("LL")
        };
        date = date.add(1, "day");
        return data;
      });
    }
  },
  methods: {
    checkDisabledDate(day) {
      return !dayjs(day.value).isBetween(this.minDate, this.maxDate);
    },
    selectDate(day) {
      this.updateDate(day.value);
    },
    nextMonth() {
      let date = this.current.add(1, "month");
      this.updateDate(date.format());
    },
    prevMonth() {
      let date = this.current.subtract(1, "month");
      this.updateDate(date.format());
    },
    jumpTo(preset) {
      const date = dayjs().add(preset.amount, preset.unit);
      this.updateDate(date.format());
    },
    updateDate(date) {
      this.date = date;
      this.$emit("input", this.date);
    }
  },
  created() {
    this.date = this.value;
  }
};
</script>

<style lang="scss" scoped>
.date {
  margin: 20px 0;
  display: grid;
  grid-template-areas:
    "header"
    "spacer"
    "calendar";

  &.date--w-presets {
    grid-template-areas:
      "header header"
      "spacer spacer"
      "presets calendar";
    grid-template-columns: 200px auto;
  }
  .header {
    .date-display {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .label {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    color: #999;
    line-height: 40px;
  }
  .presets {
    grid-area: presets;
    display: grid;
    grid-template-rows: repeat(7, 40px);
    * {
      text-align: left;
    }
  }
  .calendar {
    grid-area: calendar;
    display: grid;
    grid-template-columns: repeat(7, 40px);
    grid-template-rows: repeat(7, 40px);
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }
}
</style>
