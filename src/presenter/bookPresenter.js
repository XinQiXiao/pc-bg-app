/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取图书类别 type 0 全部 type 1 父类别 type 2 子类别
async function fetchBookCategorys({body}){
	try{
		let curOption = {
			url: 'book/getBookCategorys',
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
// 添加类别
async function fetchAddCategory({body}){
	try{
		let curOption = {
			url: 'book/addCategory',
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
// 类别 上架，下架
async function fetchHandleCategory({body}){
	try{
		let curOption = {
			url: 'book/handleCategory',
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

// 获取所有图书
async function fetchbookAll({body}){
	try{
		let curOption = {
			url: 'book/getAllBookInfo',
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
// 添加图书
async function fetchAddBook({body}){
	try{
		let curOption = {
			url: 'book/addBook',
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
// 修改图书信息
async function fetchUpdateBook({body}){
	try{
		let curOption = {
			url: 'book/modifyBookInfo',
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
// 移除图书信息
async function fetchRemoveBook({body}){
	try{
		let curOption = {
			url: 'book/removeBookInfo',
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

export {
	fetchBookCategorys,
	fetchAddCategory,
	fetchHandleCategory,
	fetchbookAll,
	fetchAddBook,
	fetchUpdateBook,
	fetchRemoveBook,
}