/**
 * create at 12/18/18
 */
import React, { Component } from 'react'

import axiosApi from '../../../axios'

class ApiContainer extends Component{
	body = {}

	componentDidMount(){
		this._requestData()
	}

	_requestData = async ()=>{
		try{
			const ret = await axiosApi.ajax({
				url: 'book/getBookCategorys',
				baseUrlType: 1,
				method: 'POST',
				body: {
					...this.body,
				},
				data: {
					isShowLoading: true,
				}
			})
			console.log('ret=>', ret)
		}catch(e){
			console.log('_requestData e=>', e)
		}
	}

	render(){
		return (
			<div>
				ApiContainer
			</div>
		)
	}
}

export default ApiContainer