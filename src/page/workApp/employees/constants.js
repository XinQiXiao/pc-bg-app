/**
 * create at 02/22/19
 */
import moment from 'moment'

const employeeStatus = {
	'0': '冻结',
	'1': '激活',
	'10': '待激活',
}
const employeeCity = {
	'1': '北京',
	'2': '上海',
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
		render: (target)=> employeeStatus[target]
	},
	{
		title: '所属城市',
		dataIndex: 'city_id',
		width: 120,
		render: (target)=> employeeCity[target],
	},
]

export {
	conColumns
}