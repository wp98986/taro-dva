import { observable } from "mobx";

const aaaStore = observable({
  counter: 0,
  currentPage: 0,
  aaaStore() {
    this.counter++;
  },
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  },

  activePage(value) {
    this.currentPage = value;
  }
});
export default aaaStore;
