class Store {
  constructor() {
    this.state = this.resetState();
  }
  resetState() {
    return {
      employer: {
        _id: null,
        name: '',
        tlg_chatId: '',
        status: null,
        mmId: null,
        managId: null
      },
      candidate: {
        candidateChatId: null
      }
    };
  }
  setToState(objValue) {
    this.state = { ...this.state, ...objValue };
  }
  getEmployerData(key) {
    return this.state.employer[key];
  }
  getCandidateData(key) {
    return this.state.candidate[key];
  }
  getState() {
    return this.state;
  }
}

module.exports = Store;
