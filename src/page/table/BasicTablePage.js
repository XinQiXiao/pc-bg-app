/**
 * create at 10/23/18
 */
import React, { Component } from 'react'
import { Card, Modal, Table} from 'antd'
import _ from 'lodash'

// axios
import axiosApi from '../../axios'

import { columnsConst } from './constants'

class BasicPage extends Component{
	state = {
		dataSource: []
	}

	params = {
		page: 1
	}

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			const ret = await axiosApi.ajax({
				url: 'table/list', 
				data: {
					params: {
						...this.params, 
					},
					isShowLoading: true,
				}
			})
			this.setState({
				dataSource: _.isArray(ret.list) ? ret.list : []
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
		const columns = _.cloneDeep(columnsConst)
		const { dataSource } = this.state
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
			</div>
		)
	}
}

export default BasicPage