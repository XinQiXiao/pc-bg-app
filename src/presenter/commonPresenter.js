/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取UI table list 数据
async function fetchTableList({params}){
	try{
		let curOption = {
			url: 'table/list',
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
// 获取UI table high list 数据
async function fetchTableHightList({params}){
	try{
		let curOption = {
			url: 'table/high/list',
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
	fetchTableList,
	fetchTableHightList
}