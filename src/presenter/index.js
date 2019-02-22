/**
 * create at 12/16/18
 * presenter 用于分离页面 直接用 axios 而要组织复杂的参数且存在 不同环境时需要根据每个接口配置不能参数
 */
import * as bookPresenters from './bookPresenter'
import * as bikePresenters from './bikePresenter'
import * as cityPresenters from './cityPresenter'
import * as userPresenters from './userPresenter'
import * as orderPresenters from './orderPresenter'
import * as commonPresenters from './commonPresenter'
import * as workAppPresenters from './workAppPresenter'

export {
	// book
	bookPresenters,
	bikePresenters,
	cityPresenters,
	userPresenters,
	orderPresenters,
	commonPresenters,
	workAppPresenters,
}