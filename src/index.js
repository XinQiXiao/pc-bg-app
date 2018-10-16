import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import {RouterRoot} from './router'
import * as serviceWorker from './serviceWorker'

// store
import { createStore } from './redux'

// const 
const store = createStore()

const RootApp = ()=>{
	return (
		<Provider store={store}>
			<RouterRoot />
		</Provider>
	)
}

ReactDOM.render(<RootApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
