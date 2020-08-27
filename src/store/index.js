import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodslist: [],
  },
  mutations: {
    setgoodslist(state, newlist) {
      state.goodslist = newlist
    },
  },
  getters: {
    shopcarlist(state) {
      let arr = []
      for (let obj of state.goodslist) {
        for (let child of obj.foods) {
          if (child.num > 0) {
            arr.push(child)
          }
        }
      }
      return arr
    }
  }
})