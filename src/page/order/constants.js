/**
 * create at 01/04/19
 */
// util
import { commonUtil } from '../../utils' 
import { consConfig } from '../../config'

// const
const { orderStatusConst } = consConfig

const orderColumns = [
	{
		title: '订单编码',
		dataIndex: 'order_code',
		width: 140
	},
	{
		title: '车辆编码',
		dataIndex: 'bike_code',
		width: 140
	},
	{
		title: '用户姓名',
		dataIndex: 'user_name',
		width: 120
	},
	{
		title: '手机号',
		dataIndex: 'mobile',
		width: 160
	},
	{
		title: '里程',
		dataIndex: 'distance',
		width: 80,
		render(target){
			return commonUtil.translateDistance(target)
		}
	},
	{
		title: '行程时长',
		dataIndex: 'total_time',
		width: 120,
		render(target){
			return (target/1000 + 's')
		}
	},
	{
		title: '状态',
		dataIndex: 'status',
		width: 150,
		render(target){
			return target < orderStatusConst.length ? orderStatusConst[target].name : ''
		}
	},
	{
		title: '开始时间',
		dataIndex: 'start_time',
		width: 200
	},
	{
		title: '结束时间',
		dataIndex: 'end_time',
		width: 200
	},
	{
		title: '订单金额',
		dataIndex: 'total_fee',
		width: 120,
		render(target){
			return commonUtil.translateToRMB(target)
		}
	},
	{
		title: '用户支付',
		dataIndex: 'user_pay',
		width: 100,
		render(target){
			return commonUtil.translateToRMB(target)
		}
	},
]

export {
	orderColumns as orderColumnsConst,
}