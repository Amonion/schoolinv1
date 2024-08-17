import dashboard from "./dashboard";

export const state = () => ({
  navState: false,
  fileURL: "",
  confirmMsg: "",
  confirmState: true,
  hasLoaded: false,

  banners: [],
  bannerLength: 0,

  payments: [],
  tutorials: [],
  partnership: [],
  competitions: [],
  competitors: [],
  reviews: [],
  blogs: [],
  blog: "",
  company: "",
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },

  getUserInfo(state) {
    return state.auth.user;
  },
};

export const mutations = {
  SET_URL(state, URL) {
    state.fileURL = URL;
  },

  setUser(state, data) {
    state.auth.user = data;
  },

  toggleNavState(state) {
    state.navState = !state.navState;
  },

  hideNav(state) {
    state.navState = false;
  },

  setBanners(state, result) {
    state.banners = result.data;
    state.bannerLength = result.totalLength;
  },

  setPayments(state, result) {
    state.payments = result.data;
  },

  setCompetitions(state, result) {
    state.competitions = result.data;
  },

  setTutorials(state, result) {
    state.tutorials = result.data;
  },

  setPartnership(state, result) {
    state.partnership = result.data;
  },

  setReviews(state, result) {
    state.reviews = result.data;
  },

  setABlog(state, data) {
    state.blog = data;
  },

  setBlogs(state, data) {
    state.blogs = data.data;
  },

  setCompany(state, data) {
    state.company = data.data[0];
  },

  setCompetitors(state, result) {
    state.competitors = result.data;
    state.hasLoaded = true;
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

  async getBlogs({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setBlogs", result.data);
  },

  async getUsers({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setUsers", result.data);
  },

  async getPartnership({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPartnership", result.data);
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

  async getCurrencies({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCurrencies", result.data);
  },

  async getManagers({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setManagers", result.data);
  },

  async getCompany({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    console.log(result, result.response);

    // commit("setCompany", result.data);
  },

  async getPlans({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPlans", result.data);
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

  async getAbout({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setAbout", result.data);
  },

  async getPayments({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPayments", result.data);
  },

  async getTutorials({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setTutorials", result.data);
  },

  async getCompetitions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompetitions", result.data);
  },

  async getCompetitors({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompetitors", result.data);
  },

  async getNotificationState({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setNotificationState", result.data);
  },

  async getActiveDeposits({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);

    commit("setActiveDeposits", result.data);
  },

  async getTotalActiveDeposits({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);

    commit("setTotalActiveDeposits", result.data);
  },

  async initializeDetails({ commit, dispatch }) {
    // await dispatch("getReviews", `/reviews/?limit=3&page=1&sort=-time`);
    await dispatch("getCompany", `/company`);
    // await dispatch("getManagers", `/manager/?limit=10&page=1`);
    // await dispatch("getWallets", `/wallets/?limit=10&page=1`);
    // await dispatch("getCurrencies", `/currency/?limit=10&page=1`);
    // await dispatch("getReferrals", `/referrals/?limit=10&page=1&sort=-time`);
    // await dispatch("getFaq", `/faq/?limit=10&page=1&sort=-time`);
    // await dispatch("getTerms", `/terms/?limit=10&page=1&sort=-time`);
    // await dispatch("getBanners", `/banners/?limit=10&page=1&sort=-time`);
    // await dispatch(
    //   "getPartnership",
    //   `/blog/?limit=4&page=1&sort=time&category=Partnership&status=1`
    // );
    // await dispatch(
    //   "getTutorials",
    //   `/blog/?limit=4&page=1&sort=time&category=Tutorial&status=1`
    // );
    // await dispatch(
    //   "getBlogs",
    //   `/blog/?limit=30&page=1&sort=-time&blogType=Blog&status=1`
    // );
    // await dispatch(
    //   "getCompetitions",
    //   `/competitions/?limit=10&page=1&sort=-time`
    // );
    // await dispatch(
    //   "getCompetitors",
    //   `/competitions/competitors/?limit=10&page=1&sort=-time`
    // );
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
