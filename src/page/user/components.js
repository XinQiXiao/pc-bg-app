/**
 * create at 11/02/18
 */
import React, { Component } from 'react'
import { Form, Input, Radio, Select, Switch, DatePicker, } from 'antd'
import moment from 'moment'

// config
import { consConfig } from '../../config'

// const 
const { sexCons, stateCons, interestCons, } = consConfig

const FormItem = Form.Item
const RadioGroup = Radio.Group
const SelectOption = Select.Option
const TextArea = Input.TextArea

class UserForm extends Component{
	render(){
		const {getFieldDecorator} = this.props.form
		const formItemLayout = {
			labelCol: {
				span: 4
			},
			wrapperCol: {
				span: 20
			}
		}
		return (
			<Form layout="horizontal">
				<FormItem label="姓名" {...formItemLayout}>
					{
						getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: '请输入员工姓名'
								}
							]
						})(
							<Input placeholder="请输入姓名"/>
						)
					}
				</FormItem>
				<FormItem label="性别" {...formItemLayout}>
					{
						getFieldDecorator('sex', {
							initialValue: sexCons[0].id
						})(
							<RadioGroup>
								<Radio value={sexCons[0].id}>{sexCons[0].name}</Radio>
								<Radio value={sexCons[1].id}>{sexCons[1].name}</Radio>
							</RadioGroup>
						)
					}
				</FormItem>
				<FormItem label="手机号" {...formItemLayout}>
					{
						getFieldDecorator('tel', {
							rules: [
								{
									required: true,
									message: '请输入手机号'
								},
								{
									pattern: /^1\d{10}/,
									message: '手机号不正确'
								}
							]
						})(
							<Input placeholder="请输入手机号"/>
						)
					}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						getFieldDecorator('state', {
							
						})(
							<Select>
								<SelectOption value="1">{stateCons[0]}</SelectOption>
								<SelectOption value="2">{stateCons[1]}</SelectOption>
								<SelectOption value="3">{stateCons[2]}</SelectOption>
								<SelectOption value="4">{stateCons[3]}</SelectOption>
								<SelectOption value="5">{stateCons[4]}</SelectOption>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="兴趣爱好" {...formItemLayout}>
					{
						getFieldDecorator('interest', {
							
						})(
							<Select>
								<SelectOption value="1">{interestCons[0]}</SelectOption>
								<SelectOption value="2">{interestCons[1]}</SelectOption>
								<SelectOption value="3">{interestCons[2]}</SelectOption>
								<SelectOption value="4">{interestCons[3]}</SelectOption>
								<SelectOption value="5">{interestCons[4]}</SelectOption>
								<SelectOption value="6">{interestCons[5]}</SelectOption>
								<SelectOption value="7">{interestCons[6]}</SelectOption>
							</Select>
						)
					}
				</FormItem>
				<FormItem label="婚否" {...formItemLayout}>
					{
						getFieldDecorator('isMarried', {
							valuePropName: 'checked',
							initialValue: false
						})(
							<Switch />
						)
					}
				</FormItem>
				<FormItem label="生日" {...formItemLayout}>
					{
						getFieldDecorator('birthday', {
							initialValue: moment()
						})(
							<DatePicker 
								showTime
								format='YYYY-MM-DD HH:mm:ss'
							/>
						)
					}
				</FormItem>
				<FormItem label="联系地址" {...formItemLayout}>
					{
						getFieldDecorator('address', {
							initialValue: ''
						})(
							<TextArea 
								autosize={{
									minRows: 2, maxRows: 6
								}}
							/>
						)
					}
				</FormItem>
				<FormItem label="注册时间" {...formItemLayout}>
					{
						getFieldDecorator('registertime', {
							initialValue: moment()
						})(
							<DatePicker 
								showTime
								format='YYYY-MM-DD HH:mm:ss'
							/>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

const UserFormComponent = Form.create()(UserForm)

export {
	UserFormComponent,
}