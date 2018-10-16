/**
 * create at 10/10/18
 */
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, } from 'antd'

// config
import { menuList } from '../../config'

// style
import './left.less'

// const 
const SubMenu = Menu.SubMenu 
const MenuItem = Menu.Item

class LeftComponent extends Component{
	state = {
		menuTreeNode: []
	}

	componentWillMount(){
		const menuTreeNode = this._renderMenu(menuList)
		this.setState({
			menuTreeNode
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

	render(){
		return (
			<div className="nav-left-view">
				<div className="menu-title">
					<img src="/assets/logo-ant.svg" alt="logo-ant"/>
					<h1>后台系统</h1>
				</div>
				<Menu theme="dark">
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	}
}

export default LeftComponent