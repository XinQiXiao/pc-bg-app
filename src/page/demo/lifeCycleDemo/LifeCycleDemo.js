/**
 * create at 04/17/19
 * 参考 https://www.jianshu.com/p/4784216b8194
 */
import React, { Component } from 'react'

class LifeCycleComponent extends Component{
	state = {
		num: Math.random() * 100
	}

	_propsChange = ()=> {
		this.setState({
			num: Math.random() * 100
		})
	}

	_setLifeCycleState = () => {
		this.refs.rLifeCycle.setTheState()
	}

	_forceLifeCycleUpdate = ()=> {
		this.refs.rLifeCycle.forceItUpdate()
	}

	_unmountLifeCycle() {
		// 这里卸载父组件也会导致卸载子组件
		// React.unmountComponentAtNode(document.getElementById("container"))
	}

	_parentForceUpdate = ()=> {
		this.forceUpdate()
	}

	render(){
		console.log('father render')
		return (
			<div>
				<a href="javascript:;" className="weui_btn weui_btn_primary" 
					onClick={this._propsChange}>propsChange</a><br/>
				<a href="javascript:;" className="weui_btn weui_btn_primary" 
					onClick={this._setLifeCycleState}>setState</a><br/>
				<a href="javascript:;" className="weui_btn weui_btn_primary" 
					onClick={this._forceLifeCycleUpdate}>forceUpdate</a><br/>
				<a href="javascript:;" className="weui_btn weui_btn_primary"
				 	onClick={this._unmountLifeCycle}>unmount</a><br/>
				<a href="javascript:;" className="weui_btn weui_btn_primary" 
					onClick={this._parentForceUpdate}>parentForceUpdateWithoutChange</a><br/>
				<LifeCycle ref="rLifeCycle" num={this.state.num}></LifeCycle>
			</div>
		)
	}
}

class LifeCycle extends Component {
	constructor(props) {
		super(props)
		console.log("Initial render")
		console.log("constructor")
		this.state = {str: "hello"}
	}

	componentWillMount() {
		console.log("componentWillMount")
	}

	componentDidMount() {
		console.log("componentDidMount")
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps")
	}

	shouldComponentUpdate() {
		console.log("shouldComponentUpdate")
		return true        // 记得要返回true
	}

	componentWillUpdate() {
		console.log("componentWillUpdate")
	}

	componentDidUpdate() {
		console.log("componentDidUpdate")
	}

	componentWillUnmount() {
		console.log("componentWillUnmount")
	}

	setTheState() {
		let s = "hello"
		if (this.state.str === s) {
			s = "HELLO"
		}
		this.setState({
			str: s
		})
	}

	forceItUpdate() {
		this.forceUpdate()
	}

	render() {
		console.log("render")
		return(
			<div>
				<span>{"Props:"}<h2>{parseInt(this.props.num)}</h2></span>
				<br />
				<span>{"State:"}<h2>{this.state.str}</h2></span>
			</div>
		)
	}
}

export default LifeCycleComponent