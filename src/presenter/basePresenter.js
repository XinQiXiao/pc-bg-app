/**
 * create at 12/26/18
 * 处理 环境变量 
 */

import apiAxios from '../axios'
import {globalConfig} from '../config'
import _ from 'lodash'

const { isDev, mockUrl, devUrl, prdUrl, } = globalConfig

// dev 还是 prd
const apiUrl = isDev ? devUrl: prdUrl

async function requestRemoteData({options}){
	try{
		let curOptions = _.cloneDeep(options)
		// console.log('requestRemoteData options=>', options)
		// 是否 mock
		curOptions.baseURL = curOptions.isMock ? mockUrl : apiUrl
		let ret = await apiAxios.ajax(curOptions)
		return ret
	}catch(e){
		throw e
	}
}

export {
	requestRemoteData
}