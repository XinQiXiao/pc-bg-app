/**
 * create at 10/16/18
 */
import { combineReducers } from 'redux'

import navMenu from './module/navMenuReducer'

const reducer = combineReducers({
	navMenu,
})

export default reducer