/**
 * create at 10/19/18
 * 项目常量配置
 */
/**
 * 人物状态
 */
const stateCons = [
	'咸鱼一枚',
	'风华浪子',
	'北大才子一枚',
	'百度FE',
	'创业者',
	'职场老手'
]
/**
 * 兴趣爱好
 */
const interestCons = [
	'游泳',
	'打篮球',
	'踢足球',
	'跑步',
	'爬山',
	'骑行',
	'桌球',
	'麦霸',
	'宅',
]

/**
 * 性别
 */
const sexCons = [
	{id: 1, name: '男'},
	{id: 2, name: '女'},
	{id: 0, name: '未知'},
]

/**
 * 婚否
 */
const marryCons = [
	{id: 0, name: '未婚'},
	{id: 1, name: '已婚'},
]

/**
 * 城市
 */
const citys = [
	{
		id: 0,
		name: '全部'
	},
	{
		id: 1,
		name: '北京'
	},
	{
		id: 2,
		name: '上海'
	},
	{
		id: 3,
		name: '广州'
	}
]

const orderStatus = [
	{
		id: 0,
		name: '全部',
	},
	{
		id: 1,
		name: '进行中',
	},
	{
		id: 2,
		name: '行程结束',
	},
]

/**
 * 表单 类型
 * 现支持类型有 Select/Input/CheckBox/(自定义)QueryTime
 */
const formFilterType = {
	SELECT: 'FORM_SELECT',
	QUERY_TIME: 'FORM_QUERY_TIME',
	DATE_PICKER: 'FORM_DATE_PICKER',
	INPUT: 'FORM_INPUT',
	CHECK_BOX: 'FORM_CHECK_BOX'
}

/**
 * filter button 类型
 * 现支持 query(查询、提交表单)、reset(重置表单)
 */
const formBtnType = {
	QUERY: 'OPTION_BUTTON_TYPE_QUERY',
	RESET: 'OPTION_BUTTON_TYPE_RESET'
}

export {
	stateCons,
	interestCons,
	sexCons,
	marryCons,
	citys as citysConst,
	orderStatus as orderStatusConst,
	formFilterType,
	formBtnType,
}