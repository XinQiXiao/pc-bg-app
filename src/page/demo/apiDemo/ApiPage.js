/**
 * create at 12/18/18
 */
import React, { Component } from 'react'
import { Card, message, Button, Modal, } from 'antd'
import _ from 'lodash'
import moment from 'moment'

// components
import { CommonTable } from '../../../components'
import { BookForm } from './components'

// presenter
import { bookPresenters } from '../../../presenter'

// util
import { tableUtil } from '../../../utils'

// const 
import { categoryColumnsConst, bookColumnConst, } from './constants'
import { fetchAddBook } from '../../../presenter/bookPresenter'

const { calculateTableWidth, } = tableUtil
const { fetchCategoryAll, fetchChildrenCategorys, fetchbookAll, fetchUpdateBook, } = bookPresenters

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
	childrenCategorys = []
	bookForm = ''
	bookEditType = ''

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const rets = await Promise.all([
				fetchCategoryAll({body: {}}), 
				fetchbookAll({body: {}}),
				fetchChildrenCategorys({body: {}})
			])
			if(!_.isArray(rets))
				throw new Error('获取数据失败')
			// 获取数据  重置一些状态
			this.childrenCategorys = rets[2]
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
	_requestBooksList = async ()=>{
		try{
			const ret = await fetchbookAll({body: {}})
			if(!_.isArray(ret))
				throw new Error('bookList 数据格式不正确')
			this.setState({
				booksSource: ret, 
				bookRowkeys: [],
				bookRows: [],
			})
			return true
		}catch(e){
			message.error(`获取图书列表数据fail err=${e.message}`)
			return false
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
		this.bookEditType = type
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
		const {validateFields, resetFields} = this.bookForm.props.form
		validateFields((err, values)=>{
			if(!err){
				// 请求数据
				const newValues = _.cloneDeep(values) 
				const {pubdate} = newValues
				newValues.pubdate = !_.isNil(pubdate) ? moment(pubdate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
				
				const retBool = this._bookEditRequest({data: newValues, type: this.bookEditType})
				if(!retBool)
					return  
				this.setState({
					bookModal: false
				})
				// book edit type 置为默认
				this.bookEditType = ''
				// form clear
				resetFields()
				// 刷新book list
				this._requestBooksList()
			}
		})
	}
	_bookModalCancel = ()=>{
		const {resetFields} = this.bookForm.props.form
		// form clear
		resetFields()
		this.setState({
			bookModal: false
		})
	}
	_bookEditRequest = async ({data, type})=>{
		try{
			if(type === ADD){
				const ret = await fetchAddBook({body: {...data}})
				if(_.isNil(ret)){
					throw new Error('添加图书 获取请求结果失败')
				}
				message.success(`添加图书成功`)
				return true
			}
			const { bookRowkeys } = this.state
			let updateBody = {
				...data,
				book_id: _.isArray(bookRowkeys) && bookRowkeys.length >0 ? bookRowkeys[0] : null
			}
			const retUpdate = await fetchUpdateBook({body: updateBody})
			if(_.isNil(retUpdate)){
				throw new Error('修改图书 获取请求结果失败')
			}
			message.success(`修改图书信息成功`)
			return true
		}catch(e){
			message.error(`操作失败 err=${e.message}`)
			return false
		}
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
					<BookForm bookCategorys={this.childrenCategorys} 
						formData={(this.bookEditType === EDIT && bookRows.length > 0) ? bookRows[0] : null}
						wrappedComponentRef={(form)=> this.bookForm = form}
					/>
				</Modal>
			</div>
		)
	}
}

export default ApiContainer