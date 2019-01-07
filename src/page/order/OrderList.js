/**
 * create at 01/04/19
 */
import React, { Component } from 'react'
import { Card, Button, message, Modal, } from 'antd'
import _ from 'lodash'

// components
import { FilterForm, CommonTable } from '../../components'
import EndForm from './components'

// config
import { consConfig } from '../../config'

// presenter
import { orderPresenters } from '../../presenter'

// util
import { tableUtil } from '../../utils'

import { orderColumnsConst, } from './constants'

// const 
const { formFilterType, formBtnType, citysConst, orderStatusConst, } = consConfig

const { tablePagination, calculateTableWidth } = tableUtil

const { fetchOrderList, fetchEndOrderInfo, fetchFinishOrder, } = orderPresenters

const OrderFilters = [
	{
		type: formFilterType.SELECT,
		field: 'city_id',
		label: '城市',
		placeholder: '请选择城市',
		initialValue: citysConst[0].id,
		itemStyle: null,
		innerStyle: {width: 80},
		list: citysConst,
		rules: [],
	},
	{
		type: formFilterType.QUERY_TIME,
		label: '订单时间',
		placeholder: '选择时间',
		itemStyle: null,
	},
	{
		type: formFilterType.SELECT,
		field: 'status',
		label: '订单状态',
		placeholder: '请选择状态',
		initialValue: orderStatusConst[0].id,
		itemStyle: null,
		innerStyle: {width: 120},
		list: orderStatusConst,
		rules: [],
	},
]

class OrderPage extends Component{
	state = {
		orderList: [],
		pagination: null,
		selectedRowKeys: [],
		selectedRows: [],
		showModal: false,
	}
	params = {
		page: 1
	}
	endOrderInfo = null
	colWidth = calculateTableWidth(orderColumnsConst)

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			const _this = this
			const ret = await fetchOrderList({params: this.params})
			this.setState({
				orderList: _.isArray(ret.list) ? ret.list : [],
				pagination: tablePagination(ret, (current)=>{
					_this.params.page = current
					// refresh
					_this._requestList()
				})
			})
		}catch(e){
			message.error(`获取订单列表失败 err=${e.message}`)
		}
	}

	_filterQueryClick = ({code, formValues})=> {
		this._requestList()
	}
	_filterResetClick = ({code})=>{
		this._requestList()
	}

	_orderInfoClick = ()=> {
		try{
			const {selectedRowKeys} = this.state
			if(selectedRowKeys.length<1){
				message.info(`至少选择一个订单`)
				return 
			}
			// 通过新窗口打开
			window.open(`/#/common/order/detail/${selectedRowKeys[0]}`, '_blank')
			// 通过 hash 路由跳转
			// window.location.href = `/#/common/order/detail/${selectedRowKeys[0]}`
		}catch(e){
			message.error(`获取订单详情失败 err=${e.message}`)
		}
	}
	_orderEndClick = async ()=>{
		const {selectedRowKeys} = this.state
		if(selectedRowKeys.length<1){
			message.info(`至少选择一个订单`)
			return 
		}
		await this._requestEndInfo({id: selectedRowKeys[0]})
		this.setState({
			showModal: true
		})
	}
	_requestEndInfo = async ({id})=>{
		try{
			const ret = await fetchEndOrderInfo({params: {order_id: id}})
			if(_.isNil(ret))
				throw new Error('数据格式错误')
			this.endOrderInfo = ret
		}catch(e){
			message.error(`获取订单信息失败 err=${e.message}`)
		}
	}

	_modalOkClick = async ()=>{
		await this._requestFinishOrder()
		// 数据还原
		this.endOrderInfo = null
		this.setState({
			showModal: false
		})
		// 刷新数据
		await this._requestList()
	}
	_requestFinishOrder = async ()=>{
		try{
			const { selectedRowKeys } = this.state
			const ret = await fetchFinishOrder({params: {order_id: selectedRowKeys[0]}})
			if(_.isNil(ret))
				throw new Error(`数据格式错误`)
			message.success(`${ret.info}`)
		}catch(e){
			message.error(`结束订单失败 err=${e.message}`)
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
			orderList, selectedRowKeys, selectedRows, pagination, showModal,
		} = this.state
		const columns = _.cloneDeep(orderColumnsConst)
		return (
			<div>
				<Card>
					<FilterForm 
						formList={OrderFilters}
						options={[
							{
								btnType: 'primary',
								type: formBtnType.QUERY,
								title: '查询',
								style: {marginLeft: 10},
								optionItemPress: this._filterQueryClick
							},
							{
								type: formBtnType.RESET,
								title: '重置',
								style: {marginLeft: 20},
								optionItemPress: this._filterResetClick
							},
						]}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" onClick={this._orderInfoClick}>订单详情</Button>
					<Button type="primary" style={{marginLeft: 20}} onClick={this._orderEndClick}>结束订单</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={columns}
						dataSource={orderList}
						pagination={pagination}
						rowSelection="radio"
						selectedRowKeys={selectedRowKeys}
						selectedRows={selectedRows}
						scroll={{x: this.colWidth, y: 500}}
						updateSelectedItem={this._tableItemClick}
					/>
				</div>
				<Modal visible={showModal} title="结束订单" 
					onOk={this._modalOkClick}
					onCancel={()=> this.setState({showModal: false})}
				>
					<EndForm itemData={this.endOrderInfo}/>
				</Modal>
			</div>
		)
	}
}

export default OrderPage