/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter} from 'react-router-dom'

// router
import Admin from './AdminRouter'

// app
import AppRoot from './App'

// page
import { ReactPage } from '../page'


class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Route path="/" render={()=>
						<Admin>
							<Route path="/home" component={Home}/>
							<Route path="/demo/react" component={ReactPage}/>
						</Admin>
					}/>
				</AppRoot>
			</HashRouter>
		)
	}
}

const Home = ()=><div>Home</div>

export default MainRouter