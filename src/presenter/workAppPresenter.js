/**
 * create at 02/21/19
 */
import { requestRemoteData } from './basePresenter'

// 获取员工
async function fetchEmployeesAll({body}){
	try{
		let curOption = {
			url: 'auth/getEmployeesList',
			isMock: false,
			method: 'POST',
			body,
			data: {
				isShowLoading: true,
			}
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}
// 创建员工
async function fetchEmployeeCreate({body}){
	try{
		let curOption = {
			url: 'auth/createEmployee',
			isMock: false,
			method: 'POST',
			body,
			data: {
				isShowLoading: false,
			}
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}
// 修改员工
async function fetchEmployeeModify({body}){
	try{
		let curOption = {
			url: 'auth/modifyEmployee',
			isMock: false,
			method: 'POST',
			body,
			data: {
				isShowLoading: false,
			}
		}
		const ret = await requestRemoteData({options: curOption})
		return ret
	}catch(e){
		throw e
	}
}

export {
	fetchEmployeesAll,
	fetchEmployeeCreate,
	fetchEmployeeModify,
}