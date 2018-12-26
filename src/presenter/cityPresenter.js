/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取城市列表
async function fetchCityList({params}){
	try{
		let curOption = {
			url: 'city/list',
			isMock: true,
			data: {
				params: {
					...params
				},
				isShowLoading: true,
			},
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}

// 开通城市
async function fetchCityOpen({params}){
	try{
		let curOption = {
			url: 'city/open',
			isMock: true,
			data: {
				params: {
					...params
				},
				isShowLoading: true,
			},
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}

// 关闭城市
async function fetchCityClose({params}){
	try{
		let curOption = {
			url: 'city/close',
			isMock: true,
			data: {
				params: {
					...params
				},
				isShowLoading: true,
			},
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}

export {
	fetchCityList,
	fetchCityOpen,
	fetchCityClose,
}