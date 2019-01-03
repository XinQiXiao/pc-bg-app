/**
 * create at 12/28/18
 */
import moment from 'moment'

const columnsConst = [
	{
		title: '类别ID',
		dataIndex: 'id',
		width: 60,
	},
	{
		title: '图书类别',
		dataIndex: 'category',
		width: 100,
	},
	{
		title: '父类别ID',
		dataIndex: 'parent_id',
		width: 60,
	},
	{
		title: '状态',
		dataIndex: 'status',
		width: 80,
		render: (target)=> target === 1 ? '上架' : '下架'
	},
	{
		title: '创建时间',
		dataIndex: 'create_time',
		width: 240,
		render: (target)=> target === 0 ? '-' : moment(target).format('YYYY-MM-DD hh:mm')
	},
	{
		title: '上次更新时间',
		dataIndex: 'update_time',
		width: 240,
		render: (target)=> target === 0 ? '-' : moment(target).format('YYYY-MM-DD hh:mm')
	},
	{
		title: '上次下架时间',
		dataIndex: 'destroy_time',
		width: 240,
		render: (target)=> target === 0 ? '-' : moment(target).format('YYYY-MM-DD hh:mm')
	},
]

export {
	columnsConst,
}