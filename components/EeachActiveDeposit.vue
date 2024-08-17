<template>
  <div class="das-eac-active">
    <div class="das-active-timelabel bi">{{ item.percent }} %</div>
    <div class="das-active-timelabel sma">
      Daily for {{ item.planDuration }} Days
    </div>
    <div class="das-active-timelabel">Next Profit</div>
    <div class="das-active-time">
      {{ setCountDownTime(item.time) }} {{ countDown }}
    </div>
    <div class="das-active-flex">
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/dollar.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Deposited<br /></span>${{
            numberWithCommas(item.amount)
          }}
        </div>
      </div>
      <div class="das-eac-flex-pay">
        <img
          :src="`${FILE_URL}/${item.image}`"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Payment<br /></span
          >{{ item.walletName }}
        </div>
      </div>
    </div>
    <div class="das-active-flex">
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/earning.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Earnings<br /></span>${{
            numberWithCommas(item.earnings)
          }}
        </div>
      </div>
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/dailyProfit.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Daily Profit<br />‍</span>${{
            numberWithCommas(item.percent * item.amount * 0.01)
          }}
        </div>
      </div>
    </div>
    <div class="das-active-flex">
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/income.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Total %<br /></span
          >{{ item.percent * item.planDuration }} %
        </div>
      </div>
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/calculator.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Total Profit<br />‍</span>${{
            numberWithCommas(
              item.amount * item.planDuration * item.percent * 0.01
            )
          }}
        </div>
      </div>
    </div>
    <div class="das-active-flex">
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/calendar.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Created<br />‍</span
          >{{ formatDate(item.time) }}<br />
          {{ formatTimeToAMPM(item.time) }}
        </div>
      </div>
      <div class="das-eac-flex-pay">
        <img
          src="/images/dashboard/time.svg"
          loading="lazy"
          alt=""
          class="das-active-icon"
        />
        <div>
          <span class="das-active-color">Expires<br /></span
          ><span class="das-active-color">‍</span
          >{{ formatDate(item.time + item.planDuration * 86400000) }}<br />
          {{ formatTimeToAMPM(item.time + item.planDuration * 86400000) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: "",
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      // Function to add ordinal suffix to the day
      const addOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + "th";
        } else {
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        }
      };

      const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
      return formattedDate;
    },

    formatTimeToAMPM(time = new Date().getTime()) {
      if (typeof time !== "number") {
        return "Invalid timestamp";
      }

      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    },

    getCountdownToNext24Hours(targetHour, targetMinute, targetSecond) {
      const currentDate = new Date();

      // Calculate the target date and time for the next 24 hours
      const targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1, // Next day
        targetHour,
        targetMinute,
        targetSecond
      );

      // Calculate the time difference in milliseconds
      let timeDifference = targetDate.getTime() - currentDate.getTime();

      // Return 0 if the target time is already past for the current day
      if (timeDifference < 0) {
        timeDifference =
          24 * 60 * 60 * 1000 - (currentDate.getTime() - targetDate.getTime());
      }

      // Convert time difference to hours, minutes, and seconds
      let hours = Math.floor(timeDifference / (1000 * 60 * 60));
      let minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Create a countdown object
      const countdown = {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      };

      return countdown;
    },

    setCountDownTime(time) {
      const targetHour = new Date(time).getHours();
      const targetMinute = new Date(time).getMinutes();
      const targetSecond = new Date(time).getSeconds();
      setInterval(() => {
        const countdown = this.getCountdownToNext24Hours(
          targetHour,
          targetMinute,
          targetSecond
        );

        this.countDown = `${Math.ceil(countdown.hours % 24)}h : ${
          countdown.minutes
        }m : ${countdown.seconds}s`;
      }, 1000);
    },
  },

  computed: {
    activeDepositLength() {
      return this.$store.state.dashboard.activeDepositLength;
    },

    wallets() {
      return this.$store.state.dashboard.wallets;
    },

    currencies() {
      return this.$store.state.dashboard.currencies;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>
<style></style>
