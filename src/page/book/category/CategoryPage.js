/**
 * create at 12/28/18
 */
import React, { Component } from 'react'
import { Card, message, Button, Modal, } from 'antd'
import _ from 'lodash'

// components
import { CommonTable } from '../../../components'
import CategoryForm from './components'

// util
import { tableUtil } from '../../../utils'

// presenter
import { bookPresenters } from '../../../presenter'

// const
import { columnsConst, } from './constants'

const { calculateTableWidth, } = tableUtil
const { 
	fetchBookCategorys, fetchAddCategory, fetchPutAwayCategory, fetchSoldOutCategory
} = bookPresenters

const ADD = 'options_add'
const PUT_AWAY = 'options_put_away'
const SOLD_OUT = 'options_sold_out'

class CategoryPage extends Component{
	state = {
		categorysSource: [],
		categoryRowKeys: [],
		categoryRows: [],
		showModal: false,
	}
	colWidth = calculateTableWidth(columnsConst)
	categoryForm = ''
	parentCategorys = []

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const rets = await Promise.all([
				fetchBookCategorys({body: {type: 1}}),
				fetchBookCategorys({body: {type: 0}})
			])
			if(!_.isArray(rets))
				throw new Error('获取数据失败')
			this.parentCategorys = rets[0]
			// 获取数据  重置一些状态
			this.setState({
				categorysSource: rets[1],
				categoryRowKeys: [],
				categoryRows: [],
			})
		}catch(e){
			message.error(`获取数据fail err=${e.message}`)
		}
	}

	_categoryEdit = (type)=>{
		const { categoryRowKeys, categoryRows } = this.state
		if(type !== ADD && categoryRowKeys.length <= 0){
			message.warn(`请至少选择一条类别信息进行编辑`)
			return
		}
		// 处理增加
		if(type === ADD){
			this.setState({
				showModal: true
			})
			return 
		}
		const curItem = categoryRows[0]
		if(curItem.parent_id === 0){
			// 不能下架和上架父类别
			message.error(`父类别暂时不支持上架和下架操作`)
			return 
		}
		// 已经上架 或者已经下架的不能再次上架或者再次下架
		if(curItem.status === 1 && type === PUT_AWAY){
			message.error(`该类别已上架`)
			return
		}
		if(curItem.status === 0 && type === SOLD_OUT){
			message.error(`该类别已下架`)
			return
		}
		let typeContent = type === PUT_AWAY ? '上' : '下'
		Modal.confirm({
			title: `确定${typeContent}架该类别?`,
			content: `${typeContent}架该类别同时${typeContent}架该类别图书`,
			onCancel: ()=> null,
			onOk: ()=> this._requestHandleCategory(type)
		})
		return 
	}
	_requestHandleCategory = async (cType)=>{
		try{
			const {categoryRowKeys} = this.state
			let body = {
				category_id: (_.isArray(categoryRowKeys) && categoryRowKeys.length > 0) ? categoryRowKeys[0] : null
			}
			let ret = null 
			if(cType === PUT_AWAY){
				ret = await fetchPutAwayCategory({body})
			} else {
				ret = await fetchSoldOutCategory({body})
			}
			if(_.isNil(ret))
				throw new Error(`数据格式不正确`)
			message.success(`操作类别成功`)
			// 刷新数据
			await this._requestData()
		}catch(e){
			message.error(`操作类别失败 err=${e.message}`)
		}
	}

	_modalOk = ()=>{
		const {validateFields, resetFields} = this.categoryForm.props.form
		validateFields((err, values)=>{
			if(!err){
				const retBool = this._requestAddCategory(values)
				if(!retBool)
					return
				this.setState({
					showModal: false
				})
				resetFields()
				// 刷新数据
				this._requestData()
			}
		})
	}
	_modalCancel = ()=>{
		const {resetFields} = this.categoryForm.props.form
		// form clear
		resetFields()
		this.setState({
			showModal: false
		})
	}
	_requestAddCategory = async (values)=>{
		try{
			let body = {
				...values,
			}
			const ret = await fetchAddCategory({body})
			if(_.isNil(ret))
				throw new Error('数据格式错误')
			message.success(`添加类别成功`)
			return true
		}catch(e){
			message.error(`添加类别失败 err=${e.message}`)
			return false
		}
	}

	render(){
		const categoryColumns = _.cloneDeep(columnsConst)
		const {categorysSource, categoryRowKeys, categoryRows, showModal} = this.state 
		return (
			<div>
				<Card>
					<Button style={{marginLeft: 20}} type="primary" icon="plus" 
						onClick={()=> this._categoryEdit(ADD)}
					>增加</Button>
					<Button style={{marginLeft: 20}} type="default" icon="plus-circle" 
						onClick={()=> this._categoryEdit(PUT_AWAY)}
					>上架</Button>
					<Button style={{marginLeft: 20}} type="danger" icon="close-circle"
						onClick={()=> this._categoryEdit(SOLD_OUT)}
					>下架</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={categoryColumns}
						dataSource={categorysSource}
						scroll={{x: this.colWidth, y:600}}
						rowSelection='radio'
						selectedRowKeys={categoryRowKeys}
						selectedRows={categoryRows}
						updateSelectedItem={(selectedRowKeys, selectedRows)=>{
							this.setState({
								categoryRowKeys: selectedRowKeys,
								categoryRows: selectedRows,
							})
						}}
					/>
				</div>
				<Modal visible={showModal} 
					title='创建类别'
					onOk={this._modalOk}
					onCancel={this._modalCancel}
				>
					<CategoryForm 
						categorys={this.parentCategorys}
						wrappedComponentRef={(form)=> this.categoryForm = form}
					/>
				</Modal>
			</div>
		)
	}
}

export default CategoryPage