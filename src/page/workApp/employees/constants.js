/**
 * create at 02/22/19
 */
import moment from 'moment'

const employeeStatus = [
	{id: 0, name: '冻结'},
	{id: 1, name: '激活'},
	{id: 10, name: '待激活'},
]
const employeeCity = [
	{id: 1, name: '北京'},
	{id: 2, name: '上海'}
]

function _getArrValue(key, source){
	let resultName = ''
	source.forEach((item, index)=>{
		if(item.id === key)
			resultName = item.name
	})
	return resultName
}

const conColumns = [
	{
		title: 'ID',
		dataIndex: 'id',
		width: 60,
	},
	{
		title: '登录名',
		dataIndex: 'login_name',
		width: 120,
	},
	{
		title: '员工名',
		dataIndex: 'display_name',
		width: 120,
	},
	{
		title: '邮箱',
		dataIndex: 'email',
		width: 180,
	},
	{
		title: '电话',
		dataIndex: 'mobile',
		width: 180,
	},
	{
		title: '创建时间',
		dataIndex: 'created_at',
		width: 180,
		render: (target)=> target === 0 ? '-' : moment(target).format('YYYY-MM-DD hh:mm')
	},
	{
		title: '状态',
		dataIndex: 'status',
		width: 100,
		render: (target)=> _getArrValue(target, employeeStatus)
	},
	{
		title: '所属城市',
		dataIndex: 'city_id',
		width: 120,
		render: (target)=> _getArrValue(target, employeeCity),
	},
]

export {
	employeeStatus,
	employeeCity,
	conColumns,
}