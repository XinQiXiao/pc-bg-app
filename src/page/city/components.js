/**
 * create at 10/26/18
 */
import React, { Component } from 'react'
import { Form, Select, } from 'antd'

// const 
import { citysConst, modeConst, optionsModeConst, } from './constants'

const FormItem = Form.Item
const SelectOption = Select.Option

/**
 * 开通城市
 */
class OpenForm extends Component{
	render(){
		const {getFieldDecorator} = this.props.form 
		const formItemLayout = {
			labelCol: {
				span: 5,
				offset: 3,
			},
			wrapperCol: {
				span: 10
			},
		}
		return (
			<Form layout='horizontal'>
				<FormItem label="选择城市" {...formItemLayout}>
					{
						getFieldDecorator('city', {
							initialValue: citysConst[0].id,
						})(
							<Select >
								{
									citysConst.map((item)=>{
										return (
											<SelectOption value={item.id} key={item.id}>{item.name}</SelectOption>
										)
									})
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="营业模式" {...formItemLayout} >
					{
						getFieldDecorator('op_mode', {
							initialValue: optionsModeConst[0].id,
						})(
							<Select>
								{
									optionsModeConst.map((item)=>{
										return (
											<SelectOption value={item.id} key={item.id}>{item.name}</SelectOption>
										)
									})
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="用车模式" {...formItemLayout} >
					{
						getFieldDecorator('mode', {
							initialValue: modeConst[0].id,
						})(
							<Select >
								{
									modeConst.map((item)=>{
										return (
											<SelectOption value={item.id} key={item.id}>{item.name}</SelectOption>
										)
									})
								}
							</Select>
						)
					}
				</FormItem>
			</Form>
		)
	}
}
const OpenFormComponent = Form.create()(OpenForm)

export {
	OpenFormComponent,
}