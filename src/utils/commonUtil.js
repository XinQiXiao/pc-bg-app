/**
 * create at 10/24/18
 */

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

// 婚否转换
function transformMarry(num){
	let reMarry = '未知'
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

export {
	transformSex,
	transformMarry,
}