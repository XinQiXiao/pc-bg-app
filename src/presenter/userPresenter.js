/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取用户列表
async function fetchUserList({params}){
	try{
		let curOption = {
			url: 'user/list',
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

// 添加/修改/删除用户
async function fetchUserEdit({params, url}){
	try{
		let curOption = {
			url: url,
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
	fetchUserList,
	fetchUserEdit,
}