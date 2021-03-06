/**
 * create at 10/26/18
 */
import React, { Component } from 'react'
import { Card, Button, Modal, message, notification,} from 'antd'
import _ from 'lodash'

// components
import { FilterForm, CommonTable, } from '../../components'
import { OpenFormComponent, } from './components'

// presenter
import { cityPresenters } from '../../presenter'

// util
import { tableUtil } from '../../utils'

// config
import { consConfig, } from '../../config'

// const 
import { 
	cityColumnsConst, modeConst, optionsModeConst, authStatusConst, 
} from './constants'

const { fetchCityList, fetchCityOpen, fetchCityClose } = cityPresenters

const { tablePagination, calculateTableWidth } = tableUtil
const { formFilterType, formBtnType, citysConst } = consConfig

const MOPEN = 'modal_open'
const MCLOSE = 'modal_close'

const FORM_LIST = [
	{
		type: formFilterType.SELECT, 
		field: 'city', 
		label: '城市', 
		initialValue: citysConst[0].id,
		list: citysConst,
	},
	{
		type: formFilterType.SELECT, 
		field: 'mode', 
		label: '用车模式', 
		initialValue: modeConst[0].id, 
		list: modeConst, 
		itemStyle: {marginLeft: 10}, 
		innerStyle: {width: 160}
	},
	{
		type: formFilterType.SELECT, 
		field: 'op_mode', 
		label: '运营模式', 
		initialValue: optionsModeConst[0].id, 
		list: optionsModeConst, 
		itemStyle: {marginLeft: 10},
	},
	{
		type: formFilterType.SELECT, 
		field: 'auth_status', 
		label: '加盟商授权状态', 
		initialValue: authStatusConst[0].id, 
		list: authStatusConst, 
		itemStyle: {marginLeft: 10},
	},
]

class CityPage extends Component{
	state = {
		dataSource: [],
		selectedRowKeys: [],
		selectedRows: [],
		pagination: null,
		modalType: '',
		modalShow: false,
	}
	openForm = null 
	filterForm = null
	params = {
		page: 1
	}

	// 计算table width
	colWidth = calculateTableWidth(cityColumnsConst)

	componentDidMount(){
		this._requestList()
	}

	_requestList = async ()=>{
		try{
			let _this = this
			const ret = await fetchCityList({params: this.params})
			if(ret && _.isArray(ret.list)){
				this.setState({
					dataSource: ret.list,
					selectedRowKeys: [], // 重置
					selectedRows: [],
					pagination: tablePagination(ret, (current)=>{
						_this.params.page = current 
						// 刷新
						_this._requestList()
					})
				})
			}
		}catch(e){
			console.log('_requestList e=>', e)
		}
	}

	_searchClick = ({code, formValues})=>{
		try{
			notification.info({
				message: '筛选内容',
				description: `city=${formValues.city} mode=${formValues.mode} 
				op_mode=${formValues.op_mode} auth_status=${formValues.auth_status}`
			})
			// 刷新
			this._requestList()
		}catch(e){
			console.log('_searchClick e=>', e)
		}
	}

	_btnClick = (type)=>{
		const {selectedRowKeys} = this.state
		if(type === MCLOSE && _.isArray(selectedRowKeys) && selectedRowKeys.length < 1){
			// 下线城市 至少选择一项
			message.warn(`至少选择一个城市`)
			return 
		}
		this.setState({
			modalType: type,
			modalShow: true
		})
	}
	_modalConfirm = async ()=>{
		const {modalType} = this.state
		this.setState({
			modalShow: false
		})
		if(modalType === MOPEN){
			await this._requestOpen()
		} else {
			await this._requestClose()
		}
		// 刷新数据
		await this._requestList()
	}
	_requestOpen = async ()=>{
		try{
			const { getFieldsValue } = this.openForm.props.form
			const req = getFieldsValue()
			const ret = await fetchCityOpen({params: req})
			message.success(`${ret.result ? ret.result : ''}`)
		}catch(e){
			message.error(`开通城市 err${e.message ? e.message : '未知'}`)
		}
	}
	_requestClose = async ()=>{
		try{
			const { selectedRowKeys } = this.state
			const ret = await fetchCityClose({params: {ids: selectedRowKeys}})
			message.success(`${ret.result ? ret.result : ''}`)
		}catch(e){
			message.error(`下线城市 err${e.message ? e.message : '未知'}`)
		}
	}

	render(){
		const cityColumns = _.cloneDeep(cityColumnsConst)
		const { 
			dataSource, pagination, modalType, modalShow, selectedRowKeys, selectedRows,
		} = this.state
		const curModalTitle = modalType === MOPEN ? '开通城市' : '下线城市'
		const cityNames = selectedRows.map((item)=> item.name).join(', ')
		return (
			<div>
				<Card>
					<FilterForm 
						formList={FORM_LIST}
						options={[
							{
								btnType: 'primary',
								type: formBtnType.QUERY,
								optionItemPress: this._searchClick,
								style: {marginLeft: 20},
								title: '查询'
							},
							{
								type: formBtnType.RESET,
								optionItemPress: ()=> {
									// 刷新
									this._requestList()
								},
								style: {marginLeft: 20},
								title: '重置'
							},
						]}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type="primary" onClick={()=> this._btnClick(MOPEN)} >开通城市</Button>
					<Button type="danger" onClick={()=> this._btnClick(MCLOSE)} style={{marginLeft: 10}}>下线城市</Button>
				</Card>
				<div className="content-wrap">
					<CommonTable 
						columns={cityColumns}
						dataSource={dataSource}
						pagination={pagination}
						scroll={{x: this.colWidth}}
						rowSelection='checkbox'
						selectedRowKeys={selectedRowKeys}
						selectedRows={selectedRows}
						updateSelectedItem={(selectedRowKeys, selectedRows)=>{
							this.setState({
								selectedRowKeys, 
								selectedRows,
							})
						}}
					/>
				</div>
				<Modal 
					title={curModalTitle}
					visible={modalShow}
					onOk={this._modalConfirm}
					onCancel={()=> this.setState({modalShow: false})}
				>
					{
						modalType === MOPEN ? (
							<OpenFormComponent wrappedComponentRef={(form)=> this.openForm = form}/>
						) : (
							<p>{`下线 城市'${cityNames}'`}</p>
						)
					}
				</Modal>
			</div>
		)
	}
}

export default CityPage