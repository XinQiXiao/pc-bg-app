/**
 * create at 12/18/18
 */
import React, { Component } from 'react'
import { Card, message, Button, Modal, } from 'antd'
import _ from 'lodash'

// components
import { CommonTable } from '../../../components'

// axios
import axiosApi from '../../../axios'

// util
import { tableUtil } from '../../../utils'

// const 
import { categoryColumnsConst, bookColumnConst, } from './constants'
const { calculateTableWidth, } = tableUtil

const ADD = 'options_add'
const EDIT = 'options_edit'
const DELETE = 'options_delete'

class ApiContainer extends Component{
	state = {
		categorysSource: [],
		booksSource: [],
		categoryRowKeys: [],
		categoryRows: [],
		bookRowkeys: [],
		bookRows: [],
		categoryModal: false,
		bookModal: false
	}
	categoryColWidth = calculateTableWidth(categoryColumnsConst)
	bookColWidth = calculateTableWidth(bookColumnConst)
	categoryModalTitle = ''
	bookModalTitle = ''

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const rets = await Promise.all([
				axiosApi.ajax({
					url: 'book/getBookCategorys',
					baseUrlType: 1,
					method: 'POST',
					body: {},
					data: {
						isShowLoading: true,
					}
				}),
				axiosApi.ajax({
					url: 'book/getAllBookInfo',
					baseUrlType: 1,
					method: 'POST',
					body: {},
					data: {
						isShowLoading: true,
					}
				})
			])
			if(!_.isArray(rets))
				throw new Error('获取数据失败')
			// 获取数据  重置一些状态
			this.setState({
				categorysSource: rets[0],
				booksSource: rets[1],
				categoryRowKeys: [],
				categoryRows: [],
				bookRowkeys: [],
				bookRows: [],
			})
		}catch(e){
			message.error(`获取数据fail err=${e.message}`)
		}
	}

	_categoryEdit = (type)=>{
		const { categoryRowKeys } = this.state
		if(type !== ADD && categoryRowKeys.length <= 0){
			message.warn(`请至少选择一条类别信息进行编辑`)
			return
		}
		// 处理删除
		if(type === DELETE){
			Modal.confirm({
				title: '提示',
				content: '确定删除类别信息',
				onCancel: ()=> null,
				onOk: ()=> null
			})
			return
		}
		this.categoryModalTitle = type === ADD ? `创建类别` : `编辑类别信息`
		this.setState({
			categoryModal: true
		})
	}

	_bookEdit = (type)=>{
		const { bookRowkeys } = this.state
		if(type !== ADD && bookRowkeys.length <= 0){
			message.warn(`请至少选择一条图书信息进行编辑`)
			return
		}
		// 处理删除
		if(type === DELETE){
			Modal.confirm({
				title: '提示',
				content: '确定删除图书信息',
				onCancel: ()=> null,
				onOk: ()=> null
			})
			return
		}
		this.bookModalTitle = type === ADD ? `创建图书信息` : `编辑图书信息`
		this.setState({
			bookModal: true
		})
	}

	_categoryModalOk = ()=>{
		this.setState({
			categoryModal: false
		})
	}
	_categoryModalCancel = ()=>{
		this.setState({
			categoryModal: false
		})
	}

	_bookModalOK = ()=>{
		this.setState({
			bookModal: false
		})
	}
	_bookModalCancel = ()=>{
		this.setState({
			bookModal: false
		})
	}

	render(){
		const categoryColumns = _.cloneDeep(categoryColumnsConst)
		const bookColumns = _.cloneDeep(bookColumnConst)
		const { 
			categorysSource, categoryRowKeys, categoryRows, categoryModal,
			booksSource, bookRowkeys, bookRows, bookModal,
		} = this.state
		return (
			<div>
				<Card>
					<span>图书种类</span>
					<Button style={{marginLeft: 20}} type="primary" icon="plus" 
						onClick={()=> this._categoryEdit(ADD)}
					>增加</Button>
					<Button style={{marginLeft: 20}} type="default" icon="edit" 
						onClick={()=> this._categoryEdit(EDIT)}
					>修改</Button>
					<Button style={{marginLeft: 20}} type="danger" icon="delete"
						onClick={()=> this._categoryEdit(DELETE)}
					>删除</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={categoryColumns}
						dataSource={categorysSource}
						scroll={{x:this.categoryColWidth, y:300}}
						pagination={null}
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
				<Card style={{marginTop: 20}}>
					<span>图书信息</span>
					<Button style={{marginLeft: 20}} type="primary" icon="plus" 
						onClick={()=> this._bookEdit(ADD)}
					>增加</Button>
					<Button style={{marginLeft: 20}} type="default" icon="edit" 
						onClick={()=> this._bookEdit(EDIT)}
					>修改</Button>
					<Button style={{marginLeft: 20}} type="danger" icon="delete"
						onClick={()=> this._bookEdit(DELETE)}
					>删除</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={bookColumns}
						dataSource={booksSource}
						scroll={{x:this.bookColWidth, y:300}}
						pagination={null}
						rowSelection='radio'
						selectedRowKeys={bookRowkeys}
						selectedRows={bookRows}
						updateSelectedItem={(selectedRowKeys, selectedRows)=>{
							this.setState({
								bookRowkeys: selectedRowKeys,
								bookRows: selectedRows,
							})
						}}
					/>
				</div>
				<Modal visible={categoryModal} 
					title={this.categoryModalTitle}
					onOk={this._categoryModalOk}
					onCancel={this._categoryModalCancel}
				>
				</Modal>
				<Modal visible={bookModal} 
					title={this.bookModalTitle}
					onOk={this._bookModalOK}
					onCancel={this._bookModalCancel}
				>
				</Modal>
			</div>
		)
	}
}

export default ApiContainer