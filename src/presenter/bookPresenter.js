/**
 * create at 12/26/18
 */
import { requestRemoteData } from './basePresenter'

// 获取所有图书类别
async function fetchCategoryAll({body}){
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
// 获取所有图书子类别
async function fetchChildrenCategorys({body}){
	try{
		let curOption = {
			url: 'book/getBookChildrenCategorys',
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

export {
	fetchCategoryAll,
	fetchChildrenCategorys,
	fetchbookAll,
	fetchAddBook,
}