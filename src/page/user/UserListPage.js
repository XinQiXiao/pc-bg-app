/**
 * create at 11/02/18
 */
import React, { Component } from 'react'
import { Card, Button, message, notification, Modal } from 'antd'
import _ from 'lodash'

// components
import { FilterForm, CommonTable } from '../../components'
import { UserFormComponent } from './components'

// config
import { consConfig } from '../../config'

// presenter
import { userPresenters } from '../../presenter'

// util
import { tableUtil } from '../../utils'

// const 
import {userColumnsConst} from './constants'

const CREATE = 'handle_create'
const EDIT = 'handle_edit'
const INFO = 'handle_info'
const REMOVE = 'handle_remove'

const { fetchUserList, fetchUserEdit, } = userPresenters

const { formFilterType, formBtnType, } = consConfig
const { tablePagination, calculateTableWidth } = tableUtil

const FORM_LIST = [
	{
		type: formFilterType.INPUT,
		field: 'tel',
		label: '手机号',
		placeholder: '请输入手机号',
		rules: [
			{
				required: true,
				message: '请输入手机号',
			},
			{
				pattern: /^1\d{10}$/,
				message: '请输入正确格式的手机号'
			}
		]
	},
	{
		type: formFilterType.INPUT,
		field: 'password',
		label: '密码',
		placeholder: '请输入密码',
		itemStyle: {marginLeft: 20},
		rules: [
			{
				required: true,
				message: '请输入密码',
			},
			{
				min: 6,
				message: '长度不能少于6位'
			},
			{
				max: 12,
				message: '长度不能多于12位'
			}
		]
	},
]

class UserListComponent extends Component{
	state = {
		userList: [],
		pagination: null,
		selectedRowKeys: [],
		selectedRows: [],
		showModal: false,
	}
	params = {
		page: 1
	}
	colWidth = calculateTableWidth(userColumnsConst)
	modalTitle = ''
	modalType = ''
	innerForm = ''

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			const ret = await fetchUserList({params: this.params})
			let _this = this 
			this.setState({
				userList: _.isArray(ret.list) ? ret.list : [],
				pagination: tablePagination(ret, (current)=>{
					_this.params.page = current
					// refresh
					_this._requestList()
				})
			})
		}catch(e){
			message.error(`err=${e.message}`)
		}
	}

	_loginClick = ({code, formValues})=>{
		notification.success({
			message: '登录成功',
			description: `tel=${formValues.tel} password=${formValues.password}`
		})
	}

	_btnHandleClick = ({type, title} = {})=>{
		const { selectedRowKeys } = this.state
		if(type !== CREATE && selectedRowKeys.length < 1){
			message.warn(`至少选择一个员工`)
			return
		}
		// 处理移除
		if(type === REMOVE){
			Modal.confirm({
				title: '提示',
				content: '确认冻结员工',
				onCancel: ()=> null,
				onOk: ()=> this._handleRequest({type: REMOVE}),
			})
			return 
		} 
		this.modalTitle = title
		this.modalType = type
		this.setState({
			showModal: true
		})
		
	}
	_modalOKClick = ()=>{
		const {validateFields} = this.innerForm.props.form
		validateFields((err, values)=>{
			if(!err){
				this.setState({
					showModal: false
				})
				this._handleRequest({type: this.modalType})
			}
		})
	}
	_modalCancelClick = ()=>{
		const {resetFields} = this.innerForm.props.form
		// form clear
		resetFields()
		this.setState({showModal: false})
	}
	_handleRequest = async ({type}={})=>{
		try{
			const { getFieldsValue } = this.innerForm.props.form
			const req = getFieldsValue()
			const curUrl = type === CREATE ? 'user/add' : (
				type === EDIT ?	'user/edit' : (
					type === REMOVE ? 'user/remove' : ''
				)
			)
			const ret = await fetchUserEdit({params: req, url: curUrl})
			message.success(`${ret.result ? ret.result : ''}`)
		}catch(e){
			message.error(`e={e.message}`)
		}
	}

	_tableItemClick = (selectedRowKeys, selectedRows)=>{
		this.setState({
			selectedRowKeys,
			selectedRows,
		})
	}

	render(){
		const { 
			userList, pagination, selectedRowKeys, selectedRows, showModal,
		} = this.state
		const columns = _.cloneDeep(userColumnsConst)
		let footer = {}
		if(this.modalType === INFO){
			footer = {
				footer: null
			}
		}
		return(
			<div>
				<Card>
					<FilterForm 
						formList={FORM_LIST}
						options={[
							{
								btnType: 'primary',
								style: {marginLeft: 20},
								title: '登录',
								type: formBtnType.QUERY,
								optionItemPress: this._loginClick
							}
						]}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" icon="plus" 
						onClick={()=> this._btnHandleClick({type: CREATE, title: '创建员工'})}
					>创建员工</Button>
					<Button type="primary" icon="edit" style={{marginLeft: 20}}
						onClick={()=> this._btnHandleClick({type: EDIT, title: '编辑员工'})}
					>编辑员工</Button>
					<Button type="primary" icon="info-circle" style={{marginLeft: 20}}
						onClick={()=> this._btnHandleClick({type: INFO, title: '员工详情'})}
					>员工详情</Button>
					<Button type="danger" icon="delete" style={{marginLeft: 20}}
						onClick={()=> this._btnHandleClick({type: REMOVE, title: '冻结员工'})}
					>冻结员工</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={columns}
						dataSource={userList}
						pagination={pagination}
						rowSelection="radio"
						selectedRowKeys={selectedRowKeys}
						selectedRows={selectedRows}
						scroll={{x: this.colWidth, y: 500}}
						updateSelectedItem={this._tableItemClick}
					/>
				</div>
				<Modal
					visible={showModal}
					title={this.modalTitle}
					onOk={()=> this._modalOKClick()}
					onCancel={this._modalCancelClick}
					{...footer}
				>
					<UserFormComponent 
						editAble={this.modalType === INFO ? false : true}
						itemData={(this.modalType === EDIT || this.modalType === INFO ) ? 
							(selectedRows.length > 0 ? selectedRows[0] : null)
							: null
						}
						wrappedComponentRef={(form)=> this.innerForm = form}
					/>
				</Modal>
			</div>
		)
	}
}

export default UserListComponent