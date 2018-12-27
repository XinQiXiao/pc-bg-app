/**
 * create at 12/25/18
 */
import React, { Component } from 'react'
import { Form, Input, Select, InputNumber, DatePicker, } from 'antd'

// const
const FormItem = Form.Item
const SelectOption = Select.Option

class BookFormBase extends Component{
	render(){
		const {bookCategorys} = this.props
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
				<FormItem label="书名" {...formItemLayout}>
					{
						getFieldDecorator('book_name', {
							rules: [
								{
									required: true,
									message: '书名不能为空'
								},
								{
									max: 30,
									message: '书名不能超过30个字符'
								}
							]
						})(
							<Input placeholder="请输入书名"/>
						)
					}
				</FormItem>
				<FormItem label="作者" {...formItemLayout}>
					{
						getFieldDecorator('author', {
							rules: [
								{
									required: true,
									message: '作者不能为空'
								},
								{
									max: 20,
									message: '作者不能超过20个字符'
								}
							]
						})(
							<Input placeholder="请输入作者"/>
						)
					}
				</FormItem>
				<FormItem label="书类别" {...formItemLayout}>
					{
						getFieldDecorator('book_category_id', {
							initialValue: bookCategorys[0].id,
						})(
							<Select>
								{
									bookCategorys.map((item)=> 
										<SelectOption key={item.id} value={item.id}>{item.category}</SelectOption>
									)
								}
							</Select>
						)
					}
				</FormItem>
				<FormItem label="单价" {...formItemLayout}>
					{
						getFieldDecorator('price', {
							rules: [
								{
									required: true,
									message: '单价不能为空'
								}
							]
						})(
							<InputNumber placeholder="单价" min={0} step={10} precision={2}/>
						)
					}
				</FormItem>
				<FormItem label="出版社" {...formItemLayout}>
					{
						getFieldDecorator('press', {
							rules: [
								{
									required: true,
									message: '出版社不能为空'
								},
								{
									max: 30,
									message: '作者不能超过30个字符'
								}
							]
						})(
							<Input placeholder="请输入出版社"/>
						)
					}
				</FormItem>
				<FormItem label="出版时间" {...formItemLayout}>
					{
						getFieldDecorator('pubdate', {
							rules: [
								{
									required: true,
									message: '出版时间不能为空'
								}
							]
						})(
							<DatePicker showToday format="YYYY-MM-DD "/>
						)
					}
				</FormItem>
				<FormItem label="库存" {...formItemLayout}>
					{
						getFieldDecorator('store', {
							rules: [
								{
									required: true,
									message: '库存不能为空'
								}
							]
						})(
							<InputNumber placeholder="库存" min={1} step={1} precision={0}/>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

const BookForm = Form.create()(BookFormBase)

export {
	BookForm,
}