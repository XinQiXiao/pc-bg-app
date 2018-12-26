/**
 * create at 11/01/18
 */
import React, { Component } from 'react'
import { Card, message, notification, } from 'antd'
import _ from 'lodash'

// components
import { FilterForm } from '../../components'

// presenter
import {bikePresenters} from '../../presenter'

// config
import { consConfig } from '../../config'

// const
const { fetchBikeList } = bikePresenters 
const { formFilterType, formBtnType, citysConst, orderStatusConst, } = consConfig

const FORM_LIST = [
	{
		type: formFilterType.SELECT,
		field: 'city',
		label: '城市',
		initialValue: citysConst[0].id,
		list: citysConst,
	},
	{
		type: formFilterType.QUERY_TIME,
		placeholder: '选择时间',
		itemStyle: {marginLeft: 10}
	},
	{
		type: formFilterType.SELECT,
		field: 'order_status',
		label: '订单状态',
		initialValue: orderStatusConst[0].id,
		list: orderStatusConst,
		itemStyle: {marginLeft: 10},
		innerStyle: {width: 100},
	},
]

class BikeMapComponent extends Component{
	state = {
		bikeData: null
	}
	params={

	}
	map = '' // 地图对象

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const ret = await fetchBikeList({params: this.params})
			this.setState({
				bikeData: ret
			})
			// 初始化地图
			this._initMap()
		}catch(e){
			console.log('_searchClick e=>', e)
			message.error(`获取车辆地图 err=${e.message}`)
		}
	}

	_searchClick = async ({code, formValues})=>{
		try{
			notification.info({
				message: '查询内容',
				description: `city=${formValues.city} start_time=${formValues.start_time}
				end_time=${formValues.end_time} order_status=${formValues.order_status}`
			})
			await this._requestData()
		} catch(e){
			console.log('_searchClick e=>', e)
			message.error(`查询失败 err=${e.message}`)
		}
	}

	_resetClick = async ()=>{
		// 刷新数据
		await this._requestData()
	}

	// 初始化地图
	_initMap = ()=>{
		try{
			const {bike_list, route_list, service_list,} = this.state.bikeData
			// 初始化地图
			this.map = new window.BMap.Map('bikeMap')
			// 设置地图中心坐标点
			// this.map.centerAndZoom('北京', 11)
			// 添加地图控件
			this._addMapControl()
			// 添加路线图
			this._drawBikeRoute(route_list)
			// 添加服务区
			this._drawServerArea(service_list)
			// 添加车辆分布
			this._drawBikeDistribution(bike_list)
		}catch(e){
			console.log('_initMap e=>', e)
			message.error(`初始化地图失败 err=${e.message}`)
		}
	}
	// 添加地图控件
	_addMapControl = ()=>{
		this.map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
		this.map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
	}
	// 绘制路线图
	_drawBikeRoute = (list)=>{
		// 处理list
		let positionList = []
		list.forEach((item)=>{
			let curArr = item.split(',')
			positionList.push({
				lon: curArr[0],
				lat: curArr[1]
			})
		})
		// 添加起始坐标点
		let startPoint = ''
		let endPoint = ''
		if(_.isArray(positionList) && positionList.length > 0){
			// 起始 坐标 、icon, 坐标依赖marker
			const firstPosition = positionList[0]
			startPoint = new window.BMap.Point(firstPosition.lon, firstPosition.lat)
			let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
				imageSize: new window.BMap.Size(36, 42),
				anchor: new window.BMap.Size(18, 42),
			})
			let startMarker = new window.BMap.Marker(startPoint, {icon: startIcon})
			this.map.addOverlay(startMarker)

			// 结束 坐标、icon, 坐标依赖marker
			const lastPosition = positionList[positionList.length-1]
			endPoint = new window.BMap.Point(lastPosition.lon, lastPosition.lat)
			let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
				imageSize: new window.BMap.Size(36, 42),
				anchor: new window.BMap.Size(18, 42),
			})
			let endMarker = new window.BMap.Marker(endPoint, {icon: endIcon})
			this.map.addOverlay(endMarker)

			// 连接路线图
			let trackPoint = []
			positionList.forEach((item)=>{
				trackPoint.push(new window.BMap.Point(item.lon, item.lat))
			})
			let polylines = new window.BMap.Polyline(trackPoint, {
				strokeColor: '#4136EF', strokeWeight: 2, strokeOpacity: 1.0
			})
			this.map.addOverlay(polylines)

			// 重新设置 地图中间点坐标
			this.map.centerAndZoom(endPoint, 11)
		}
	}

	// 绘制服务区
	_drawServerArea = (areaList)=>{
		if(_.isArray(areaList) && areaList.length > 0){
			let trackPoint = []
			areaList.forEach((item)=>{
				trackPoint.push(new window.BMap.Point(item.lon, item.lat))
			})
			let polylines = new window.BMap.Polygon(trackPoint, {
				strokeColor: '#EF4136', strokeWeight: 3, strokeOpacity: 1.0, 
				fillColor: '#FF8605', fillOpacity: 0.3
			})
			this.map.addOverlay(polylines)
		}
	}
	// 绘制车辆分布情况
	_drawBikeDistribution = (list)=>{
		let bikeList = []
		list.forEach((item)=>{
			let bikeArr = item.split(',')
			bikeList.push({
				lon: bikeArr[0],
				lat: bikeArr[1]
			})
		})
		bikeList.forEach((item)=>{
			// 起始 坐标 、icon, 坐标依赖marker
			let bikePoint = new window.BMap.Point(item.lon, item.lat)
			let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
				imageSize: new window.BMap.Size(36, 42),
				anchor: new window.BMap.Size(18, 42),
			})
			let bikeMarker = new window.BMap.Marker(bikePoint, {icon: bikeIcon})
			this.map.addOverlay(bikeMarker)
		})
	}

	render(){
		const {bikeData} = this.state
		return (
			<div>
				<Card>
					<FilterForm 
						formList={FORM_LIST}
						options={[
							{
								btnType: 'primary',
								type: formBtnType.QUERY,
								optionItemPress: this._searchClick,
								style: {marginLeft: 20},
								title: '查询',
							},
							{
								type: formBtnType.RESET,
								optionItemPress: this._resetClick,
								style: {marginLeft: 20},
								title: '重置',
							},
						]}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<div>共{bikeData && bikeData.total_count ? bikeData.total_count : 0}辆</div>
					<div id="bikeMap" style={{height: 500, marginTop: 10}}></div>
				</Card>
			</div>
		)
	}
}

export default BikeMapComponent