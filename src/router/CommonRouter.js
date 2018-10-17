/**
 * create at 10/17/18
 */
import React, { Component } from 'react'
import { Row } from 'antd'

// components
import { Header } from '../components'

class CommonRouter extends Component{
	render(){
		const { children } = this.props
		return (
			<div >
				<Row className="common-router-header">
					<Header routerType="common"/>
				</Row>
				<Row style={{position: 'relative', padding: 20}}>
					{children}
				</Row>
			</div>
		)
	}
}

export default CommonRouter