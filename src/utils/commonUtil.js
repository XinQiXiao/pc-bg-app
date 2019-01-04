/**
 * create at 10/24/18
 */
/**
 * 性别
 */
// const sexCons = [
// 	{id: 1, name: '男'},
// 	{id: 2, name: '女'},
// 	{id: 0, name: '未知'},
// ]
// 性别转换
function transformSex(num){
	let reSex = '未知'
	switch(num){
		case 1:
			reSex = '男'
			break
		case 2: 
			reSex = '女'
			break 
		default:
			break
	}
	return reSex
}

// /**
//  * 婚否
//  */
// const marryCons = [
// 	{id: 0, name: '未婚'},
// 	{id: 1, name: '已婚'},
// ]
// 婚否转换
function transformMarry(num){
	let reMarry = '未婚'
	switch(num){
		case 0:
			reMarry = '未婚'
			break
		case 1: 
			reMarry = '已婚'
			break 
		default:
			break
	}
	return reMarry
}

/**
 *  money translate
 */
function translateToRMB(target){
	let moneyNum = Number.parseInt(target/100, 10).toFixed(2)
	return '￥' + moneyNum
}

/**
 * translate distance
 */
function translateDistance(target){
	return target/1000 + 'km'
}

export {
	transformSex,
	transformMarry,
	translateToRMB,
	translateDistance,
}