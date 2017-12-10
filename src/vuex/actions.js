import * as types from './mutation-types'

export const setLogin = ({ commit }, data) => {
    commit(types.SET_LOGIN,data)
}