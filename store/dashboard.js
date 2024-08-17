export const state = () => ({
  competitions: [],
  competitionLength: 0,

  gridBlogs: [],
  blogs: [],
  blogLength: 0,

  transactions: [],
  transactionLength: 0,

  notifications: [],
  notificationLength: 0,

  countries: [],
  states: [],
  lgas: [],
  schools: [],
  payments: [],
  schoolPayments: [],
  faculties: [],
  departments: [],
  comments: [],
  replies: [],
  posts: [],

  postId: "",
  commentId: "",
  newsId: "",
  postType: "",
  userBio: "",
  userSchool: "",
  userCourses: [],
  userCourses2: [],
  userOrigin: "",
  visibility: "",
  earningLength: 0,
  firstSemester: [],
  secondSemester: [],

  currencies: [],
  currencyLength: 0,
  selectedCurrency: "",

  company: "",
  review: "",
  bio: "",
  inputState: false,
  showReply: false,
  inputType: "comment",
  modalMsg: "",
  showModal: false,
  modalError: false,
  modalWarning: false,
  modalSuccess: false,
  onRequest: false,
  action: "",
  dataType: "",
  url: "",
  data: "",

  fileURL: "",
  route: "",

  navState: false,
});

function setCourse(course) {
  const courses = [];
  for (let i = 0; i < course.length; i++) {
    const el = course[i];
    el.score = 0;
    el.grade = "F";
    el.point = 0;
    el.cGrade = 0;

    courses.push(el);
  }
  return courses;
}

export const mutations = {
  TOGGLE_ADMIN_NAV(state) {
    state.adminNavState = !state.adminNavState;
  },

  toggleNav(state) {
    state.navState = !state.navState;
  },

  toggleInput(state, type) {
    state.inputType = type;
    state.inputState = !state.inputState;
  },

  toggleReply(state, type) {
    state.inputType = type;
    state.showReply = !state.showReply;
  },

  showInput(state) {
    state.inputState = !state.inputState;
  },

  setPostId(state, id) {
    state.postId = id;
  },

  setCommentId(state, id) {
    state.commentId = id;
  },

  setComments(state, comments) {
    state.comments = comments;
  },

  setReplies(state, replies) {
    state.replies = replies;
  },

  setPosts(state, posts) {
    state.posts = posts;
  },

  setInput(state, payload) {
    state.postId = payload.id;
    state.postType = payload.type;
    state.inputType = payload.type;
  },

  hideInput(state) {
    state.inputState = false;
  },

  hideNav(state) {
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

  toggleOnRequest(state) {
    state.onRequest = !state.onRequest;
  },

  setPayments(state, result) {
    state.payments = result.data;
  },

  setSchoolPayments(state, result) {
    state.schoolPayments = result.data;
  },

  showModal(state, payload) {
    state.modalMsg = payload.msg;
    state.modalWarning = payload.warning;
    state.modalError = payload.error;
    state.modalSuccess = payload.success;
    state.action = payload.action;
    state.dataType = payload.dataType;
    state.url = payload.url;
    state.data = payload.data;
    state.showModal = true;
  },

  responseModal(state, payload) {
    state.showModal = true;
    state.isModalSuccess = payload.isSuccess;
    state.isError = payload.error;
    state.onRequest = false;
  },

  setRoute(state, route) {
    state.route = route;
  },

  hideModal(state) {
    state.showModal = false;
  },

  setUserBio(state, result) {
    state.userBio = result;
  },

  setVisibility(state, result) {
    state.visibility = result;
  },

  setFirstSemester(state, result) {
    state.firstSemester = result.data.data;
  },

  setSecondSemester(state, result) {
    state.secondSemester = result.data.data;
  },

  setUserSchool(state, result) {
    state.userSchool = result;
  },

  setCountries(state, result) {
    state.countries = result.data;
  },
  setStates(state, result) {
    state.states = result.data;
  },

  setFaculties(state, result) {
    state.faculties = result.data;
  },

  setDepartments(state, result) {
    state.departments = result.data;
  },

  setLgas(state, result) {
    state.lgas = result.data;
  },
  setSchools(state, result) {
    state.schools = result.data;
  },

  setSchool(state, result) {
    state.userSchool = result.data;
  },

  setCourses(state, result) {
    state.userCourses = setCourse(result);
  },

  setCourses2(state, result) {
    state.userCourses = setCourse(result.data);
  },

  setOrigin(state, result) {
    state.userOrigin = result.data;
  },

  setReferrals(state, result) {
    state.referrals = result.data;
    state.referralLength = result.totalLength;
  },

  setNotifications(state, result) {
    state.notifications = result.data;
    state.notificationLength = result.totalLength;
  },

  setEarnings(state, result) {
    state.earnings = result.data;
    state.earningLength = result.totalLength;
  },

  setCurrencies(state, result) {
    function unCheckData(data) {
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        el.checked = false;
      }
      return data;
    }

    state.currencies = unCheckData(result.data);
    state.currencyLength = result.totalLength;
  },

  setReview(state, result) {
    state.review = result.data[0];
  },

  setCompany(state, result) {
    state.company = result.data[0];
  },

  setTransactions(state, result) {
    state.transactions = result.data;
    state.transactionLength = result.totalLength;
  },

  setBio(state, result) {
    state.bio = result.data[0];
  },

  setGridBlogs(state, result) {
    state.gridBlogs = result.data;
  },

  setBlogs(state, result) {
    state.blogs = result.data;
    state.blogLength = result.totalLength;
  },

  setCompetitions(state, result) {
    state.competitions = result.data;
    state.competitionLength = result.totalLength;
  },

  selectPlan(state, item) {
    state.selectedPlan = item;
  },
};

export const actions = {
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

  async getEarnings({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setEarnings", result.data);
  },

  async getUser({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    dispatch("setUser", result.data.user, { root: true });
  },

  async getReferrals({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReferrals", result.data);
  },

  async getCurrencies({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCurrencies", result.data);
  },

  async getReview({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setReview", result.data);
  },

  async getCompany({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompany", result.data);
  },

  async getCompetitions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCompetitions", result.data);
  },

  async getNotifications({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setNotifications", result.data);
  },

  async getTransactions({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setTransactions", result.data);
  },

  async getBio({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setBio", result.data);
  },

  async getBlogs({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setBlogs", result.data);
  },

  async getGridBlogs({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setGridBlogs", result.data);
  },

  async getCountries({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setCountries", result.data);
  },

  async getStates({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setStates", result.data);
  },
  async getLgas({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setLgas", result.data);
  },

  async getPayments({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setPayments", result.data);
  },

  async getPosts({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    console.log(result);
    commit("setPosts", result.data.data);
  },

  async getSchoolPayments({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    commit("setSchoolPayments", result.data);
  },

  async getSchool({ commit, dispatch }, url) {
    const result = await dispatch("makeGET", url);
    // console.log(result);
    commit("setSchool", result);
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

  async initializeUserDetails({ commit, dispatch }, user) {
    await dispatch("getPayments", `/payments/?limit=40&page=1&level=1`);
    await dispatch("getBio", `/users/bios/?limit=40&page=1&userId=${user.id}`);
    await dispatch("getSchool", `/users/school/?limit=40&page=1&id=${user.id}`);
    await dispatch("getPosts", `/posts/?limit=40&page=1&sort=-time`);
    await dispatch("getCompetitions", `/competitions/?limit=10&page=1`);
    await dispatch("getGridBlogs", `/blog/?limit=4&page=1&display=grid`);
    await dispatch("getBlogs", `/blog/?limit=3&page=1&display=main`);
    await dispatch("getCompany", `/company`);
    await dispatch(
      "getCountries",
      `/places/?limit=200&page=1&sort=country&distinct=country`
    );
    await dispatch(
      "getTransactions",
      `/transactions/?limit=10&page=1&sort=-time&username=${user?.username}&level=1`
    );
    // await dispatch(
    //   "getSchool",
    //   `/schools/?limit=10&page=1&sort=-time&username=${user?.username}&level=1`
    // );

    // await dispatch("getManagers", `/manager/?limit=10&page=1`);
    // await dispatch("getCurrencies", `/currency/?limit=10&page=1`);
    // await dispatch(
    //   "getNotifications",
    //   `/notifications/?limit=10&page=1&sort=-time&username=${user?.username}`
    // );
    // await dispatch(
    //   "getReferrals",
    //   `/referrals/?limit=10&page=1&sort=-time&username=${user?.username}&referralType=${user.referralType}`
    // );
    // await dispatch(
    //   "getEarnings",
    //   `/transactions/earnings/?limit=10&page=1&sort=-time&username=${user?.username}`
    // );
  },

  // async nuxtServerInit() {
  //   console.log("getPlans");
  // },
};
