/**
 * create at 10/10/18
 */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// reducer
import { switchMenu } from '../../redux/module/navMenuReducer'

// config
import { menuList } from '../../config'

// style
import './left.less'

// const 
const SubMenu = Menu.SubMenu 
const MenuItem = Menu.Item

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch) => ({
	myactions: bindActionCreators({switchMenu}, dispatch),
	dispatch,
})

class LeftComponent extends Component{
	state = {
		menuTreeNode: [],
		currentKey: ''
	}

	componentWillMount(){
		const menuTreeNode = this._renderMenu(menuList)
		this.setState({
			menuTreeNode,
			currentKey: window.location.hash.replace(/#|\?.*$/g, ''), 
		})
	}

	_renderMenu = (list)=>{
		return list.map((item)=>{
			if(item.children){
				return (
					<SubMenu title={item.title} key={item.key}>
						{this._renderMenu(item.children)}
					</SubMenu>
				)
			}
			return (
				<MenuItem key={item.key} title={item.title}>
					<NavLink to={item.key}>{item.title}</NavLink>
				</MenuItem>
			)
		})
	}

	_menuItemClick = ({item, key})=>{
		let curMenuTitle = (item && item.props && item.props.title) ? item.props.title : ''
		this.props.myactions.switchMenu({menuName: curMenuTitle})
		this.setState({
			currentKey: key,
		})
	}

	render(){
		const {currentKey} = this.state
		return (
			<div className="nav-left-view">
				<div className="menu-title">
					<img src="/assets/logo-ant.svg" alt="logo-ant"/>
					<h1>后台系统</h1>
				</div>
				<Menu theme="dark" selectedKeys={[currentKey]} onClick={this._menuItemClick}>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponent)