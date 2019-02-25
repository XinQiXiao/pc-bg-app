/**
 * create at 02/21/19
 */
import React, {Component} from 'react'
import { Form, Select, Input, Switch,} from 'antd'
import { employeeStatus, employeeCity, } from './constants'

// const
const FormItem = Form.Item
const SelectOption = Select.Option

class EmployeeFormBase extends Component{
	render(){
		const { employeeData = null, editType = 'create', } = this.props
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
				<FormItem label="登录名" {...formItemLayout}>
					{
						getFieldDecorator('login_name', {
							rules: [
								{
									required: true,
									message: '登录名不能为空'
								},
								{
									max: 20,
									message: '登录名不能超过20个字符'
								},
							],
							initialValue: employeeData && employeeData.login_name ? employeeData.login_name : ''
						})(
							<Input placeholder="请输入登录名"/>
						)
					}
				</FormItem>
				<FormItem label="员工姓名" {...formItemLayout}>
					{
						getFieldDecorator('display_name', {
							rules: [
								{
									required: true,
									message: '员工姓名不能为空'
								},
								{
									max: 20,
									message: '员工姓名不能超过20个字符'
								},
							],
							initialValue: employeeData && employeeData.display_name ? employeeData.display_name : ''
						})(
							<Input placeholder="请输入登录名"/>
						)
					}
				</FormItem>
				<FormItem label="邮箱" {...formItemLayout}>
					{
						getFieldDecorator('email', {
							rules: [
								{
									required: true,
									message: '邮箱不能为空'
								},
							],
							initialValue: employeeData && employeeData.email ? employeeData.email : ''
						})(
							<Input placeholder="请输入邮箱"/>
						)
					}
				</FormItem>
				{
					editType === 'edit' ? (
						<FormItem label="重置密码" {...formItemLayout}>
							{
								getFieldDecorator('reset_password', {
									valuePropName: 'checked',
									initialValue: false
								})(
									<Switch/>
								)
							}
						</FormItem>
					) : null
				}
				<FormItem label="密码" {...formItemLayout}>
					{
						getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: '密码不能为空'
								},
								{
									min: 6,
									message: '密码不能低于6位'
								},
								{
									max: 20,
									message: '密码不能大于20位'
								},
							]
						})(
							<Input placeholder="请输入密码"/>
						)
					}
				</FormItem>
				<FormItem label="手机号" {...formItemLayout}>
					{
						getFieldDecorator('mobile', {
							rules: [
								{
									required: true,
									message: '手机号不能为空'
								},
								{
									pattern: /^1\d{10}$/,
									message: '不符合手机号规则'
								},
							],
							initialValue: employeeData && employeeData.mobile ? employeeData.mobile : ''
						})(
							<Input placeholder="请输入手机号"/>
						)
					}
				</FormItem>
				<FormItem label="员工状态" {...formItemLayout}>
					{
						getFieldDecorator('status', {
							initialValue: employeeData && employeeData.status ? employeeData.status : employeeStatus[0].id
						})(
							<Select>
								{
									employeeStatus.map((item, idx)=>
										<SelectOption key={item.id} value={item.id}>{item.name}</SelectOption>
									)
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="城市" {...formItemLayout}>
					{
						getFieldDecorator('city_id', {
							initialValue: employeeData && employeeData.city_id ? employeeData.city_id : employeeCity[0].id
						})(
							<Select>
								{
									employeeCity.map((item, idx)=>
										<SelectOption key={item.id} value={item.id}>{item.name}</SelectOption>
									)
								}
							</Select>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

const EmployeeForm = Form.create()(EmployeeFormBase)

export default EmployeeForm