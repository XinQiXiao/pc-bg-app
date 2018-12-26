/**
 * create at 12/26/18
 */
const isDev = process.env.NODE_ENV !== 'production'

const mockUrl = 'https://www.easy-mock.com/mock/5b6aeb1ca40bfb27425bbaee/mockapi'
const devUrl = 'http://localhost:8095/pc_api/pc'
const prdUrl = ''

export {
	isDev,
	mockUrl,
	devUrl,
	prdUrl,
}