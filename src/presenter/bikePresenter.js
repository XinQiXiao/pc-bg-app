/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取车辆地图信息
async function fetchBikeList({params}){
	try{
		let curOption = {
			url: 'map/bikeList',
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
	fetchBikeList
}