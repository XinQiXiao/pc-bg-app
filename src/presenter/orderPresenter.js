/**
 * create at 01/04/19
 */
import { requestRemoteData } from './basePresenter'

// 获取订单列表
async function fetchOrderList({params}){
	try{
		let curOption = {
			url: 'order/list',
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
// 获取要结束的订单信息
async function fetchEndOrderInfo({params}){
	try{
		let curOption = {
			url: 'order/ebike_info',
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
// 获取要结束的订单
async function fetchFinishOrder({params}){
	try{
		let curOption = {
			url: 'order/finish_order',
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
	fetchOrderList,
	fetchEndOrderInfo,
	fetchFinishOrder,
}