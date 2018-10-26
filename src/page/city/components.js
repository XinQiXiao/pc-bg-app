/**
 * create at 10/26/18
 */
import React, { Component } from 'react'
import { Form, Select, Button,} from 'antd'

// const 
import { citysConst, modeConst, optionsModeConst, authStatusConst, } from './constants'

const FormItem = Form.Item
const SelectOption = Select.Option

/**
 * 筛选
 */
class FilterForm extends Component{
	render(){
		const {searchPress, resetPress} = this.props
		const {getFieldDecorator} = this.props.form 
		return (
			<Form layout="inline">
				<FormItem label="城市" >
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
				<FormItem label="用车模式" style={{marginLeft: 10}}>
					{
						getFieldDecorator('mode', {
							initialValue: modeConst[0].id,
						})(
							<Select style={{width: 160}}>
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
				<FormItem label="运营模式" style={{marginLeft: 10}}>
					{
						getFieldDecorator('op_mode', {
							initialValue: optionsModeConst[0].id,
						})(
							<Select >
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
				<FormItem label="加盟商授权状态" style={{marginLeft: 10}}>
					{
						getFieldDecorator('auth_status', {
							initialValue: authStatusConst[0].id,
						})(
							<Select >
								{
									authStatusConst.map((item)=>{
										return (
											<SelectOption value={item.id} key={item.id}>{item.name}</SelectOption>
										)
									})
								}
							</Select>
						)
					}
				</FormItem>
				<Button type="primary" onClick={searchPress} style={{marginLeft: 20}}>查询</Button>
				<Button onClick={resetPress} style={{marginLeft: 20}}>重置</Button>
			</Form>
		)
	}
}
const FilterFormComponent = Form.create()(FilterForm)

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
	FilterFormComponent,
}