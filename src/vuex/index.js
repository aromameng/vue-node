import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import * as actions from './actions'
import * as getters from './getters'
import {mutations,state} from './mutations'

import test from './modules/test';
import book from './modules/book';

export default new Vuex.Store({
    modules: {
        book:{...book,namespaced: true},
        test:{...test,namespaced: true},
        index:{
            state,
            getters,
            mutations,
            actions
        }
    }
})