/**
 * create at 12/18/18
 */
import React, { Component } from 'react'
import { Card, message, } from 'antd'
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

class ApiContainer extends Component{
	state = {
		categorysSource: [],
		booksSource: [],
	}
	categoryColWidth = calculateTableWidth(categoryColumnsConst)
	bookColWidth = calculateTableWidth(bookColumnConst)

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
			this.setState({
				categorysSource: rets[0],
				booksSource: rets[1]
			})
		}catch(e){
			message.error(`获取数据fail err=${e.message}`)
		}
	}

	render(){
		const categoryColumns = _.cloneDeep(categoryColumnsConst)
		const bookColumns = _.cloneDeep(bookColumnConst)
		const { categorysSource, booksSource} = this.state
		return (
			<div>
				<Card>图书种类</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={categoryColumns}
						dataSource={categorysSource}
						scroll={{x:this.categoryColWidth, y:300}}
						recordKey={'category_id'}
						pagination={null}
					/>
				</div>
				<Card style={{marginTop: 20}}>图书信息</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={bookColumns}
						dataSource={booksSource}
						scroll={{x:this.bookColWidth, y:300}}
						pagination={null}
					/>
				</div>
			</div>
		)
	}
}

export default ApiContainer