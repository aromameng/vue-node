// import shop from '../../api/shop'

// initial state
const state = {
    count: 5
  }
  
  // getters
  const getters = {
    // allProducts: state => state.all,
    count: state => state.count
  }
  
  // actions
  const actions = {
    getCount ({ commit }) {
      // shop.getCount(products => {
      //   commit('setProducts', products)
      // })
      commit('setCount')
    }
  }
  
  // mutations
  const mutations = {
  //   setProducts (state, products) {
  //     state.all = products
  //   },
  
  //   decrementProductInventory (state, { id }) {
  //     const product = state.all.find(product => product.id === id)
  //     product.inventory--
  //   }
      setCount (state){
          state.count = state.count +4;
      }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }