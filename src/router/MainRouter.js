/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter, } from 'react-router-dom'

// components
import AppRoot from './App'

class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Route component={Demo}/>
				</AppRoot>
			</HashRouter>
		)
	}
}

const Demo = ()=><div>Demo</div>

export default MainRouter