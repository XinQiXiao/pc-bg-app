/**
 * create at 10/16/18
 */
import React, { Component } from 'react'
import {Row, Col,} from 'antd'

// style
import './header.less'

// util
import { timeUtil } from '../../utils'

class HeaderComponent extends Component{
	state = {
		userName: '',
		systemTime: timeUtil.getCurrentTime(),
	}

	componentWillMount(){
		// 初始化
		this.setState({
			userName: 'admin',
		})
		this._getTime()
	}

	_getTime = ()=>{
		setInterval(()=>{
			this.setState({
				systemTime: timeUtil.getCurrentTime()
			})
		}, 1000)
	}

	render(){
		const {userName, systemTime} = this.state
		return (
			<div className="header-view">
				<Row className="header-top">
					<Col span="6" className="logo">
						<img src="/assets/logo-ant.svg" alt="logo-ant-header"/>
						<span>后台 通用信息页面</span>
					</Col>
					<Col span="18">
						<span>欢迎，{userName}</span>
						<a href="javascript:void(0)">退出</a>
					</Col>
				</Row>
				<Row className="header-breadcrumb">
					<Col span="4" className="breadcrumb-title">
						<span>首页</span>
					</Col>
					<Col span="20" className="time-view">
						<span>{systemTime}</span>
					</Col>
				</Row>
			</div>
		)
	}
}

export default HeaderComponent