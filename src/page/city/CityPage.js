/**
 * create at 10/26/18
 */
import React, { Component } from 'react'
import { Card, Button, Table, Modal, message, notification,} from 'antd'
import _ from 'lodash'

// components
import { OpenFormComponent, FilterFormComponent, } from './components'

// axios
import axiosPai from '../../axios'

// util
import { tableUtil } from '../../utils'

// const 
import { cityColumnsConst } from './constants'
const { tablePagination, calculateTableWidth } = tableUtil

const MOPEN = 'modal_open'
const MCLOSE = 'modal_close'

class CityPage extends Component{
	state = {
		dataSource: [],
		selectedRowKeys: [],
		selectedRows: [],
		pagination: null,
		modalType: '',
		modalShow: false,
	}
	openForm = null 
	filterForm = null
	params = {
		page: 1
	}

	// 计算table width
	colWidth = calculateTableWidth(cityColumnsConst)

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			let _this = this
			const ret = await axiosPai.ajax({
				url: 'city/list',
				data: {
					params: {
						...this.params
					},
					isShowLoading: true,
				}
			})
			if(ret && _.isArray(ret.list)){
				this.setState({
					dataSource: ret.list,
					selectedRowKeys: [], // 重置
					selectedRows: [],
					pagination: tablePagination(ret, (current)=>{
						_this.params.page = current 
						// 刷新
						_this._requestList()
					})
				})
			}
		}catch(e){
			console.log('_requestList e=>', e)
		}
	}

	_searchClick = ()=>{
		try{
			const {getFieldsValue, } = this.filterForm.props.form 
			const req = getFieldsValue()
			notification.info({
				message: '筛选内容',
				description: `city=${req.city} mode=${req.mode} 
				op_mode=${req.op_mode} auth_status=${req.auth_status}`
			})
		}catch(e){
			console.log('_searchClick e=>', e)
		}
	}
	_resetClick = ()=>{
		try{
			const {resetFields} = this.filterForm.props.form
			resetFields()
		}catch(e){
			console.log('_resetClick e=>', e)
		}
	}

	_btnClick = (type)=>{
		const {selectedRowKeys} = this.state
		if(type === MCLOSE && _.isArray(selectedRowKeys) && selectedRowKeys.length < 1){
			// 下线城市 至少选择一项
			message.warn(`至少选择一个城市`)
			return 
		}
		this.setState({
			modalType: type,
			modalShow: true
		})
	}
	_modalConfirm = async ()=>{
		const {modalType, selectedRowKeys} = this.state
		this.setState({
			modalShow: false
		})
		if(modalType === MOPEN){
			await this._requestOpen()
		} else {
			await this._requestClose()
		}
		// 刷新数据
		await this._requestList()
	}
	_requestOpen = async ()=>{
		try{
			const { getFieldsValue } = this.openForm.props.form
			const req = getFieldsValue()
			const ret = await axiosPai.ajax({
				url: 'city/open',
				data: {
					params: {
						...req,
					},
					isShowLoading: true,
				}
			})
			message.success(`${ret.result ? ret.result : ''}`)
		}catch(e){
			console.log('_requestOpen e=>', e)
			message.error(`开通城市 err${e.message ? e.message : '未知'}`)
		}
	}
	_requestClose = async ()=>{
		try{
			const { selectedRowKeys } = this.state
			const ret = await axiosPai.ajax({
				url: 'city/close',
				data: {
					params: {
						ids: selectedRowKeys
					},
					isShowLoading: true
				}
			})
			message.success(`${ret.result ? ret.result : ''}`)
		}catch(e){
			console.log('_requestClose e=>', e)
			message.error(`下线城市 err${e.message ? e.message : '未知'}`)
		}
	}

	render(){
		const cityColumns = _.cloneDeep(cityColumnsConst)
		const { 
			dataSource, pagination, selectedRowKeys, modalType, modalShow, selectedRows,
		} = this.state
		const rowCheckSelection = {
			type: 'checkbox',
			selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows)=>{
				this.setState({
					selectedRowKeys,
					selectedRows
				})
			}
		}
		const curModalTitle = modalType === MOPEN ? '开通城市' : '下线城市'
		const cityNames = selectedRows.map((item)=> item.name).join(', ')
		return (
			<div>
				<Card>
					<FilterFormComponent 
						searchPress={this._searchClick}
						resetPress={this._resetClick}
						wrappedComponentRef={(form)=> this.filterForm = form}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" onClick={()=> this._btnClick(MOPEN)} >开通城市</Button>
					<Button type="danger" onClick={()=> this._btnClick(MCLOSE)} style={{marginLeft: 10}}>下线城市</Button>
				</Card>
				<div className="content-wrap">
					<Table 
						bordered
						columns={cityColumns}
						dataSource={dataSource}
						pagination={pagination}
						rowKey={record => record.id}
						scroll={{x: this.colWidth}}
						rowSelection={rowCheckSelection}
					/>
				</div>
				<Modal 
					title={curModalTitle}
					visible={modalShow}
					onOk={this._modalConfirm}
					onCancel={()=> this.setState({modalShow: false})}
				>
					{
						modalType === MOPEN ? (
							<OpenFormComponent wrappedComponentRef={(form)=> this.openForm = form}/>
						) : (
							<p>{`下线 城市'${cityNames}'`}</p>
						)
					}
				</Modal>
			</div>
		)
	}
}

export default CityPage