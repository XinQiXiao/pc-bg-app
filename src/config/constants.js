/**
 * create at 10/19/18
 * 项目常量配置
 */
/**
 * 人物状态
 */
const stateCons = [
	{
		id: 1,
		name: '咸鱼一枚'
	},
	{
		id: 2,
		name: '风华浪子'
	},
	{
		id: 3,
		name: '北大才子一枚',
	},
	{
		id: 4,
		name: '百度FE',
	},
	{
		id: 5,
		name: '创业者',
	},
	{
		id: 6,
		name: '职场老手'
	},
]
/**
 * 兴趣爱好
 */
const interestCons = [
	{
		id: 1,
		name: '游泳',
	},
	{
		id: 2,
		name: '打篮球',
	},
	{
		id: 3,
		name: '踢足球',
	},
	{
		id: 4,
		name: '跑步',
	},
	{
		id: 5,
		name: '爬山',
	},
	{
		id: 6,
		name: '骑行',
	},
	{
		id: 7,
		name: '桌球',
	},
	{
		id: 8,
		name: '麦霸',
	},
	{
		id: 9,
		name: '宅',
	},
]

/**
 * 性别
 */
const sexCons = [
	{id: 0, name: '未知'},
	{id: 1, name: '男'},
	{id: 2, name: '女'},
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