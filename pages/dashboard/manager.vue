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
                <div class="dash-pane-title">Management</div>
              </div>
              <div class="das-manae-bar">
                <div
                  @click="activeLevel = int + 1"
                  v-for="(item, int) in managers"
                  :key="int"
                  class="das-level-indicator"
                  :class="{ active: int + 1 == activeLevel }"
                >
                  {{ int + 1 }}
                </div>
              </div>
              <div class="das-rit-flex">
                <div class="das-flex-left left">
                  <div class="dash-each-plan topless">
                    <div class="dash-plan-header">
                      <div class="dash-plan-headflex">
                        <div
                          v-if="managers[activeLevel - 1]"
                          class="dash-plan-title"
                        >
                          Level {{ managers[activeLevel - 1].level }}
                        </div>
                      </div>
                      <a href="#" class="dash-ref-view w-inline-block"
                        ><div class="dash-desc-percent">view</div></a
                      >
                    </div>
                    <div class="dash-plan-stats">
                      <div class="das-eac-plan-stat">
                        <div class="das-desc-cild money">
                          ${{ numberWithCommas(user.managerBalance) }}
                        </div>
                        <div v-if="managers[activeLevel - 1]">
                          You will receive ${{
                            managers[activeLevel - 1].bonus
                          }}
                          Once your referral reach ${{
                            managers[activeLevel - 1].referral
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="dash-transct-volume">
                      <div class="dash-volume-each level">
                        <div class="dash-plan-bars">
                          <div class="das-plan-bar pink"></div>
                        </div>
                        <div class="dash-trnsact-flex">
                          <div class="dash-dot pink"></div>
                          <div>Amount Left</div>
                        </div>
                        <div class="das-desc-cild money">
                          ${{
                            numberWithCommas(
                              managers[activeLevel - 1].personal -
                                user.managerBalance
                            )
                          }}
                        </div>
                      </div>
                      <div class="dash-volume-each level">
                        <div class="dash-plan-bars">
                          <div class="das-plan-bar w-full"></div>
                        </div>
                        <div class="dash-trnsact-flex">
                          <div class="dash-dot reen"></div>
                          <div>Total Needed</div>
                        </div>
                        <div
                          class="das-desc-cild money"
                          v-if="managers[activeLevel - 1]"
                        >
                          ${{
                            numberWithCommas(managers[activeLevel - 1].referral)
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="das-flex-left">
                  <div class="dash-each-plan topless">
                    <div class="dash-plan-header">
                      <div class="dash-plan-headflex">
                        <div class="dash-plan-title">Personal</div>
                      </div>
                      <a href="#" class="dash-ref-view w-inline-block"
                        ><div class="dash-desc-percent">view</div></a
                      >
                    </div>
                    <div class="dash-plan-stats">
                      <div class="das-eac-plan-stat">
                        <div class="das-desc-cild money">
                          ${{ numberWithCommas(user.managerBalance) }}
                        </div>
                        <div v-if="managers[activeLevel - 1]">
                          You will need to deposit ${{
                            numberWithCommas(managers[activeLevel - 1].personal)
                          }}
                          for this level
                        </div>
                      </div>
                    </div>
                    <div class="dash-transct-volume">
                      <div class="dash-volume-each level">
                        <div class="dash-plan-bars">
                          <div class="das-plan-bar pink"></div>
                        </div>
                        <div class="dash-trnsact-flex">
                          <div class="dash-dot pink"></div>
                          <div>Amount Left</div>
                        </div>
                        <div class="das-desc-cild money">
                          ${{
                            numberWithCommas(
                              managers[activeLevel - 1].personal -
                                user.totalBalance
                            )
                          }}
                        </div>
                      </div>
                      <div class="dash-volume-each level">
                        <div class="dash-plan-bars">
                          <div class="das-plan-bar"></div>
                        </div>
                        <div class="dash-trnsact-flex">
                          <div class="dash-dot reen"></div>
                          <div>Total Needed</div>
                        </div>
                        <div
                          class="das-desc-cild money"
                          v-if="managers[activeLevel - 1]"
                        >
                          ${{
                            numberWithCommas(managers[activeLevel - 1].personal)
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span v-if="user">
                <span
                  @click="toggleReferralType(`Referral`)"
                  class="das-select-plan cursor-pointer"
                  v-if="user.referralType == 'Manager'"
                  >Apply for Referral</span
                >
                <span
                  @click="toggleReferralType(`Manager`)"
                  class="das-select-plan cursor-pointer"
                  v-else
                >
                  Apply for Manager</span
                >
              </span>
            </div>

            <div class="dash-total-balance trans">
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
      currentPage: 1,
      activeLevel: 1,
      limit: 10,
    };
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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },

    async toggleReferralType(type) {
      if (
        type == "Manager" &&
        this.user.totalBalance < this.managers[this.activeLevel - 1].personal
      ) {
        this.showModal(
          `Sorry, you will need a minimum of $${this.numberWithCommas(
            this.managers[this.activeLevel - 1].personal
          )} to be a manager.`,
          false,
          true
        );
        return;
      }

      const form = {
        referralType: type,
      };

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch(`dashboard/makePOST`, payload);
      this.$store.commit(`setUser`, result.data.data);
      this.showModal(result.data.message, false, true);
      this.$store.dispatch(`dashboard/initializeUserDetails`, this.user);
    },

    showModal(msg, warning, error) {
      const payload = {
        msg: msg,
        warning: warning,
        error: error,
      };
      this.$store.commit("dashboard/showModal", payload);
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

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

    managers() {
      return this.$store.state.dashboard.managers;
    },

    managersLength() {
      return this.$store.state.dashboard.managersLength;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
