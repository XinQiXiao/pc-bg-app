/**
 * create at 10/25/18
 */
import React, { Component } from 'react'
import { Card, Button, Modal, } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class RichPage extends Component{
	state = {
		editorState: '',
		showRich: false,
		contentState: null,
	}

	_clearClick = ()=>{
		this.setState({
			editorState: '',
			contentState: null,
		})
	}

	_getHTMLContent = ()=>{
		this.setState({
			showRich: true
		})
	}

	_onContentChange = (contentState)=>{
		this.setState({
			contentState
		})
	}
	_onEditorChange = (editorState)=>{
		this.setState({
			editorState
		})
	}

	render(){
		const {editorState, showRich, contentState} = this.state
		return (
			<div>
				<Card>
					<Button type="primary" onClick={this._clearClick}>清空内容</Button>
					<Button type="primary" onClick={this._getHTMLContent} style={{marginLeft: 10}}>获取HTML文本内容</Button>
				</Card>
				<Card title="富文本" style={{marginTop: 10}}>
					<Editor 
						editorState={editorState}
						onContentStateChange={this._onContentChange}
						onEditorStateChange={this._onEditorChange}
					/>
				</Card>
				<Modal title="富文本内容"
					visible={showRich}
					footer={null}
					onCancel={()=> this.setState({showRich: false})}
				>
					{draftToHtml(contentState)}
				</Modal>
			</div>
		)
	}
}

export default RichPage