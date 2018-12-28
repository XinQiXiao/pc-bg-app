/**
 * create at 12/28/18
 */
import React, { Component } from 'react'
import { Card, message, Button, Modal, } from 'antd'
import _ from 'lodash'

// components
import { CommonTable } from '../../../components'

// util
import { tableUtil } from '../../../utils'

// presenter
import { bookPresenters } from '../../../presenter'

// const
import { columnsConst, } from './constants'

const { calculateTableWidth, } = tableUtil
const { 
	fetchCategoryAll, 
} = bookPresenters

const ADD = 'options_add'
const EDIT = 'options_edit'
const DELETE = 'options_delete'

class CategoryPage extends Component{
	state = {
		categorysSource: [],
		categoryRowKeys: [],
		categoryRows: [],
		showModal: false,
	}
	colWidth = calculateTableWidth(columnsConst)
	modalTitle = ''

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const ret = await fetchCategoryAll({body: {}})
			if(!_.isArray(ret))
				throw new Error('获取数据失败')
			// 获取数据  重置一些状态
			this.setState({
				categorysSource: ret,
				categoryRowKeys: [],
				categoryRows: [],
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
		this.modalTitle = type === ADD ? `创建类别` : `编辑类别信息`
		this.setState({
			showModal: true
		})
	}

	_modalOk = ()=>{
		this.setState({
			showModal: false
		})
	}
	_modalCancel = ()=>{
		this.setState({
			showModal: false
		})
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
						scroll={{x: this.colWidth, y:300}}
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
					title={this.modalTitle}
					onOk={this._modalOk}
					onCancel={this._modalCancel}
				>
				</Modal>
			</div>
		)
	}
}

export default CategoryPage