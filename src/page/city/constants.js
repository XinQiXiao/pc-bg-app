/**
 * create at 10/26/18
 */
// util
import { timeUtil } from '../../utils'

const cityColumnsConst = [
	{
		title: '城市ID',
		dataIndex: 'id',
		width: 80,
	},
	{
		title: '城市名称',
		dataIndex: 'name',
		width: 140,
	},
	{
		title: '用车模式',
		dataIndex: 'mode',
		width: 120,
		render(target){
			return mode[target].name
		}
	},
	{
		title: '运营模式',
		dataIndex: 'op_mode',
		width: 100,
		render(target){
			return optionsMode[target].name
		}
	},
	{
		title: '城市管理员',
		dataIndex: 'city_admins',
		width: 100,
		render(targets){
			return targets.map((item)=>{
				return item.user_name
			}).join(',')
		}
	},
	{
		title: '城市开通时间',
		dataIndex: 'open_time',
		width: 180,
	},
	{
		title: '操作时间',
		dataIndex: 'update_time',
		width: 180,
		render(target){
			return timeUtil.transformTime(target)
		}
	},
	{
		title: '操作人',
		dataIndex: 'sys_user_name',
		width: 100,
	},
]

// 用车模式
const mode = [
	{
		id: 0,
		name: '全部',
	},
	{
		id: 1,
		name: '指定停车点'
	},
	{
		id: 2,
		name: '禁停区'
	},
]

// 运营模式
const optionsMode = [
	{
		id: 0,
		name: '全部'
	},
	{
		id: 1, 
		name: '自营'
	},
	{
		id: 2, 
		name: '加盟'
	}
]

const authStatus = [
	{
		id: 0,
		name: '全部',
	},
	{
		id: 1,
		name: '已授权',
	},
	{
		id: 2,
		name: '未授权',
	}
]

export {
	cityColumnsConst,
	mode as modeConst,
	optionsMode as optionsModeConst,
	authStatus as authStatusConst,
}