/**
 * create at 10/23/18
 */
import axios from 'axios'
import { Modal } from 'antd'

// const 
const baseApi = 'https://www.easy-mock.com/mock/5b6aeb1ca40bfb27425bbaee/mockapi'

class Axios{
	static ajax(options){
		// 展示 页面 loading
		let loading = document.getElementById('ajaxLoading')
		if(options.data && options.data.isShowLoading !== false){
			loading.style.display = 'block'
		}
		if(options.isMock){
			// 是mock数据，还是正式数据
		}
		// 打印 params
		console.log(`axios request url=${options.url}`)
		console.log('axios request data=>', options.data)
		return new Promise((resolve, reject)=>{
			axios({
				url: options.url,
				method: options.method || 'get',
				baseURL: baseApi,
				timeout: 20*1000,
				params: (options.data && options.data.params) || '',
			}).then((response)=>{
				// 页面 loading 关闭
				if(options.data && options.data.isShowLoading !== false){
					loading.style.display = 'none'
				}
				// 打印请求日志
				console.log('axios ajax response=>', response)
				if(response.status === 200){
					const res = response.data
					if(res.code === 0){
						resolve(res.data)
					} else {
						Modal.error({
							title: '提示',
							content: res.msg,
						})
					}
				} else {
					reject(response.data)
				}
			}).catch((e)=>{
				console.log('axios e=>', e)
				loading.style.display = 'none'
				Modal.error({
					title: '提示',
					content: e.message,
				})
			})
		})
	}
}

export default Axios