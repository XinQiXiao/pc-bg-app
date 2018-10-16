/**
 * create at 10/16/18
 */
import moment from 'moment'

function getCurrentTime(){
	return moment().format('YYYY-MM-DD HH:mm:ss')
}

export {
	getCurrentTime,
}