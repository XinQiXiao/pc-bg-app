/**
 * create at 02/21/19
 */
import React, {Component} from 'react'
import { Card, message, Button} from 'antd'
import _ from 'lodash'

// components
import { CommonTable } from '../../../components'

// presenter
import { workAppPresenters } from '../../../presenter'

// util
import { tableUtil } from '../../../utils'

import { conColumns } from './constants'

// const
const { 
	fetchEmployeesAll, fetchEmployeeCreate,
} = workAppPresenters

const { calculateTableWidth, } = tableUtil

class UserAcountComponent extends Component{
	state = {
		employeeSource: [],
		employeeRowKeys: [],
		employeeRows: [],
	}

	colWidth = calculateTableWidth(conColumns)

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const ret = await fetchEmployeesAll({body: {}})
			if(_.isNil(ret))
				throw new Error('获取数据失败')

			// 获取数据  重置list状态
			this.setState({
				employeeSource: ret,
				employeeRowKeys: [],
				employeeRows: [],
			})
		}catch(e){
			message.error(`获取数据fail err=${e.message}`)
		}
	}

	_createEmployeeClick = async()=>{
		try{
			let body = {
				login_name: 'test3',
				display_name: '张三',
				email: 'test@xx.com',
				password: '123456',
				mobile: '15012344321',
				status: 1,
				city_id: 1
			}
			const ret = await fetchEmployeeCreate({body})
			if(_.isNil(ret))
				throw new Error('数据格式不正确')
		}catch(e){
			message.error(`添加员工失败 err=${e.message}`)
		}
	}

	render(){
		const employeeColumns = _.cloneDeep(conColumns)
		const { employeeSource, employeeRowKeys, employeeRows, } = this.state
		return (
			<div>
				<Card >
					<Button type="primary" icon="plus" onClick={this._createEmployeeClick}>增加成员</Button>
					<Button style={{marginLeft: 20}} type="primary" icon="edit" onClick={()=> null}>编辑成员</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={employeeColumns}
						dataSource={employeeSource}
						rowSelection="radio"
						selectedRowKeys={employeeRowKeys}
						selectedRows={employeeRows}
						scroll={{x: this.colWidth, y:800}}
						updateSelectedItem={(selectedRowKeys, selectedRows)=>{
							this.setState({
								employeeRowKeys: selectedRowKeys,
								employeeRows: selectedRows,
							})
						}}
					/>
				</div>
			</div>
		)
	}
} 

export default UserAcountComponent