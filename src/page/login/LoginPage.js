/**
 * create at 01/07/19
 */
import React, { Component } from 'react'
import { message, Form, Input, Icon, Checkbox, Button, } from 'antd'

// style
import './loginStyle.less'

// const
const FormItem = Form.Item

class LoginPageBase extends Component{

	_loginClick = ()=> {
		const {validateFields} = this.props.form
		validateFields((err, values)=>{
			if(!err){
				window.location.href = "/#/admin/home/"
			}
		})
	}

	_hasErrors = (fieldsError)=>{
		return Object.keys(fieldsError).some(field => fieldsError[field])
	}

	render(){
		const {getFieldDecorator, getFieldsError} = this.props.form
		return (
			<div className="login-bg-view">
				<main className="login-main">
					<Form  className="login-form">
						<FormItem>
							{
								getFieldDecorator('user_name', {
									rules: [
										{required: true, message: '请输入正确的用户名！'},
										{max: 12, message: '不能超过12个字符'}
									]
								})(
									<Input 
										prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
										placeholder='用户姓名(如“test”)'
									/>
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('password', {
									rules: [
										{required: true, message: '请输入正确的密码！'},
										{max: 12, message: '不能超过12个字符'}
									]
								})(
									<Input 
										type="password"
										prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
										placeholder='密码(如“123”)'
									/>
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Checkbox>记住密码</Checkbox>
								)
							}
							<a href="" className="login-form-forget">忘记密码</a>
							<Button type="primary" 
								className="login-form-btn"
								onClick={this._loginClick}
								disabled={this._hasErrors(getFieldsError())}
							>登录</Button>
							<a href="">注册</a>
						</FormItem>
					</Form>
				</main>
			</div>
		)
	}
}

const LoginPage = Form.create()(LoginPageBase)

export default LoginPage