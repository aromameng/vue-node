import * as types from './mutation-types'

export const state = {
	'loginStatus': JSON.parse(sessionStorage.getItem("loginStatus")) || false, //用户登录状态
    'userInfo': JSON.parse(sessionStorage.getItem("userInfo")) || null, //用户登录信息
    'chatUser':{}
}

export const mutations ={
    [types.SET_LOGIN](state,{status,userInfo}){
        // console.log('status',status)
        // console.log('userInfo',userInfo)
        state.loginStatus=status;
        state.userInfo = userInfo;
        sessionStorage.setItem("loginStatus", JSON.stringify(state.loginStatus))
		sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    [types.SET_CHAT_USER](state,userInfo){
        state.chatUser = userInfo;
    }
}

