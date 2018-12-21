/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter, Switch, Redirect} from 'react-router-dom'

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
	// Form
	LoginFormPage, RegisterFormPage,
	// Table
	BasicTablePage, HighTablePage,
	// Rich 
	RichPage,
	// Chart
	BarChartPage, PieChartPage, LineChartPage,
	// City 
	CityPage,
	// Bike
	BikeMapPage,
	// user
	UserListPage,
	// Demo
	ReactPage, LessPage, ApiPage,
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
									{/* Form */}
									<Route path="/form/login" component={LoginFormPage}/>
									<Route path="/form/reg" component={RegisterFormPage}/>
									{/* Table */}
									<Route path="/table/basic" component={BasicTablePage}/>
									<Route path="/table/high" component={HighTablePage}/>
									{/* Rich */}
									<Route path="/rich" component={RichPage}/>
									{/* Chart */}
									<Route path="/charts/bar" component={BarChartPage}/>
									<Route path="/charts/pie" component={PieChartPage}/>
									<Route path="/charts/line" component={LineChartPage}/>
									{/* City */}
									<Route path="/city" component={CityPage}/>
									{/* Bike */}
									<Route path="/bikeMap" component={BikeMapPage}/>
									{/* User */}
									<Route path="/user" component={UserListPage}/>
									{/* Demo */}
									<Route path="/demo/react" component={ReactPage}/>
									<Route path="/demo/less" component={LessPage}/>
									<Route path="/demo/api" component={ApiPage}/>
									<Redirect to="/home"/>
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