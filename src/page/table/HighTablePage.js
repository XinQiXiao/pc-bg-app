/**
 * create at 10/23/18
 */
import React, { Component } from 'react'
import { Card, Table, Modal, } from 'antd'
import _ from 'lodash'

// presenter
import { commonPresenters } from '../../presenter'
// constants
import { columnsConst, columnsLongConst, columnsSortConst, columnsHandleConst, } from './constants'
// util
import { tableUtil } from '../../utils'

// const 
const { fetchTableHightList } = commonPresenters

class HighPage extends Component{
	state = {
		dataSource: []
	}
	// 计算table width
	longColWidth = tableUtil.calculateTableWidth(columnsLongConst)

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			const ret = await fetchTableHightList({params: {page: 1}})
			this.setState({
				dataSource: _.isArray(ret.list) ? ret.list : [],
			})
		} catch(e){
			console.log('_requestList e=>', e)
			Modal.error({
				title: '提示',
				content: `错误 ${e.message}`
			})
		}
	}

	render(){
		const {dataSource} = this.state
		const columns = _.cloneDeep(columnsConst)
		const columnsLong = _.cloneDeep(columnsLongConst)
		const columnsSort = _.cloneDeep(columnsSortConst)
		const columnsHandle = _.cloneDeep(columnsHandleConst)
		return (
			<div>
				<Card title="头部固定">
					<Table 
						bordered 
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						scroll={{y: 200}}
						rowKey={record => record.id}
					/>
				</Card>
				<Card title="左侧固定" style={{marginTop: 10}}>
					<Table 
						bordered 
						columns={columnsLong}
						dataSource={dataSource}
						pagination={false}
						scroll={{x: this.longColWidth, y: 300}}
						rowKey={record => record.id}
					/>
				</Card>
				<Card title="表格排序" style={{marginTop: 10}}>
					<Table 
						bordered 
						columns={columnsSort}
						dataSource={dataSource}
						pagination={false}
						scroll={{x: this.longColWidth, y: 300}}
						rowKey={record => record.id}
					/>
				</Card>
				<Card title="操作按钮" style={{marginTop: 10}}>
					<Table 
						bordered 
						columns={columnsHandle}
						dataSource={dataSource}
						pagination={false}
						rowKey={record => record.id}
					/>
				</Card>
			</div>
		)
	}
}

export default HighPage