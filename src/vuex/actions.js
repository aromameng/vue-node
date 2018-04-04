import * as types from './mutation-types'

export const setLogin = ({ commit }, data) => {
    commit(types.SET_LOGIN,data)
}

export const setChatUser = ({ commit },data) =>{
    commit(types.SET_CHAT_USER,data)
}