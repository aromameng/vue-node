// import shop from '../../api/shop'

// initial state
const state = {
  count: 3
}

// getters
const getters = {
  count: state => state.count
}

// actions
const actions = {
  getCount ({ commit }) {
    commit('setCount')
  }
}

// mutations
const mutations = {
    setCount (state){
        state.count = state.count + 1;
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}