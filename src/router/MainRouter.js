/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'

// router
import Admin from './AdminRouter'

// app
import AppRoot from './App'

// page
import { 
	// Demo
	ReactPage, LessPage,
} from '../page'


class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Route path="/" render={()=>
						<Admin>
							<Switch>
								{/* Home */}
								<Route path="/home" component={Home}/>
								{/* Demo */}
								<Route path="/demo/react" component={ReactPage}/>
								<Route path="/demo/less" component={LessPage}/>
							</Switch>
						</Admin>
					}/>
				</AppRoot>
			</HashRouter>
		)
	}
}

const Home = ()=><div>Home</div>
const Demo = ()=><div>Demo</div>

export default MainRouter