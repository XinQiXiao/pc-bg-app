/**
 * create at 10/23/18
 */
import React, { Component } from 'react'
import { Card, Modal, Table, Button, message} from 'antd'
import _ from 'lodash'

// presenter
import { commonPresenters } from '../../presenter'
// constants
import { columnsConst } from './constants'
// util
import { tableUtil } from '../../utils'

// const 
const { fetchTableList } = commonPresenters
const { tablePagination } = tableUtil

class BasicPage extends Component{
	state = {
		dataSource: [],
		selectedRowKeys: [],
		selectedRows: [],
		pagination: null
	}

	params = {
		page: 1
	}

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			let _this = this
			const ret = await fetchTableList({params: this.params})
			this.setState({
				dataSource: _.isArray(ret.list) ? ret.list : [],
				selectedRowKeys: [],
				selectedRows: [],
				pagination: tablePagination(ret, (current)=>{
					_this.params.page = current 
					_this._requestList()
				})
			})
		} catch(e){
			console.log('_requestList e=>', e)
			Modal.error({
				title: '提示',
				content: `错误 ${e.message}`
			})
		}
	}

	_handleDelete = ()=>{
		const {selectedRows} = this.state 
		let ids = []
		selectedRows.forEach((item)=>{
			ids.push(item.id)
		})
		Modal.confirm({
			title: '删除内容',
			content: `确定要删除这些数据吗?${ids.join(',')}`,
			onOk: ()=>{
				message.success('删除成功') 
				// refresh data
				this._requestList()
			}
		})
	}

	_onRowClick = (record, index)=>{
		let selectedKeys = [index]
		Modal.info({
			title: `选中的用户信息`,
			content: `用户名：${record.userName} 爱好：${record.interest}`
		})
		this.setState({
			selectedRowKeys: selectedKeys,
		})
	}

	render(){
		const { dataSource, selectedRowKeys, pagination } = this.state
		const columns = _.cloneDeep(columnsConst)
		const rowSelection = {
			type: 'radio',
			selectedRowKeys,
		}
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
		return (
			<div>
				<Card title="基础表格-数据mock">
					<Table 
						bordered 
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						rowKey={record => record.id}
					/>
				</Card>
				<Card title="Mock-单选" style={{marginTop: 10}}>
					<Table 
						bordered 
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						rowKey={record => record.id}
						rowSelection={rowSelection}
						onRow={(record, idx)=>{
							return {
								onClick: ()=>{
									this._onRowClick(record, idx)
								}
							}
						}}
					/>
				</Card>
				<Card title="Mock-复选" style={{marginTop: 10}}>
					<div style={{marginBottom: 10}}>
						<Button type="primary" onClick={this._handleDelete}>删除</Button>
					</div>
					<Table 
						bordered 
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						rowKey={record => record.id}
						rowSelection={rowCheckSelection}
					/>
				</Card>
				<Card title="表格分页" style={{marginTop: 10}}>
					<Table 
						bordered 
						columns={columns}
						dataSource={dataSource}
						pagination={pagination}
						rowKey={record => record.id}
					/>
				</Card>
			</div>
		)
	}
}

export default BasicPage