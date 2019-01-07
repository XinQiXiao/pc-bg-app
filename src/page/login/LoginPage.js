/**
 * create at 01/07/19
 */
import React, { Component } from 'react'
import { Button, Card, message } from 'antd'

class LoginPage extends Component{
	_locinClick = ()=> {
		try{
			window.location.href = "/#/admin/home/"
		}catch(e){
			message.error(`login in fail err=${e.message}`)
		}
	}

	render(){
		return (
			<div>
				<Card>
					<Button type="primary" onClick={this._locinClick}>login</Button>
				</Card>
			</div>
		)
	}
}

export default LoginPage