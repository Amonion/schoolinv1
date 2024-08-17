<template>
  <div>
    <div
      v-for="item in competitions"
      :key="item.id"
      class="dash-each-comment each"
    >
      <div class="dash-comment-pix">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
          loading="lazy"
          sizes="(max-width: 479px) 40px, 50.000003814697266px"
          srcset="
            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
          "
          alt=""
          class="responsive-img"
        />
      </div>
      <div>
        <a href="#" class="dash-comment-uername">UgoKenny</a>
        <div>
          This is some text inside of a div block. This is some text inside of a
          div block. This is some text inside of a div block. This is some text
          inside of a div block.
        </div>
        <div class="dash-comment-img">
          <img
            :src="`${FILE_URL}/${item.image}`"
            loading="lazy"
            sizes="(max-width: 479px) 97vw, (max-width: 767px) 84vw, (max-width: 1279px) 61vw, 731.1111450195312px"
            :srcset="`
                ${FILE_URL}/${item.image}   500w,
                ${FILE_URL}/${item.image}   800w,
                ${FILE_URL}/${item.image} 1080w,
                ${FILE_URL}/${item.image}        1300w`"
            alt=""
            class="responsive-img"
          />
        </div>
        <div class="dash-comment-details">
          <div class="dash-eachcomment-details">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adb6dce2dfb400ce4f203b_Clock.svg"
              loading="lazy"
              alt=""
              class="dash-commnt-icon"
            />
            <div>13 min</div>
          </div>
          <div class="dash-eachcomment-details">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adbdccb170ad46081b1b6c_SuitHeartFill%20(1).svg"
              loading="lazy"
              alt=""
              class="dash-commnt-icon"
            />
            <div>13 min</div>
          </div>
          <div class="dash-eachcomment-details">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adbdcc6f2c57641a770529_ChatQuote%20(1).svg"
              loading="lazy"
              alt=""
              class="dash-commnt-icon"
            />
            <div>13K</div>
          </div>
          <div class="dash-eachcomment-details">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcb4ab68c86b45eb435f9_Reply%20(1).svg"
              loading="lazy"
              alt=""
              class="dash-commnt-icon"
            />
            <div>Reply</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!onRequest" class="dash-load-more">Load More...</div>
    <div v-else class="dash-loading-more">
      <div class="dash-upload-holder">
        <input
          class="input-hidden w-input"
          maxlength="256"
          name="field-2"
          data-name="Field 2"
          placeholder="Example Text"
          type="text"
          id="field-2"
          required=""
        /><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
          loading="lazy"
          alt=""
          class="dash-uploadicon"
        />
        <div>Processing</div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardMainPosts from "../../components/Dashboard/DashboardMainPosts.vue";
import DashboardPolls from "../../components/Dashboard/DashboardPolls.vue";
export default {
  components: { DashboardPolls, DashboardMainPosts },
  layout: "dashboard",

  data() {
    return {
      currentPage: 1,
      limit: 10,
      onRequest: false,
    };
  },

  methods: {
    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    copyRefLink() {
      const inputElement = document.getElementById("refs");
      inputElement.select();
      document.execCommand("copy");
      // window.getSelection().removeAllRanges();
    },

    async selectTransaction(item) {
      this.selectedType = item;
      this.showTransactions = false;
      let type;
      if (item == "All") {
        type = ``;
      } else {
        type = `transactionType=${item}`;
      }

      await this.$store.dispatch(
        "dashboard/getTransactions",
        `/transactions/?${type}&username=${this.user.username}&limit=${this.limit}&page=${this.currentPage}`
      );
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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    competitions() {
      return this.$store.state.dashboard.competitions;
    },

    totalLength() {
      return this.$store.state.dashboard.competitionLength;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
