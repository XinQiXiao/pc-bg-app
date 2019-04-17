/**
 * create at 10/09/18
 */
import React, { Component } from 'react'
import {Route, HashRouter, Switch, Redirect} from 'react-router-dom'

// router
import Admin from './AdminRouter'
import Common from './CommonRouter'
import Login from './LoginRouter'

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
	// order
	OrderDetailsPage, OrderListPage,
	// Demo
	ReactPage, LessPage, ReduxPage, LifeCyclePage, ReactContextPage,
	// book 
	BookCategoryPage, BookInfoPage,
	// workApp
	EmployeesPage,
	/// login router 
	LoginPage,
	// Error
	ErrorPage,
} from '../page'

class MainRouter extends Component{
	render(){
		return(
			<HashRouter>
				<AppRoot>
					<Switch>
						<Route path="/common" render={()=>
							<Common>
								<Switch>
									<Route path="/common/order/detail/:orderId" component={OrderDetailsPage}/>
								</Switch>
							</Common>
						}>
						</Route>
						<Route path="/admin" render={()=>
							<Admin>
								<Switch>
									{/* Home */}
									<Route path="/admin/home" component={HomePage}/>
									{/* UI */}
									<Route path="/admin/ui/buttons" component={ButtonPage}/>
									<Route path="/admin/ui/modals" component={ModalPage}/>
									<Route path="/admin/ui/loadings" component={LoadingPage}/>
									<Route path="/admin/ui/notification" component={NotificationPage}/>
									<Route path="/admin/ui/messages" component={MessagePage}/>
									<Route path="/admin/ui/tabs" component={TabPage}/>
									<Route path="/admin/ui/gallery" component={GalleryPage}/>
									<Route path="/admin/ui/carousel" component={CarouselPage}/>
									{/* Form */}
									<Route path="/admin/form/login" component={LoginFormPage}/>
									<Route path="/admin/form/reg" component={RegisterFormPage}/>
									{/* Table */}
									<Route path="/admin/table/basic" component={BasicTablePage}/>
									<Route path="/admin/table/high" component={HighTablePage}/>
									{/* Rich */}
									<Route path="/admin/rich" component={RichPage}/>
									{/* Chart */}
									<Route path="/admin/charts/bar" component={BarChartPage}/>
									<Route path="/admin/charts/pie" component={PieChartPage}/>
									<Route path="/admin/charts/line" component={LineChartPage}/>
									{/* City */}
									<Route path="/admin/city" component={CityPage}/>
									{/* Bike */}
									<Route path="/admin/bikeMap" component={BikeMapPage}/>
									{/* User */}
									<Route path="/admin/user" component={UserListPage}/>
									{/* order */}
									<Route path="/admin/order" component={OrderListPage}/>
									{/* Demo */}
									<Route path="/admin/demo/react" component={ReactPage}/>
									<Route path="/admin/demo/less" component={LessPage}/>
									<Route path="/admin/demo/redux" component={ReduxPage}/>
									<Route path="/admin/demo/lifeCycle" component={LifeCyclePage}/>
									<Route path="/admin/demo/context" component={ReactContextPage}/>
									{/* book */}
									<Route path="/admin/book/category" component={BookCategoryPage}/>
									<Route path="/admin/book/bookInfo" component={BookInfoPage}/>
									{/* workApp */}
									<Route path="/admin/workApp/employees" component={EmployeesPage}/>
									<Redirect to="/admin/home"/>
									<Route component={ErrorPage}/>
								</Switch>
							</Admin>
						}/>
						<Route path="/" render={()=> 
							<Login>
								<Switch>
									<Route path="/login" component={LoginPage}/>
									<Redirect to="/login"/>
								</Switch>
							</Login>
						}/>
					</Switch>
				</AppRoot>
			</HashRouter>
		)
	}
}

export default MainRouter