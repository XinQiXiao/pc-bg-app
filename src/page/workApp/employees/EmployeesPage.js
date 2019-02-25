/**
 * create at 02/21/19
 */
import React, {Component} from 'react'
import { Card, message, Button, Modal,} from 'antd'
import _ from 'lodash'

// components
import { CommonTable } from '../../../components'
import EmployeeForm from './components'

// presenter
import { workAppPresenters } from '../../../presenter'

// util
import { tableUtil } from '../../../utils'

import { conColumns } from './constants'

// const
const { 
	fetchEmployeesAll, fetchEmployeeCreate, fetchEmployeeModify,
} = workAppPresenters

const { calculateTableWidth, } = tableUtil

const CREATE = 'employee_create'
const EDIT = 'employee_edit'

class UserAcountComponent extends Component{
	state = {
		employeeSource: [],
		employeeRowKeys: [],
		employeeRows: [],
		modalShow: false
	}

	colWidth = calculateTableWidth(conColumns)
	employeeForm = ''
	modalTitle = ''
	modalType = ''

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

	_createEmployeeClick = ()=>{
		this.modalTitle = '创建员工'
		this.modalType = CREATE
		this.setState({
			modalShow: true
		})
	}
	_editEmployeeClick = ()=>{
		if(this.state.employeeRowKeys.length === 0){
			message.info(`请至少选择一个员工进行编辑`)
			return 
		}
		this.modalTitle = '编辑员工'
		this.modalType = EDIT
		this.setState({
			modalShow: true
		})
	}
	_modalOkClick = async ()=>{
		const {validateFields, resetFields} = this.employeeForm.props.form
		validateFields((err, values)=>{
			if(!err){
				const retBool = this._requestOptionEmployee(values)
				if(!retBool)
					return
				this.setState({
					modalShow: false
				})
				resetFields()
			}
		})
	}
	_requestOptionEmployee = async (values)=>{
		try{
			let ret = null
			if(this.modalType === CREATE){
				ret = await fetchEmployeeCreate({body: {...values}})
				if(_.isNil(ret))
					throw new Error('数据格式不正确')
			}
			if(this.modalType === EDIT){
				let body = {
					id: this.state.employeeRowKeys[0],
					...values,
				}
				ret = await fetchEmployeeModify({body})
				if(!_.isArray(ret) || (_.isArray(ret) && ret.length === 0))
					throw new Error('操作失败')
			}
			// 刷新数据
			await this._requestData()
			return true
		}catch(e){
			let showTitle = this.modalTitle
			message.error(`${showTitle}失败 err=${e.message}`)
			return false
		}
	}

	render(){
		const employeeColumns = _.cloneDeep(conColumns)
		const { employeeSource, employeeRowKeys, employeeRows, modalShow, } = this.state
		return (
			<div>
				<Card >
					<Button type="primary" icon="plus" onClick={this._createEmployeeClick}>增加员工</Button>
					<Button style={{marginLeft: 20}} type="primary" icon="edit" onClick={this._editEmployeeClick}>编辑员工</Button>
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
				<Modal visible={modalShow} 
					title={this.modalTitle}
					onOk={this._modalOkClick}
					onCancel={()=> this.setState({modalShow: false})}
				>
					<EmployeeForm 
						editType={this.modalType === EDIT ? 'edit' : 'create'}
						employeeData={this.modalType === EDIT ? employeeRows[0] : null}
						wrappedComponentRef={(form)=> this.employeeForm = form}
					/>
				</Modal>
			</div>
		)
	}
} 

export default UserAcountComponent