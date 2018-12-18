/**
 * create at 10/19/18
 */
import React, { Component } from 'react'
import { 
	Form, Input, Button, Card, Icon, Checkbox, Radio, InputNumber, 
	Select, Switch, DatePicker, TimePicker, Upload,
} from 'antd'
import moment from 'moment'

// const 
import { consConfig } from '../../config'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const SelectOption = Select.Option
const TextArea = Input.TextArea

class RegisterFormPage extends Component{
	state = {
		userImg: ''
	}

	getBase64(img, callback) {
		const reader = new FileReader()
		reader.addEventListener('load', () => callback(reader.result))
		reader.readAsDataURL(img)
	}

	_handleOnChange = (info)=>{
		if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImg: imageUrl,
        loading: false,
      }))
    }
	}

	_registerClick = ()=>{
		let userInfo = this.props.form.getFieldsValue()
		console.log('_registerClick userInfo=>', userInfo)
	}

	render(){
		const { getFieldDecorator } = this.props.form
		const formItemLayout = {
			labelCol: {
				xs: 24,
				sm: 4,
			},
			wrapperCol: {
				xs: 24,
				sm: 8
			}
		}
		const offsetLayout = {
			wrapperCol: {
				xs: 24,
				sm: {
					span: 8,
					offset: 4
				}
			}
		}
		return (
			<div>
				<Card title="注册表单">
					<Form layout="horizontal">
						<FormItem label="用户名" {...formItemLayout}>
							{
								getFieldDecorator('userName', {
									initialValue: '',
									rules: [
										{
											required: true,
											message: '用户名不能为空'
										},
									]
								})(
									<Input placeholder="请输入用户名"/>
								)
							}
						</FormItem>
						<FormItem label="密码" {...formItemLayout}>
							{
								getFieldDecorator('password', {
									initialValue: ''
								})(
									<Input type="password" placeholder="请输入密码"/>
								)
							}
						</FormItem>
						<FormItem label="性别" {...formItemLayout}>
							{
								getFieldDecorator('sex', {
									initialValue: '1'
								})(
									<RadioGroup>
										<Radio value={consConfig.sexCons[0].id}>{consConfig.sexCons[0].name}</Radio>
										<Radio value={consConfig.sexCons[1].id}>{consConfig.sexCons[1].name}</Radio>
									</RadioGroup>
								)
							}
						</FormItem>
						<FormItem label="年龄" {...formItemLayout}>
							{
								getFieldDecorator('age', {
									initialValue: 18
								})(
									<InputNumber />
								)
							}
						</FormItem>
						<FormItem label="当前状态" {...formItemLayout}>
							{
								getFieldDecorator('state', {
									initialValue: '2'
								})(
									<Select>
										<SelectOption value='1'>{consConfig.stateCons[0]}</SelectOption>
										<SelectOption value='2'>{consConfig.stateCons[1]}</SelectOption>
										<SelectOption value='3'>{consConfig.stateCons[2]}</SelectOption>
										<SelectOption value='4'>{consConfig.stateCons[3]}</SelectOption>
										<SelectOption value='5'>{consConfig.stateCons[4]}</SelectOption>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="爱好" {...formItemLayout}>
							{
								getFieldDecorator('interest', {
									initialValue: []
								})(
									<Select mode='multiple'>
										<SelectOption value='1'>{consConfig.interestCons[0]}</SelectOption>
										<SelectOption value='2'>{consConfig.interestCons[1]}</SelectOption>
										<SelectOption value='3'>{consConfig.interestCons[2]}</SelectOption>
										<SelectOption value='4'>{consConfig.interestCons[3]}</SelectOption>
										<SelectOption value='5'>{consConfig.interestCons[4]}</SelectOption>
										<SelectOption value='6'>{consConfig.interestCons[5]}</SelectOption>
										<SelectOption value='7'>{consConfig.interestCons[6]}</SelectOption>
										<SelectOption value='8'>{consConfig.interestCons[7]}</SelectOption>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="是否已婚" {...formItemLayout}>
							{
								getFieldDecorator('isMarried', {
									valuePropName: 'checked',
									initialValue: true
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
						<FormItem label="地址" {...formItemLayout}>
							{
								getFieldDecorator('address', {
									initialValue:''
								})(
									<TextArea 
										autosize={{
											minRows: 2, maxRows: 6
										}}
									/>
								)
							}
						</FormItem>
						<FormItem label="早起时间" {...formItemLayout}>
							{
								getFieldDecorator('getUpTime')(
									<TimePicker 
										format='HH:mm'
									/>
								)
							}
						</FormItem>
						<FormItem label="头像" {...formItemLayout}>
							{
								getFieldDecorator('userImg', {
									initialValue: ''
								})(
									<Upload 
										listType="picture-card"
										showUploadList={false}
										action="//jsonplaceholder.typicode.com/posts/"
										onChange={this._handleOnChange}
									>
										{
											this.state.userImg ? 
											<img src={this.state.userImg} alt="添加头像"/> : 
											<Icon type='plus'/>
										}
									</Upload>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('contract', {
									valuePropName: 'checked',
									initialValue: false
								})(
									<Checkbox >
										我已经阅读过<a href="javascript:void(0)">注册协议</a>
									</Checkbox>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							<Button type='primary' onClick={this._registerClick}>注册</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		)
	}
}

export default Form.create()(RegisterFormPage)