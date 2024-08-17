export const state = () => ({
  competitions: [],
  competitionLength: 0,
  selectedCompetitions: [],
  isAllCompetitionsSelected: false,

  countries: [],
  countryLength: 0,

  states: [],
  stateLength: 0,

  lgas: [],
  lgaLength: 0,

  transactions: [],
  transactionLength: 0,
  isAllTransactionSelected: false,
  selectedTransactions: [],

  history: [],
  historyLength: 0,
  isAllHistorySelected: false,
  selectedHistory: [],

  activeDeposits: [],
  activeDepositLength: 0,

  managers: [],
  managerLength: 0,

  referralLength: 0,
  referrals: 0,

  emails: [],
  selectedEmails: [],
  emailLength: 0,
  isAllEmailSelected: false,

  referrals: [],
  selectedReferrals: [],
  referralLength: 0,
  isAllReferralsSelected: false,

  users: [],
  selectedUsers: [],
  userLength: 0,
  isAllUsersSelected: false,

  reviews: [],
  selectedReviews: [],
  reviewLength: 0,
  isAllReviewSelected: false,

  earnings: [],
  earningLength: 0,

  banners: [],
  bannerLength: 0,
  selectedBanners: [],
  isAllBannerSelected: false,

  faq: [],
  faqLength: 0,
  selectedFaq: [],
  isAllFaqSelected: false,

  terms: [],
  termsLength: 0,
  selectedTerms: [],
  isAllTermsSelected: false,

  blogs: [],
  blogLength: 0,
  selectedBlog: [],
  isAllBlogSelected: false,

  staffs: [],
  staffLength: 0,
  selectedStaffs: [],
  isAllStaffSelected: false,

  notifications: [],
  notificationLength: 0,
  selectedNotifications: [],
  isAllNotificationSelected: false,

  schools: [],
  schoolLength: 0,
  selectedSchools: [],
  isAllSchoolsSelected: false,

  faculties: [],
  facultyLength: 0,
  selectedFaculties: [],
  isAllFacultiesSelected: false,

  payments: [],
  paymentLength: 0,
  selectedPayments: [],
  isAllPaymentsSelected: false,

  departments: [],
  departmentLength: 0,
  selectedDepartments: [],
  isAllDepartmentsSelected: false,

  selectedCourses: [],
  courses: [],
  isAllCoursesSelected: false,
  courseLength: 0,

  isNotification: false,

  company: "",

  modalMsg: "",
  showModal: false,
  isModalError: false,
  isModalWarning: false,
  isModalSuccess: false,

  modalAction: "",
  modalURL: "",
  modalItem: "",
  fileURL: "",

  navState: false,
});

function unCheckData(data) {
  if (data == undefined) {
    return data;
  }
  for (let i = 0; i < data.length; i++) {
    let el = data[i];
    el.checked = false;
  }
  return data;
}

export const mutations = {
  TOGGLE_ADMIN_NAV(state) {
    state.adminNavState = !state.adminNavState;
  },

  toggleNavBar(state) {
    state.navState = !state.navState;
  },

  hideNavBar(state) {
    state.navState = false;
  },

  HIDE_DASHBOARD_NAV(state) {
    state.dashboardNavState = false;
  },

  HIDE_NAV(state) {
    state.adminNavState = false;
  },

  SET_URL(state, URL) {
    state.fileURL = URL;
  },

  SHOW_CONFIRMATION(state, { msg, status }) {
    state.confirmMsg = msg;
    state.confirmState = status;
  },

  handleCheckedItems(state, payload) {
    const foundIndex = payload.selectedItems.findIndex(
      (obj) => obj.id === payload.item.id
    );

    if (foundIndex === -1) {
      payload.item.checked = true;
      payload.selectedItems.push(payload.item);
    } else {
      payload.item.checked = false;
      payload.selectedItems.splice(foundIndex, 1);
    }

    switch (payload.type) {
      case "payment-settings":
        this.isAllPaymentsSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "faculty-settings":
        this.isAllFacultiesSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "department-settings":
        this.isAllDepartmentsSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "course-settings":
        this.isAllCoursesSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "email-settings":
        this.isAllEmailsSelected =
          payload.items.length == state.selectedEmails.length ? true : false;
        break;
      case "banner-settings":
        this.isAllBannerSelected =
          payload.items.length == state.selectedBanners.length ? true : false;
        break;
      case "review-settings":
        this.isAllReviewSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "user-settings":
        state.isAllUsersSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "blog-settings":
        state.isAllBlogSelected =
          payload.items.length == state.selectedBlog.length ? true : false;
        break;
      case "school-settings":
        state.isAllSchoolsSelected =
          payload.items.length == state.selectedSchools.length ? true : false;
        break;
      case "notification-settings":
        state.isAllNotificationSelected =
          payload.items.length == state.selectedNotifications.length
            ? true
            : false;
        break;
      default:
        break;
    }
  },

  toggleSelectAllItems(state, payload) {
    function unCheckData(data, status) {
      if (data == undefined) {
        return data;
      }
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = status;
      }
      return data;
    }
    switch (payload) {
      case "class-settings":
        this.isAllClassSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "email-settings":
        this.isAllEmailsSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "banner-settings":
        this.isAllBannerSelected =
          payload.items.length == payload.selectedItems.length ? true : false;
        break;
      case "review-settings":
        state.isAllReviewSelected = !state.isAllReviewSelected;
        state.selectedReview = state.isAllReviewSelected
          ? JSON.parse(JSON.stringify(state.reviews))
          : [];
        state.reviews = unCheckData(state.reviews, state.isAllReviewSelected);
        break;
      case "user-settings":
        state.isAllUsersSelected = !state.isAllUsersSelected;
        state.selectedUsers = state.isAllUsersSelected ? state.users : [];
        state.users = unCheckData(state.users, state.isAllUsersSelected);
        break;
      case "blog-settings":
        state.isAllBlogSelected = !state.isAllBlogSelected;
        state.selectedBlog = state.isAllBlogSelected
          ? JSON.parse(JSON.stringify(state.blogs))
          : [];
        state.blogs = unCheckData(state.blogs, state.isAllBlogSelected);
        break;
      case "competition-settings":
        state.isAllCompetitionsSelected = !state.isAllCompetitionsSelected;
        state.selectedCompetitions = state.isAllCompetitionsSelected
          ? JSON.parse(JSON.stringify(state.blogs))
          : [];
        state.competitions = unCheckData(
          state.competitions,
          state.isAllCompetitionsSelected
        );
        break;
      case "transaction-settings":
        state.isAllTransactionSelected = !state.isAllTransactionSelected;
        state.selectedTransactions = state.isAllTransactionSelected
          ? JSON.parse(JSON.stringify(state.transactions))
          : [];
        state.transactions = unCheckData(
          state.transactions,
          state.isAllTransactionSelected
        );
        break;
      case "notification-settings":
        state.isAllNotificationSelected = !state.isAllNotificationSelected;
        state.selectedNotifications = state.isAllNotificationSelected
          ? JSON.parse(JSON.stringify(state.notifications))
          : [];
        state.notifications = unCheckData(
          state.notifications,
          state.isAllNotificationSelected
        );
        break;
      default:
        break;
    }
  },

  setSelectedCurrency(state, payload) {
    state.selectedCurrency = payload;
  },

  selectWallet(state, payload) {
    state.wallets.forEach((el) => {
      el.checked = false;
    });
    state.currencies.forEach((el) => {
      el.checked = false;
    });

    if (payload.status == true) {
      state.wallets.forEach((obj) => {
        if (obj.id === payload.item.id) {
          obj.checked = true;
        }
      });
    } else {
      state.currencies.forEach((obj) => {
        if (obj.id === payload.item.id) {
          obj.checked = true;
        }
      });
    }
  },

  showModal(state, payload) {
    state.modalMsg = payload.msg;
    state.isModalWarning = payload.isWarning;
    state.isModalError = payload.isError;
    state.isModalSuccess = payload.isSuccess;
    state.modalAction = payload.action;
    state.modalURL = payload.url;
    state.modalTalbe = payload.table;
    state.modalItem = payload.item;
    state.showModal = true;
  },

  hideModal(state) {
    state.showModal = false;
    state.isModalError = false;
    state.isModalWarning = true;
    state.isModalSuccess = false;
  },

  unCheckData(state, data) {
    if (data == undefined) {
      return data;
    }
    for (let i = 0; i < data.length; i++) {
      let el = data[i];
      el.checked = false;
    }
    return data;
  },

  setActiveDeposits(state, result) {
    state.activeDeposits = result.data;
    state.activeDepositLength = result.totalLength;
  },

  setTotalActiveDeposits(state, result) {
    function sum(data) {
      let amount = 0;
      for (let i = 0; i < data.length; i++) {
        amount += data[i].amount;
      }
      return amount;
    }

    state.totalActiveDeposits = sum(result.data);
  },

  setUsers(state, result) {
    state.users = unCheckData(result.data);
    state.userLength = result.totalLength;
  },

  setReviews(state, result) {
    state.reviews = unCheckData(result.data);
    state.reviewLength = result.totalLength;
  },

  setReferrals(state, result) {
    state.referrals = unCheckData(result.data);
    state.referralLength = result.totalLength;
  },

  setBlog(state, result) {
    state.blogs = unCheckData(result.data);
    state.blogLength = result.totalLength;
  },

  clearBlog(state) {
    state.selectedBlog = [];
    state.isAllBlogSelected = false;
  },

  setEarnings(state, result) {
    function unCheckData(data) {
      if (data == undefined) {
        return data;
      }
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }
    state.earnings = unCheckData(result.data);
    state.earningLength = result.totalLength;
  },

  setHistory(state, result) {
    function unCheckData(data) {
      if (data == undefined) {
        return data;
      }
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }
    state.history = unCheckData(result.data);
    state.historyLength = result.totalLength;
  },

  setSchools(state, result) {
    function unCheckData(data) {
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }

    state.schools = unCheckData(result.data);
    state.schoolLength = result.totalLength;
    state.selectedSchools = [];
    state.isAllSchoolsSelected = false;
  },

  setManagers(state, result) {
    function unCheckData(data) {
      if (data == undefined) {
        return data;
      }
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }
    state.managers = unCheckData(result.data);
    state.managerLength = result.totalLength;
  },

  setCompany(state, result) {
    state.company = result.data[0];
  },

  setTransactions(state, result) {
    function unCheckData(data) {
      if (data == undefined) {
        return data;
      }
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }
    state.transactions = unCheckData(result.data);
    state.transactionLength = result.totalLength;
  },

  setWallets(state, result) {
    state.wallets = unCheckData(result.data);
    state.walletLength = result.totalLength;
  },

  setStaffs(state, result) {
    state.staffs = unCheckData(result.data);
    state.staffLength = result.totalLength;
  },

  setCourses(state, result) {
    state.courses = unCheckData(result.data);
    state.courseLength = result.totalLength;
    state.isAllCoursesSelected = false;
    state.selectedCourses = [];
  },

  setFaq(state, result) {
    state.faq = unCheckData(result.data);
    state.faqLength = result.totalLength;
  },

  setTerms(state, result) {
    state.terms = unCheckData(result.data);
    state.termsLength = result.totalLength;
  },

  setBanners(state, result) {
    state.banners = unCheckData(result.data);
    state.bannerLength = result.totalLength;
  },

  setCountries(state, result) {
    state.countries = result.data;
    state.countryLength = result.totalLength;
  },

  setStates(state, result) {
    state.states = result.data;
    state.stateLength = result.totalLength;
  },

  setPayments(state, result) {
    state.payments = unCheckData(result.data);
    state.paymentLength = result.totalLength;
    state.isAllPaymentsSelected = false;
    state.selectedPayments = [];
  },

  setFaculties(state, result) {
    state.faculties = unCheckData(result.data);
    state.facultyLength = result.totalLength;
    state.isAllFacultiesSelected = false;
    state.selectedFaculties = [];
  },

  setDepartments(state, result) {
    state.departments = unCheckData(result.data);
    state.departmentLength = result.totalLength;
    state.isAllDepartmentsSelected = false;
    state.selectedDepartments = [];
  },

  setLGAs(state, result) {
    state.lgas = result.data;
    state.lgaLength = result.totalLength;
  },

  setNotificationState(state, result) {
    if (result.totalLength > 0) {
      state.isNotification = true;
    } else {
      state.isNotification = false;
    }
  },

  setNotifications(state, result) {
    function checkNotification(data) {
      data.forEach((el) => {
        if (el.adminStatus == 0) {
          state.isNotification = true;
        }
      });
      return data;
    }

    state.notifications = checkNotification(unCheckData(result.data));
    state.notificationLength = result.totalLength;
  },

  setEmails(state, result) {
    state.emails = unCheckData(result.data);
    state.emailLength = result.totalLength;
    state.isAllEmailSelected = false;
    state.selectedEmails = [];
  },

  setCompetitions(state, result) {
    state.competitions = unCheckData(result.data);
    state.competitionLength = result.totalLength;
    state.isAllCompetitionsSelected = false;
    state.selectedCompetitions = [];
  },

  selectPlan(state, item) {
    state.selectedPlan = item;
  },
};

export const actions = {
  async makeDELETE({ commit }, url) {
    try {
      const result = await this.$axios.delete(url);
      return result;
    } catch (err) {
      console.log(err.response);
    }
  },

  async makeGET({ commit }, url) {
    try {
      const result = await this.$axios.get(url);
      return result;
    } catch (err) {
      console.log(err.response);
    }
  },

  async makePOST({ commit }, payload) {
    try {
      const result = await this.$axios.post(payload.url, payload.form);
      return result;
    } catch (err) {
      return err;
    }
  },

  async getReviews({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReviews", result.data);
  },

  async getStaffs({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setStaffs", result.data);
  },

  async getUsers({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setUsers", result.data);
  },

  async getEarnings({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setEarnings", result.data);
  },

  async getHistory({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setHistory", result.data);
  },

  async getReferrals({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReferrals", result.data);
  },

  async getFaq({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setFaq", result.data);
  },

  async getEmails({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setEmails", result.data);
  },

  async getSchools({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setSchools", result.data);
  },

  async getFaculties({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setFaculties", result.data);
  },
  async getDepartments({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setDepartments", result.data);
  },

  async getCourses({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCourses", result.data);
  },

  async getCompany({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompany", result.data);
  },

  async getCompetitions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompetitions", result.data);
  },

  async getTerms({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setTerms", result.data);
  },

  async getTransactions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setTransactions", result.data);
  },

  async getWallets({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setWallets", result.data);
  },

  async getReferrals({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReferrals", result.data);
  },

  async getBlog({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setBlog", result.data);
  },

  async getBanners({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setBanners", result.data);
  },

  async getCountries({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCountries", result.data);
  },

  async getNotifications({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setNotifications", result.data);
  },

  async getNotificationState({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setNotificationState", result.data);
  },

  async getStates({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setStates", result.data);
  },

  async getPayments({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPayments", result.data);
  },

  async getLGAs({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setLGAs", result.data);
  },

  async getTotalActiveDeposits({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);

    commit("setTotalActiveDeposits", result.data);
  },

  async initializeAdminDetails({ commit, dispatch }, user) {
    await dispatch("getCountries", `/places/?limit=10&page=1&distinct=country`);
    await dispatch(
      "getUsers",
      `/users/?limit=10&page=1&sort=dateCreated&status=User`
    );
    await dispatch("getCompetitions", `/competitions/?limit=10&page=1`);
    await dispatch("getCompany", `/company`);
    await dispatch("getEmails", `/emails/?limit=10&page=1`);
    // await dispatch("getWallets", `/wallets/?limit=10&page=1`);
    await dispatch("getSchools", `/schools/?limit=10&page=1`);
    // await dispatch("getReferrals", `/referrals/?limit=10&page=1&sort=-time`);
    // await dispatch("getFaq", `/faq/?limit=10&page=1&sort=-time`);
    // await dispatch("getTerms", `/terms/?limit=10&page=1&sort=-time`);
    await dispatch("getBanners", `/banners/?limit=10&page=1&sort=-time`);
    await dispatch("getBlog", `/blog/?limit=30&page=1&sort=-time`);
    // await dispatch(
    //   "getNotifications",
    //   `/notifications/?limit=10&page=1&sort=-time`
    // );
    // await dispatch("getEmails", `/emails/?limit=10&page=1&sort=-time`);
    // await dispatch(
    //   "getHistory",
    //   `/transactions/?limit=10&page=1&status=1&sort=-time`
    // );
    // await dispatch(
    //   "getTransactions",
    //   `/transactions/?limit=10&page=1&status=0&sort=-time`
    // );
    // await dispatch(
    //   "getEarnings",
    //   `/transactions/earnings/?limit=10&page=1&sort=-time`
    // );
    // await dispatch(
    //   "getActiveDeposits",
    //   `/transactions/active-deposits/?limit=10&page=1&sort=-time`
    // );
    // await dispatch(
    //   "getTotalActiveDeposits",
    //   `/transactions/active-deposits/?limit=200&page=1&sort=-time`
    // );
  },
};
