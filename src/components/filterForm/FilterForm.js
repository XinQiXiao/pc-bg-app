/**
 * create at 10/26/18
 */
import React, { Component, Fragment, } from 'react'
import { Form, Select, Input, Checkbox, DatePicker, Button, } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'

// config
import { consConfig } from '../../config'

// const 
const { formFilterType, formBtnType, } = consConfig
const FormItem = Form.Item
const SelectOption = Select.Option

class FilterForm extends Component{

	// 初始化 Form
	_initFormList = ()=>{
		const {formList} = this.props
		let listCom = []
		if(formList.length > 0){
			formList.forEach((item, idx)=>{
				listCom.push(
					<FilterItem {...item} key={`${item.field}-${idx}`}
						form={this.props.form}
					/>
				)
			})
		}
		return listCom
	}

	// 初始化 option btn
	_initOptionBtn = ()=>{
		const { options } = this.props
		return options.map((item, index)=>{
			const { optionItemPress } = item
			// btnPress 改用 optionItemPress 外传 并单独处理
			return (
				<OptionBtn key={index} {...item}
					btnPress={({type, code})=> {this._optionItemClick({type, code, func: optionItemPress})}}
				/>
			)
		})
	}
	_optionItemClick = ({type, code, func})=>{
		const { getFieldsValue, validateFields, resetFields } = this.props.form
		switch(type){
			case formBtnType.QUERY:
				// 查询、提交
				let formValues = getFieldsValue()
				validateFields((err, values)=>{
					if(!err)
						func({code, formValues})
				})
				break
			case formBtnType.RESET:
				// 重置
				resetFields()
				func({code})
				break 
			default:
				break 
		}
	}

	render(){
		return (
			<Form layout="inline">
				{this._initFormList()}
				<FormItem>
					{this._initOptionBtn()}
				</FormItem>
			</Form>
		)
	}
}
FilterForm.propTypes = {
	formList: PropTypes.array,
	options: PropTypes.array, // [{btnType, style, title, optionItemPress, code, type}, ...]
}
FilterForm.defaultProps = {
	formList: [],
	options: [],
}
const FilterFormComponent = Form.create()(FilterForm)

/**
 * type 是 formBtnType 类型
 * code 相同type类型，区分每个 输入预留的字段
 */
class OptionBtn extends Component{
	_btnClick = ()=>{
		const { btnPress, code, type } = this.props
		if(_.isFunction(btnPress)){
			btnPress({type, code})
		}
	}
	render(){
		const {btnType = 'default', style = null, title = ''} = this.props 
		return (
			<Button type={btnType} style={style} onClick={this._btnClick}>
				{title}
			</Button>
		)
	}
}

const FilterItem = (props)=>{
	const {
		type, field, label, placeholder='', initialValue = '', 
		itemStyle = null, innerStyle = null, list = [], rules = [],
	} = props
	const { getFieldDecorator } = props.form
	switch(type){
		case formFilterType.SELECT:
			return (
				<FormItem label={label} style={itemStyle}>
					{
						getFieldDecorator([field], {
							initialValue
						})(
							<Select placeholder={placeholder} style={innerStyle}>
								{
									list.map((item)=> 
										<SelectOption key={item.id} value={item.id}>{item.name}</SelectOption>
									)
								}
							</Select>
						)
					}
				</FormItem>
			)
		case formFilterType.INPUT:
			return (
				<FormItem label={label}>
					{
						getFieldDecorator([field], {
							initialValue,
							rules,
						})(
							<Input type="text" placeholder={placeholder}/>
						)
					}
				</FormItem>
			)
		case formFilterType.CHECK_BOX:
			return (
				<FormItem label={label}>
					{
						getFieldDecorator([field], {
							initialValue, // true || false
							valuePropsName: 'checked',
						})(
							<Checkbox>
								{label}
							</Checkbox>
						)
					}
				</FormItem>
			)
		case formFilterType.QUERY_TIME:
			return (
				<Fragment >
					<FormItem label={label}>
						{
							getFieldDecorator('start_time')(
								<DatePicker showTime format="YY-MM-DD HH:mm:ss"
									placeholder={placeholder}
								/>
							)
						}
					</FormItem>
					<FormItem label="~" colon={false}>
						{
							getFieldDecorator('end_time')(
								<DatePicker showTime format="YY-MM-DD HH:mm:ss"
									placeholder={placeholder}
								/>
							)
						}
					</FormItem>
				</Fragment>
			)
		case formFilterType.DATE_PICKER:
			return (
				<FormItem label={label}>
					{
						getFieldDecorator([field])(
							<DatePicker showTime format="YY-MM-DD HH:mm:ss"
								placeholder={placeholder}
							/>
						)
					}
				</FormItem>
			)
		default:
		  return null
	}
}

export default FilterFormComponent
