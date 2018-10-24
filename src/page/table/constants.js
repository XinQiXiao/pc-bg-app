/**
 * create at 10/24/18
 */

// util
import { commonUtil } from '../../utils'

// config 
import { consConfig } from '../../config'

// const 
const { stateCons, interestCons, } = consConfig

const columnsConst = [
	{
		title: 'id',
		dataIndex: 'id',
		width: 80,
	},
	{
		title: '用户姓名',
		dataIndex: 'userName',
		width: 80,
	},
	{
		title: '性别',
		dataIndex: 'sex',
		width: 80,
		render(sex){
			return commonUtil.transformSex(sex)
		}
	},
	{
		title: '年龄',
		dataIndex: 'age',
		width: 80,
	},
	{
		title: '状态',
		dataIndex: 'state',
		width: 120,
		render(state){
			return state <= stateCons.length ? stateCons[state-1] : ''
		}
	},
	{
		title: '爱好',
		dataIndex: 'interest',
		width: 100,
		render(interest){
			return interest <= interestCons.length ? interestCons[interest-1] : ''
		}
	},
	{
		title: '生日',
		dataIndex: 'birthday',
		width: 160,
	},
	{
		title: '地址',
		dataIndex: 'address',
		width: 140,
	},
	{
		title: '早起时间',
		dataIndex: 'getUpTime',
		width: 80,
	},
]

export {
	columnsConst
}