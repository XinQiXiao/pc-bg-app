/**
 * create at 01/07/19
 */
import React, { Component } from 'react'
import { Row } from 'antd'

class LoginRouter extends Component{
	render(){
		const { children } = this.props
		return (
			<div>
				<Row style={{position: 'relative', padding: 20}}>
					{children}
				</Row>
			</div>
		)
	}
}

export default LoginRouter