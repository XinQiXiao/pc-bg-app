/**
 * create at 10/24/18
 */
import React from 'react'
import {Button, Badge} from 'antd'

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

const columnsLongConst = [
	{
		title: 'id',
		dataIndex: 'id',
		fixed: 'left',
		width: 80,
	},
	{
		title: '用户姓名',
		dataIndex: 'userName',
		fixed: 'left',
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
		title: '婚否',
		dataIndex: 'isMarried',
		width: 80,
		render(isMarried){
			return commonUtil.transformMarry(isMarried)
		}
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
	{
		title: '就寝时间',
		width: 80,
		dataIndex: 'sleepTime',
	},
	{
		title: '省份',
		width: 80,
		dataIndex: 'province',
	},
	{
		title: '城市',
		width: 80,
		dataIndex: 'city',
		fixed: 'right',
	},
	{
		title: '区域',
		width: 80,
		dataIndex: 'area',
		fixed: 'right',
	},
]

const columnsSortConst = [
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
		sorter: (a, b)=> a.age - b.age,
		defaultSortOrder: 'ascend',
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
]

const columnsHandleConst = [
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
		sorter: (a, b)=> a.age - b.age,
		defaultSortOrder: 'ascend',
	},
	{
		title: '状态',
		dataIndex: 'state',
		width: 120,
		render(state){
			const config = {
				'1': <Badge status="default" text={stateCons[0]}/>,
				'2': <Badge status="error" text={stateCons[1]}/>,
				'3': <Badge status="processing" text={stateCons[2]}/>,
				'4': <Badge status="success" text={stateCons[3]}/>,
				'5': <Badge status="warning" text={stateCons[4]}/>,
			}
			return config[state]
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
		title: '操作',
		width: 80,
		render(){
			return (
				<Button size="small" onClick={()=> null}>删除</Button>
			)
		}
	},
]

export {
	columnsConst,
	columnsLongConst,
	columnsSortConst,
	columnsHandleConst,
}