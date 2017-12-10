import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import * as actions from './actions'
import * as getters from './getters'
import {mutations,state} from './mutations'

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})