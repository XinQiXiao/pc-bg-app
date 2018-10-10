/**
 * create at 10/10/18
 */
import React, { Component } from 'react'
import { Row, Col } from 'antd'

// style
import '../style/common.less'

// components
import { NavLeft } from '../components'

class AdminRouter extends Component{
	render(){
		return (
			<Row className="container">
				<Col span={4} className="nav-left">
					<NavLeft />
				</Col>
				<Col span={20} className="main">
					<Row className="content">
						{this.props.children}
					</Row>
				</Col>
			</Row>
		)
	}
}

export default AdminRouter