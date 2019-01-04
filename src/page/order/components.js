/**
 * create at 01/04/19
 */
import React, { Component } from 'react'
import { Form } from 'antd'

// const 
const FormItem = Form.Item

class EndFormBase extends Component{
	render(){
		const {itemData} = this.props
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 18
			}
		}
		return (
			<Form layout="horizontal">
				<FormItem label="车辆编号" {...formItemLayout}>
					{(itemData && itemData.bike_code) ? itemData.bike_code : ''}
				</FormItem>
				<FormItem label="剩余电量" {...formItemLayout}>
					{(itemData && itemData.battery) ? itemData.battery : ''}
				</FormItem>
				<FormItem label="行程开始时间" {...formItemLayout}>
					{(itemData && itemData.start_time) ? itemData.start_time : ''}
				</FormItem>
				<FormItem label="当前位置" {...formItemLayout}>
					{(itemData && itemData.location) ? itemData.location : ''}
				</FormItem>
			</Form>
		)
	}
}

const EndForm = Form.create()(EndFormBase)

export default EndForm