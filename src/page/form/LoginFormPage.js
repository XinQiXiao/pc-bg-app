/**
 * create at 10/19/18
 */
import React, { Component } from 'react'
import { Form, Input, Button, Card, Icon, Checkbox, message, } from 'antd'

// const 
const FormItem = Form.Item

class LoginFormPage extends Component{

	_submitClick = ()=>{
		const { getFieldsValue, validateFields } = this.props.form
		const userInfo = getFieldsValue()
		validateFields((err, values)=>{
			console.log('_submitClick validateFields values=>', values)
			if(!err){
				message.success(`account=${userInfo.userName} password=${userInfo.password}`)
			} else {
				console.log('_submitClick validateFields err=>', err)
			}
		})
	}

	render(){
		const { getFieldDecorator } = this.props.form
		return (
			<div>
				<Card title="登录行内表单">
					<Form layout="inline">
						<FormItem >
							<Input placeholder="请输入账号"/>
						</FormItem>
						<FormItem >
							<Input placeholder="请输入密码"/>
						</FormItem>
						<FormItem >
							<Button type="primary">登录</Button>
						</FormItem>
					</Form>
				</Card>
				<Card title="登录水平表单" style={{marginTop: 10}}>
					<Form layout="horizontal" style={{width: 300}}>
						<FormItem>
							{
								getFieldDecorator('userName', {
									initialValue: '',
									rules: [
										{
											require: true,
											message: '用户名不能为空'
										},
										{
											min: 5, max: 10,
											message: '长度不在范围内'
										},
										{
											pattern: /^\w+$/g,
											message: '用户名必须是字母或者数字'
										}
									]
								})(
									<Input prefix={<Icon type="user"/>} placeholder="请输入账号"/>
								)
							}
						</FormItem>
						<FormItem >
							{
								getFieldDecorator('password', {
									initialValue: '',
									rules: [
										{
											required: true,
											message: '密码不能为空'
										}
									]
								})(
									<Input prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
									rules: []
								})(
									<Checkbox>记住密码.</Checkbox>
								)
							}
							<a href="javascript:void(0)" style={{float: 'right'}}>忘记密码</a>
						</FormItem>
						<FormItem>
							<Button type="primary" onClick={this._submitClick}>登录</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		)
	}
}

export default Form.create()(LoginFormPage)