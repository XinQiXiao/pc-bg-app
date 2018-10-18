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
	// UI 
	ButtonPage, ModalPage, LoadingPage, NotificationPage,
	MessagePage, TabPage, GalleryPage, CarouselPage,
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
									{/* UI */}
									<Route path="/ui/buttons" component={ButtonPage}/>
									<Route path="/ui/modals" component={ModalPage}/>
									<Route path="/ui/loadings" component={LoadingPage}/>
									<Route path="/ui/notification" component={NotificationPage}/>
									<Route path="/ui/messages" component={MessagePage}/>
									<Route path="/ui/tabs" component={TabPage}/>
									<Route path="/ui/gallery" component={GalleryPage}/>
									<Route path="/ui/carousel" component={CarouselPage}/>
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