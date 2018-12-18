/**
 * create at 11/02/18
 */
// utils
import {commonUtil} from '../../utils'

// const 
import { consConfig } from '../../config'

const { transformSex, transformMarry, } = commonUtil
const { stateCons, interestCons, } = consConfig

const userColumns = [
	{
		title: 'id',
		dataIndex: 'id',
		width: 60
	},
	{
		title: '用户名',
		dataIndex: 'username',
		width: 100
	},
	{
		title: '性别',
		dataIndex: 'sex',
		width: 80,
		render(target){
			return transformSex(target)
		}
	},
	{
		title: '手机号',
		dataIndex: 'tel',
		width: 160
	},
	{
		title: '状态',
		dataIndex: 'state',
		width: 180,
		render(target){
			return stateCons[target]
		}
	},
	{
		title: '兴趣',
		dataIndex: 'interest',
		width: 140,
		render(target){
			return interestCons[target]
		}
	},
	{
		title: '婚否',
		dataIndex: 'isMarried',
		width: 100,
		render(target){
			return transformMarry(target)
		}
	},
	{
		title: '生日',
		dataIndex: 'birthday',
		width: 200,
	},
	{
		title: '地址',
		dataIndex: 'address',
		width: 180,
	},
	{
		title: '注册时间',
		dataIndex: 'registertime',
		width: 200,
	},
]

export {
	userColumns as userColumnsConst
}