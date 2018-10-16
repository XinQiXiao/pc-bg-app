/**
 * create at 10/16/18
 */
const SWITCH_MENU = 'PCAPP/NAVMENU_SWITCH_MENU'

const initialState = {
	menuName: '首页',
}

export default (state = initialState, action)=>{
	switch(action.type){
		case SWITCH_MENU:
			return {
				...state,
				menuName: action.menuName,
			}
		default:
			return state
	}
}

export function switchMenu({menuName = ''}={}){
	return {
		type: SWITCH_MENU,
		menuName
	}
}