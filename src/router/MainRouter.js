/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter} from 'react-router-dom'

// router
import Admin from './AdminRouter'

// app
import AppRoot from './App'


class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Route path="/" render={()=>
						<Admin>
							<Route path="/home" component={Home}/>
							<Route path="/demo/react/doc" component={Demo}/>
							<Route path="/demo/react/ret" component={Demo2}/>
						</Admin>
					}/>
				</AppRoot>
			</HashRouter>
		)
	}
}

const Home = ()=><div>Home</div>
const Demo = ()=><div>react-doc</div>
const Demo2 = ()=><div>react-ret</div>

export default MainRouter