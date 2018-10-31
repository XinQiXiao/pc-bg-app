/**
 * create at 10/31/18
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import _ from 'lodash'

// const 
const CHECK_BOX = 'checkbox'
const RADIO = 'radio'

class TableComponent extends Component{

	_onRowClick = (record)=>{
		let {
			rowSelection, selectedRowKeys, selectedRows, updateSelectedItem,
		} = this.props
		if(rowSelection === RADIO){
			selectedRowKeys = [record.id]
			selectedRows = [record]
		} else if(rowSelection === CHECK_BOX){
			let eleIndex = _.isArray(selectedRowKeys) ? selectedRowKeys.indexOf(record.id) : -1
			// selectedRowKeys 增减
			eleIndex === -1 ? selectedRowKeys.push(record.id) : selectedRowKeys.splice(eleIndex, 1)
			// selectedRows 增减
			eleIndex === -1 ? selectedRows.push(record) : selectedRows.splice(eleIndex, 1) 
		}
		updateSelectedItem(selectedRowKeys, selectedRows)
	}

	render(){
		const {
			columns, dataSource, pagination, rowSelection, selectedRowKeys, scroll, updateSelectedItem,
		} = this.props
		const defaultSection = {
			type: RADIO,
			selectedRowKeys,
		}
		let initSection = null 
		if(rowSelection === RADIO || rowSelection === CHECK_BOX){
			defaultSection.type = rowSelection 
			if(rowSelection === CHECK_BOX){
				defaultSection.onChange = (selectedRowKeys, selectedRows)=> {
					updateSelectedItem(selectedRowKeys, selectedRows)
				}
			}
			initSection = defaultSection
		} 
		return (
			<Table 
				bordered
				columns={columns}
				dataSource={dataSource}
				pagination={pagination}
				scroll={scroll}
				rowSelection={initSection}
				rowKey={record => record.id}
				onRow={(record)=>{
					return {
						onClick: ()=>{
							this._onRowClick(record)
						}
					}
				}}
			/>
		)
	}
}

TableComponent.propTypes = {
	columns: PropTypes.array,
	dataSource: PropTypes.array,
	pagination: PropTypes.object,
	rowSelection: PropTypes.string,
	selectedRowKeys: PropTypes.array,
	selectedRows: PropTypes.array,
	scroll: PropTypes.object, 
	updateSelectedItem: PropTypes.func,
}
TableComponent.defaultProps = {
	columns: [],
	dataSource: [],
	pagination: null,
	rowSelection: '', // 默认不选择
	selectedRowKeys: [],
	selectedRows: [],
	scroll: null,
	updateSelectedItem: ()=> null,
}

export default TableComponent