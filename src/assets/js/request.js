import axios from 'axios'

/**
 * [request_get 封装get请求]
 * @param  {[string]} url [请求地址]
 * @return {[object]}     [promise]
 */
export function request_get(url) {
	return axios.get(url)
		.then((res) => {
			if(!res.data.code) return Promise.resolve(res.data);
			return Promise.reject(res.data.msg)
		})
}

/**
 * [request_post 封装post请求]
 * @param  {[string]} url  [请求地址]
 * @param  {[object]} data [数据]
 * @return {[object]}      [promise]
 */
export function request_post(url, data) {
	return axios.post(url, data)
		.then((res) => {
			if(!res.data.code) return Promise.resolve(res.data);
			return Promise.reject(res.data.msg)
		})
}

/**
 * [request_put 封装put请求]
 * @param  {[string]} url  [请求地址]
 * @return {[object]}      [promise]
 */
export function request_put(url) {
	return axios.put(url)
		.then((res) => {
			if(!res.data.code) return Promise.resolve(res.data);
			return Promise.reject(res.data.msg)
		})
}

/**
 * [request_delete 封装delete请求]
 * @param  {[string]} url  [请求地址]
 * @return {[object]}      [promise]
 */
export function request_delete(url) {
	return axios.delete(url)
		.then((res) => {
			if(!res.data.code) return Promise.resolve(res.data);
			return Promise.reject(res.data.msg)
		})
}
