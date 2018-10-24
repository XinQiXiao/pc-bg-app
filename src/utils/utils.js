/**
 * create at 10/24/18
 */

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

export {
	transformSex,
}