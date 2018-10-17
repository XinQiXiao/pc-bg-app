/**
 * create at 10/17/18
 */
import React, { Component } from 'react'
import { Card, Button, Radio, Icon,} from 'antd'

// style
import '../ui.less'

// const
const ButtonGroup = Button.Group
const RadioGroup = Radio.Group

class ButtonPage extends Component{
	state = {
		btnLoading: false,
		btnSize: 'default'
	}

	_loadingControl = ()=>{
		this.setState({
			btnLoading: !this.state.btnLoading
		})
	}

	_radioChange = (e)=>{
		this.setState({
			btnSize: e.target.value
		})
	}

	render(){
		const { btnLoading, btnSize, } = this.state
		return (
			<div >
				<Card title="基础按钮" className="ui-card-wrap">
					<Button type="primary" >button</Button>
					<Button >button</Button>
					<Button type="dashed" >button</Button>
					<Button type="danger" >button</Button>
					<Button disabled>button</Button>
				</Card>
				<Card title="图形按钮" className="ui-card-wrap">
					<Button icon="plus">创建</Button>
					<Button icon="edit">编辑</Button>
					<Button icon="delete">删除</Button>
					<Button shape="circle" icon="search"/>
					<Button type="primary" icon="search">搜索</Button>
					<Button type="primary" icon="download">下载</Button>
				</Card>
				<Card title="Loading按钮" className="ui-card-wrap">
					<Button type="primary" loading={btnLoading}>确定</Button>
					<Button type="primary" shape="circle" loading={btnLoading}/>
					<Button loading={btnLoading}>点击加载</Button>
					<Button shape="circle" loading={btnLoading}/>
					<Button type="primary" onClick={this._loadingControl}>{ !btnLoading ? '开启' : '关闭' }</Button>
				</Card>
				<Card title="按钮组" style={{marginBottom: 20}}>
					<ButtonGroup>
						<Button type="primary">
							<Icon type="left"/>返回
						</Button>
						<Button type="primary">
							前进<Icon type="right"/>
						</Button>
					</ButtonGroup>
				</Card>
				<Card title="按钮大小" className="ui-card-wrap">
					<RadioGroup value={btnSize} onChange={this._radioChange}>
						<Radio value="small">小</Radio>
						<Radio value="default">中</Radio>
						<Radio value="large">大</Radio>
					</RadioGroup>
					<Button type="primary" size={btnSize}>button</Button>
					<Button size={btnSize}>button</Button>
					<Button type="dashed" size={btnSize}>button</Button>
					<Button type="danger" size={btnSize}>button</Button>
				</Card>
			</div>
		)
	}
}

export default ButtonPage