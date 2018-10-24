/**
 * create at 10/24/18
 */

/**
 * 自定义翻页
 * @param {*} data 翻页数据 固定格式 {page, page_size, total}
 * @param {*} callback 翻页function
 */
function tablePagination(data, callback){
	return {
		onChange: (current)=>{
			callback(current)
		},
		current: data.page,
		pageSize: data.page_size,
		total: data.total,
		showTotal: ()=>{
			return `共${data.total}条`
		},
		showQuickJumper: true,
	}
}

/**
 * 计算table width
 * @param {*} columns [table columns]
 */
function calculateTableWidth(columns){
	let retWidth = 0 
	for(const col of columns){
		retWidth += col.width
	}
	return retWidth
}

export {
	tablePagination,
	calculateTableWidth,
}