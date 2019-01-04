/**
 * create at 11/02/18
 */
import React, { Component } from 'react'
import { Form, Input, Radio, Select, Switch, DatePicker, } from 'antd'
import moment from 'moment'
import _ from 'lodash'

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
		const {itemData, editAble} = this.props
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
						!editAble ? ((itemData && itemData.username) ? itemData.username : '') :
						getFieldDecorator('username', {
							rules: [
								{
									required: true,
									message: '请输入员工姓名'
								}
							],
							initialValue: (itemData && itemData.username) ? itemData.username : ''
						})(
							<Input placeholder="请输入姓名"/>
						)
					}
				</FormItem>
				<FormItem label="性别" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.sex && itemData.sex<sexCons.length-1) ? sexCons[itemData.sex].name : '') :
						getFieldDecorator('sex', {
							initialValue: (itemData && itemData.sex) ? itemData.sex : sexCons[0].id
						})(
							<RadioGroup>
								{
									sexCons.map((item, index)=>
										<Radio key={index} value={item.id}>{item.name}</Radio>
									)
								}
							</RadioGroup>
						)
					}
				</FormItem>
				<FormItem label="手机号" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.tel) ? itemData.tel : '') :
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
							],
							initialValue: (itemData && itemData.tel) ? itemData.tel : ''
						})(
							<Input placeholder="请输入手机号"/>
						)
					}
				</FormItem>
				<FormItem label="状态" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.state && itemData.state < stateCons.length-1) ? stateCons[itemData.state].name : '') :
						getFieldDecorator('state', {
							initialValue: (itemData && itemData.state) ? itemData.state : stateCons[0].id
						})(
							<Select>
								{
									!_.isArray(stateCons) ? null : (
										stateCons.map((item, index)=> 
											<SelectOption key={index} value={item.id}>{item.name}</SelectOption>
										)
									)
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="兴趣爱好" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.interest && itemData.interest < interestCons.length-1) ? interestCons[itemData.interest].name : '') :
						getFieldDecorator('interest', {
							initialValue: (itemData && itemData.interest) ? itemData.interest : interestCons[0].id
						})(
							<Select>
								{
									!_.isArray(interestCons) ? null : (
										interestCons.map((item, index)=> 
											<SelectOption key={index} value={item.id}>{item.name}</SelectOption>
										)
									)
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="婚否" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.isMarried) ? '已婚' : '未婚') :						
						getFieldDecorator('isMarried', {
							valuePropName: 'checked',
							initialValue: (itemData && itemData.isMarried) ? true : false
						})(
							<Switch />
						)
					}
				</FormItem>
				<FormItem label="生日" {...formItemLayout}>
					{
						!editAble ? ((itemData && itemData.birthday) ? itemData.birthday : '') :
						getFieldDecorator('birthday', {
							initialValue: (itemData && itemData.birthday) ? moment(itemData.birthday) : moment()
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
						!editAble ? ((itemData && itemData.address) ? itemData.address : '') :
						getFieldDecorator('address', {
							initialValue: (itemData && itemData.address) ? itemData.address : ''
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
						!editAble ? ((itemData && itemData.registertime) ? itemData.registertime : '') :
						getFieldDecorator('registertime', {
							initialValue: (itemData && itemData.registertime) ? moment(itemData.registertime) : moment()
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