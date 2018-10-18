/**
 * create at 10/18/18
 */
import React, { Component } from 'react'
import { Card, Row, Col, Modal,} from 'antd'

// style
import '../ui.less'

// const 
const { Meta } = Card

class GalleryPage extends Component{
	state = {
		currentImg: '',
		modalShow: false,
	}
	imgsList = []

	componentWillMount(){
		const images = this._initImgs()
		this.imgsList = images.map((row)=> row.map((item)=>
				<Card style={{marginBottom: 10}}
					cover={<img src={'/gallery/'+item} alt={item}/>}
					key={item}
					onClick={()=> this._cardClick(item)}
				>
					<Meta title="example" description={`icon path /gallery/${item}`}/>
				</Card>
			)
		)
	}

	_cardClick = (item)=>{
		this.setState({
			currentImg: '/gallery/'+item,
			modalShow: true,
		})
	}

	_initImgs(){
		let imgArr = []
		for(let i=0; i<5; i++){
			let itemArr = []
			for(let j=1; j<=5; j++){
				itemArr.push(`${i*5+j}.png`)
			}
			imgArr.push(itemArr)
		}
		return imgArr
	}

	render(){
		return (
			<div >
				<Row gutter={10}>
					<Col md={5}>
						{this.imgsList[0]}
					</Col>
					<Col md={5}>
						{this.imgsList[1]}
					</Col>
					<Col md={5}>
						{this.imgsList[2]}
					</Col>
					<Col md={5}>
						{this.imgsList[3]}
					</Col>
					<Col md={5}>
						{this.imgsList[4]}
					</Col>
				</Row>
				<Modal
					title="图片画廊"
					visible={this.state.modalShow}
					onCancel={()=> {this.setState({modalShow: false})}}
					footer={null}
				>
					<img src={this.state.currentImg} alt={this.state.currentImg}
						style={{width: '100%', height: '90%'}}
					/>
				</Modal>
			</div>
		)
	}
}

export default GalleryPage