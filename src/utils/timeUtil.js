/**
 * create at 10/16/18
 */
import moment from 'moment'

/**
 * 获取当前时间
 */
function getCurrentTime(){
	return moment().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 转换时间
 * @param {number} target
 */
function transformTime(target){
	return moment(target).format('YYYY-MM-DD HH:mm:ss')
}

export {
	getCurrentTime,
	transformTime,
}