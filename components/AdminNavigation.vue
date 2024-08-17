<template>
  <div
    @click.self="toggleNavBar"
    class="admin-nav-wrapper transition"
    :class="{ show: navState }"
  >
    <div class="admin-v-nav">
      <div class="admin-welcome-title">Welcome Back</div>
      <img
        @click="toggleNavBar"
        src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b63e3fcdad9e8446796bb_sidebar-panel-collapse-icon%201.svg"
        loading="lazy"
        alt=""
        class="admin-close-nav-icon"
      />
      <div class="admin-welcome-title name">{{ user.username }}</div>
      <ul v-if="user.staffType == 'Admin'" role="list" class="admin-v-navlist">
        <li class="admin-v-item">
          <NuxtLink
            to="/admin"
            class="admin-v-link"
            :class="{ active: route.name == 'admin' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2159bdf82350d620a835_dashboard-line-white.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Admin</div></NuxtLink
          ><NuxtLink
            to="/admin/users"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-users' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-users' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b26ae82c1169c6795fdbc_users.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Users</div></NuxtLink
          ><NuxtLink
            to="/admin/competitions"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-competitions' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-competitions' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b5916171696c95217f553_chat-icon%201.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Competitions</div></NuxtLink
          ><NuxtLink
            to="/admin/comments"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-comments' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-comments' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2712bdf82350d6241c8f_business-model-icon%201.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Comments</div></NuxtLink
          >

          <NuxtLink
            to="/admin/active-deposits"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-active-deposits' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-active-deposits' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2837b490b66993c8ab98_wallet-money-icon%201.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Transactions</div></NuxtLink
          >
          <NuxtLink
            to="/admin/transactions"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-transactions' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-transactions' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2982111dd4df1ee5e269_foreign-exchange-icon%201.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Transactions</div></NuxtLink
          ><NuxtLink
            to="/admin/history"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-history' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-history' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b298285b2a35331784637_recurring-subscription-icon%201.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>History</div></NuxtLink
          >
          <NuxtLink
            to="/admin/payments"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-payments' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-payments' }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b28361879074194716271_connect-people-icon%202.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Payments</div></NuxtLink
          >
          <NuxtLink
            to="/admin/notification"
            class="admin-v-link"
            :class="{ active: route.name == 'admin-notification' }"
            ><div
              class="admin-v-naviconwrap"
              :class="{ active: route.name == 'admin-notification' }"
            >
              <img
                src="/images/admin/notification-white.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Notification</div></NuxtLink
          >
        </li>
        <li class="admin-v-item">
          <div
            @click="showSchools = !showSchools"
            class="admin-v-link"
            :class="{ active: route.name.includes('school') }"
          >
            <div
              class="admin-v-naviconwrap"
              :class="{ active: route.name.includes('school') }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2b71128fda940b52e989_pages-icon%202.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Schools</div>
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b57694c3db5a4d0ef66f6_caret-right%201.svg"
              loading="lazy"
              alt=""
              class="admin-drop-icon"
            />
          </div>
          <ul
            role="list"
            class="admin-v-navlist inner schools transition"
            :class="{ show: showSchools }"
          >
            <li class="admin-v-item inner">
              <NuxtLink
                to="/admin/schools"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-schools' }"
                ><div>Schools</div></NuxtLink
              ><NuxtLink
                to="/admin/school-faculties"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-faculties' }"
                ><div>Faculties</div></NuxtLink
              >
              <NuxtLink
                to="/admin/school-departments"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-departments' }"
                ><div>Departments</div></NuxtLink
              >
              <NuxtLink
                to="/admin/school-courses"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-courses' }"
                ><div>Courses</div></NuxtLink
              >
              <NuxtLink
                to="/admin/school-payments"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-payments' }"
                ><div>Payments</div></NuxtLink
              >
            </li>
          </ul>
        </li>
        <li class="admin-v-item">
          <div
            @click="showPages = !showPages"
            class="admin-v-link"
            :class="{ active: route.name.includes('page') }"
          >
            <div
              class="admin-v-naviconwrap"
              :class="{ active: route.name.includes('page') }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2b71128fda940b52e989_pages-icon%202.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Pages</div>
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b57694c3db5a4d0ef66f6_caret-right%201.svg"
              loading="lazy"
              alt=""
              class="admin-drop-icon"
            />
          </div>
          <ul
            role="list"
            class="admin-v-navlist inner pages transition"
            :class="{ show: showPages }"
          >
            <li class="admin-v-item inner">
              <NuxtLink
                to="/admin/page-banners"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-banners' }"
                ><div>Banners</div></NuxtLink
              ><NuxtLink
                to="/admin/page-about"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-about' }"
                ><div>About</div></NuxtLink
              ><NuxtLink
                to="/admin/page-faq"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-faq' }"
                ><div>FAQ</div></NuxtLink
              ><NuxtLink
                to="/admin/page-terms"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-terms' }"
                ><div>Terms</div></NuxtLink
              ><NuxtLink
                to="/admin/page-staffs"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-staffs' }"
                ><div>Staffs</div></NuxtLink
              ><NuxtLink
                to="/admin/page-blog"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-blog' }"
                ><div>Blog</div></NuxtLink
              >
              <NuxtLink
                to="/admin/page-reviews"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-reviews' }"
                ><div>Reviews</div></NuxtLink
              >
              <NuxtLink
                to="/admin/page-signup"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-page-signup' }"
                ><div>Signup</div></NuxtLink
              >
            </li>
          </ul>
        </li>
        <li class="admin-v-item">
          <div
            @click="showSettings = !showSettings"
            class="admin-v-link"
            :class="{ active: route.name.includes('set') }"
          >
            <div
              class="admin-v-naviconwrap"
              :class="{ active: route.name.includes('set') }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2a0c82c1169c67982ae9_setting-line-white.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Settings</div>
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b57694c3db5a4d0ef66f6_caret-right%201.svg"
              loading="lazy"
              alt=""
              class="admin-drop-icon"
            />
          </div>
          <ul
            :class="{ show: showSettings }"
            role="list"
            class="admin-v-navlist settings inner transition"
          >
            <li class="admin-v-item inner">
              <NuxtLink
                to="/admin/set-emails"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-set-emails' }"
                ><div>Emails</div></NuxtLink
              >
              <NuxtLink
                to="/admin/set-application"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-set-application' }"
                ><div>Application</div></NuxtLink
              >
            </li>
          </ul>
        </li>
        <li @click="logout" class="admin-v-item">
          <div class="admin-v-link">
            <div class="admin-v-naviconwrap">
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2adacb1171dcc04917bd_music-switch-on.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Logout</div>
          </div>
        </li>
      </ul>
      <ul v-else role="list" class="admin-v-navlist">
        <li class="admin-v-item">
          <div
            @click="showSchools = !showSchools"
            class="admin-v-link"
            :class="{ active: route.name.includes('school') }"
          >
            <div
              class="admin-v-naviconwrap"
              :class="{ active: route.name.includes('school') }"
            >
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2b71128fda940b52e989_pages-icon%202.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Schools</div>
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b57694c3db5a4d0ef66f6_caret-right%201.svg"
              loading="lazy"
              alt=""
              class="admin-drop-icon"
            />
          </div>
          <ul
            role="list"
            class="admin-v-navlist inner schools transition"
            :class="{ show: showSchools }"
          >
            <li class="admin-v-item inner">
              <NuxtLink
                to="/admin/school-departments"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-departments' }"
                ><div>Departments</div></NuxtLink
              >
              <NuxtLink
                to="/admin/school-courses"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-courses' }"
                ><div>Courses</div></NuxtLink
              >
              <NuxtLink
                to="/admin/school-payments"
                class="admin-v-link inner"
                :class="{ active: route.name == 'admin-school-payments' }"
                ><div>Payments</div></NuxtLink
              >
            </li>
          </ul>
        </li>

        <li @click="logout" class="admin-v-item">
          <div class="admin-v-link">
            <div class="admin-v-naviconwrap">
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b2adacb1171dcc04917bd_music-switch-on.svg"
                loading="lazy"
                alt=""
                class="admin-nav-icons"
              />
            </div>
            <div>Logout</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPages: false,
      showSettings: false,
      showSchools: false,
    };
  },
  methods: {
    selectWallet(item) {
      if (item.balance <= 0) {
        return;
      }

      // wallets.forEach((el) => {
      //   el.checked = false;
      // });

      // wallets.forEach((obj) => {
      //   if (obj.id === item.id) {
      //     obj.checked = true;
      //   }
      // });
      const payload = {
        fromBalance: false,
        status: false,
        item: item,
      };
      this.$store.commit("dashboard/selectWallet", payload);

      currency.value = currencies.find((el) => el.id === item.currencyId);
      wallet.value = item;
    },

    toggleNavBar() {
      this.$store.commit("admin/toggleNavBar");
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },

  mounted() {
    // this.walletId = this.$route.query.walletId;
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    navState() {
      return this.$store.state.admin.navState;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    route() {
      return this.$route;
    },
  },
};
</script>

<style>
.admin-nav-wrapper,
.admin-v-navlist {
  transition: 0.3s all;
}
</style>
