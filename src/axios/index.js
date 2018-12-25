/**
 * create at 10/23/18
 */
import axios from 'axios'
import { Modal } from 'antd'

// const 
const easyMockAPi = 'https://www.easy-mock.com/mock/5b6aeb1ca40bfb27425bbaee/mockapi'
const localApi = 'http://localhost:8095/pc_api/pc'

class Axios{
	static ajax(options){
		// baseUrlType <number> 0 easy mock 1 localhost
		const { baseUrlType = 0 } = options
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
		console.log('axios request body=>', options.body)
		return new Promise((resolve, reject)=>{
			axios({
				url: options.url,
				method: options.method || 'get',
				baseURL: baseUrlType === 0 ? easyMockAPi : localApi,
				timeout: 20*1000,
				params: (options.data && options.data.params) || '',
				headers: {'content-type': 'application/x-www-form-urlencoded'},
				data: options.body || {}
			}).then((response)=>{
				// 页面 loading 关闭
				if(options.data && options.data.isShowLoading !== false){
					loading.style.display = 'none'
				}
				// 打印请求日志
				console.log('axios ajax response=>', response)
				if(response.status !== 200)
					reject(response.data)
				const res = response.data
				if(res.code === 0)
					return resolve(res.data)
				let codeStr = res.code.toString()
				let errTitle = ''
				if(/^4/.test(codeStr))
					errTitle = '请求参数错误'
				if(/^5/.test(codeStr))
					errTitle = '服务器错误'
				Modal.error({
					title: errTitle,
					content: `code=${codeStr} errMsg=${res.msg || res.message}`
				})
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