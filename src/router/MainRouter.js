/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'

// router
import Admin from './AdminRouter'
import Common from './CommonRouter'

// app
import AppRoot from './App'

// page
import { 
	// Home
	HomePage,
	// Demo
	ReactPage, LessPage,
	// Error
	ErrorPage,
} from '../page'


class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Switch>
						<Route path="/login" component={LoginDemo}/>
						<Route path="/common" render={()=>
							<Common>
								<Switch>
									<Route path="/common/demo" component={CommonDemo}/>
								</Switch>
							</Common>
						}>
						</Route>
						<Route path="/" render={()=>
							<Admin>
								<Switch>
									{/* Home */}
									<Route path="/home" component={HomePage}/>
									{/* Demo */}
									<Route path="/demo/react" component={ReactPage}/>
									<Route path="/demo/less" component={LessPage}/>
									<Route component={ErrorPage}/>
								</Switch>
							</Admin>
						}/>
					</Switch>
				</AppRoot>
			</HashRouter>
		)
	}
}

const CommonDemo = ()=>(<div>Common Demo</div>)
const LoginDemo = ()=>(<div>Login Demo</div>)

export default MainRouter