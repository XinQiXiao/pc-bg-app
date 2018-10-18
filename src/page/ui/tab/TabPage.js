/**
 * create at 10/18/18
 */
import React, { Component } from 'react'
import { Card, Tabs, message, Icon} from 'antd'

// style
import '../ui.less'

// const 
const TabPane = Tabs.TabPane

const PANES = [
	{
		title: 'Tab A',
		content: 'Content of Tab Pane A.',
		key: '1'
	},
	{
		title: 'Tab B',
		content: 'Content of Tab Pane B.',
		key: '2'
	},
	{
		title: 'Tab C',
		content: 'Content of Tab Pane C.',
		key: '3', 
		closeable: false,
	},
]

class TabPage extends Component{
	state = {
		activeKey: PANES[0].key,
		panes: PANES
	}
	newTabIndex = 0

	_tabOnChange = (key)=>{
		message.info(`_tabOnChange key=${key}`)
	}

	_tabEditOnChange = (key)=>{
		this.setState({
			activeKey: key
		})
	}

	_tabOnEdit = (targetKey, action)=>{
		this[action](targetKey)
	}
	add = ()=>{
		const { panes } = this.state
		const activeKey = `newTab${this.newTabIndex++}`
		panes.push({
			title: 'new Tab'+activeKey, 
			content: 'Content of new Tab',
			key: activeKey
		})
		this.setState({panes, activeKey})
	}
	remove = (targetKey)=>{
		let { activeKey, panes } = this.state
		let lastIndex
		panes.forEach((pane, i)=>{
			if(pane.key === targetKey){
				lastIndex = i - 1
			}
		})
		const newPanes = panes.filter(pane => pane.key !== targetKey)
		if(lastIndex >= 0 && activeKey === targetKey){
			activeKey = newPanes[lastIndex].key
		}
		this.setState({
			panes: newPanes,
			activeKey
		})
	}

	render(){
		const { activeKey, panes, } = this.state
		return (
			<div >
				<Card title="Tabs页标签" className="ui-card-wrap">
					<Tabs defaultActiveKey="2" onChange={this._tabOnChange}>
						<TabPane tab="Tab 1" key="1">
							Content of Tab Pane 1
						</TabPane>
						<TabPane tab="Tab 2" key="2">
							Content of Tab Pane 2
						</TabPane>
						<TabPane tab="Tab 3" key="3">
							Content of Tab Pane 3
						</TabPane>
					</Tabs>
				</Card>
				<Card title="Tabs带图的页签" className="ui-card-wrap">
					<Tabs defaultActiveKey="1">
						<TabPane tab={<span><Icon type="apple"/>apple</span>} key="1">
							Content of Tab Pane 1.
						</TabPane>
						<TabPane tab={<span><Icon type="android"/>android</span>} key="2">
							Content of Tab Pane 2.
						</TabPane>
						<TabPane tab={<span><Icon type="windows"/>windows</span>} key="3" disabled>
							Content of Tab Pane 2.
						</TabPane>
					</Tabs>
				</Card>
				<Card title="动态Tabs页签" className="ui-card-wrap">
					<Tabs activeKey={activeKey}
						type="editable-card"
						onChange={this._tabEditOnChange}
						onEdit={this._tabOnEdit}
					>
						{
							panes.map((item)=>{
								return (
									<TabPane key={item.key} tab={item.title}>
										{item.content}
									</TabPane>
								)
							})
						}
					</Tabs>
				</Card>
			</div>
		)
	}
}

export default TabPage