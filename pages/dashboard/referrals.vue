<template>
  <div>
    <dashboard-navigation />
    <div class="dash-body">
      <div class="dash-container">
        <div class="dash-bodyflex">
          <dashboard-aside />

          <div class="dash-body-right">
            <div class="dash-total-balance">
              <div class="dash-balance-header top">
                <div class="dash-pane-title">Referral</div>
              </div>

              <!-- <div class="das-rit-flex deposi left">
        <div class="das-wallets left">
          <div class="das-selet-wallet">Select From System</div>
          <div class="w-layout-grid dash-wallet-grid full">
            <div
              v-for="(item, int) in dashStore.wallet"
              :key="int"
              class="das-each-wallet"
              :class="{ active: item.checked }"
              @click="selectWallet(item)"
            >
              <div class="dash-wallet-ead">
                <div>{{ item.walletName }} Balance</div>
                <img
                  :src="`${dashStore.baseURL}/uploads/${item.image}`"
                  loading="lazy"
                  alt=""
                  class="dash-wallet-coin"
                />
              </div>
              <div class="dash-totalbalance sm">
                ${{ dashStore.numberWithCommas(item.balance) }}
              </div>
              <div class="dash-wallet-edits">
                <div class="dash-wallet-range">
                  <span class="dash-wallet-span">+2.6%</span> Wallet Increase
                </div>
                <NuxtLink
                  :to="`/dashboard/profile/?walletId=${item.id}`"
                  class="w-inline-block"
                  ><img
                    src="/images/dashboard/edit-green.svg"
                    loading="lazy"
                    width="14"
                    alt=""
                /></NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div> -->

              <div class="dash-payment">
                <div id="qrcode"></div>

                <div class="dash-plan-stats">
                  <div class="das-eac-plan-stat wallet">
                    <div>Scan te code above or copy te wallet below</div>
                  </div>
                  <div class="das-ref-linkinput w-form">
                    <div class="dash-ref-link wallet">
                      <input
                        type="text"
                        class="dash-ref-input w-input"
                        maxlength="256"
                        v-model="address"
                        id="address"
                      /><img
                        src="/images/dashboard/copy-white.svg"
                        loading="lazy"
                        width="21"
                        alt=""
                        class="dash-ref-copy"
                        @click="copyAddress"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="referrals.length > 0" class="das-tb-scroll">
                <div class="das-tb-istory earnin">
                  <div class="dash-trans-table">
                    <div class="das-sn"><div>S/N</div></div>
                    <div class="das-td20"><div>Username</div></div>
                    <div class="das-td20"><div>Currency</div></div>
                    <div class="das-td20"><div>Amount</div></div>
                    <div class="das-td20"><div>Time</div></div>
                  </div>

                  <div
                    v-for="(item, int) in referrals"
                    :key="int"
                    class="dash-trans-table body even"
                  >
                    <div class="das-sn">
                      <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
                    </div>
                    <div class="das-td20">
                      <div>{{ item.referralUsername }}</div>
                    </div>
                    <div class="das-td20">
                      <img
                        :src="`${FILE_URL}/${item.image}`"
                        loading="lazy"
                        alt=""
                        class="dash-wallet-coin"
                      /><br />
                      {{ item.walletName }}
                    </div>
                    <div class="das-td20">
                      <div>${{ numberWithCommas(item.commission) }}</div>
                    </div>
                    <div class="das-td20 time">
                      <div>
                        {{ formatTimeToAMPM(item.time) }}<br />{{
                          formatDate(item.time)
                        }}
                      </div>
                    </div>
                  </div>

                  <div class="das-tb-paination">
                    <img
                      v-if="currentPage > 1"
                      src="/images/dashboard/arrow-left.svg"
                      loading="lazy"
                      alt=""
                      class="das-painate-arrow"
                    />
                    <div
                      class="das-painate"
                      :class="{ active: int + 1 == currentPage }"
                      v-for="(item, int) in getPages(totalLength, limit)"
                      :key="int"
                    >
                      {{ int + 1 }}
                    </div>

                    <img
                      v-if="currentPage < getPages(totalLength, limit)"
                      src="/images/dashboard/arrow-right.svg"
                      loading="lazy"
                      alt=""
                      class="das-painate-arrow"
                    />
                  </div>
                </div>
              </div>
              <h1 v-else class="dash-nothing">SORRY, NO REFERRAL YET</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      address: "",
      currentPage: 1,
      limit: 10,
    };
  },
  methods: {
    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

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

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },

    copyAddress() {
      const inputElement = document.getElementById("address");
      inputElement.select();

      document.execCommand("copy");
    },
  },

  mounted() {
    const qrContainer = document.getElementById("qrcode");
    const size = 200;

    const googleChartsApiUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${window.location.origin}/?ref=${this.user.username}`;
    const img = new Image();
    img.src = googleChartsApiUrl;
    img.width = size;
    img.height = size;
    qrContainer.appendChild(img);
    this.address = `${window.location.origin}/?ref=${this.user.username}`;
  },

  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.dashboard.company;
    },

    referrals() {
      return this.$store.state.dashboard.referrals;
    },

    totalLength() {
      return this.$store.state.dashboard.referralLength;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
