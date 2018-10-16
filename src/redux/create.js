/**
 * create at 10/16/18
 */
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducer from './reducer'

export default ()=>createStore(reducer, applyMiddleware(logger))