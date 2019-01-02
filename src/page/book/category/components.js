/**
 * create at 01/02/19
 */
import React, { Component } from 'react'
import { Form, Select, Input, } from 'antd'

// const
const FormItem = Form.Item
const SelectOption = Select.Option

class CategoryFormBase extends Component{
	render(){
		const { categorys } = this.props
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
				<FormItem label="类别名称" {...formItemLayout}>
					{
						getFieldDecorator('category', {
							rules: [
								{
									required: true,
									message: '类别名称不能为空'
								},
								{
									max: 20,
									message: '类别名称不能超过20个字符'
								},
							]
						})(
							<Input placeholder="请输入类别名"/>
						)
					}
				</FormItem>
				<FormItem label="父类别" {...formItemLayout}>
					{
						getFieldDecorator('parent_id', {
							initialValue: categorys.length > 0 ? categorys[0].id : null
						})(
							<Select>
								{
									categorys.map((item)=>
										<SelectOption key={item.id} value={item.id}>{item.category}</SelectOption>
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

const CategoryForm = Form.create()(CategoryFormBase)

export default CategoryForm