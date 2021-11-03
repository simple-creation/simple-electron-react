import {ADD_TO_USER,DELETE_USER} from '../actions/users-actions'

const initialState = {
	userData : [
		{
			id: 'zhangsan@qq.com',
			name: '张三',
			role: 'Developer'
		},
		{
			id: 'lisi@qq.com',
			name: '李四',
			role: 'Maintainer'
		}
	]
}

export default function(state=initialState, action){ //一个reducer需要处理不同的action类型
	switch (action.type){
		case ADD_TO_USER: 
			return {
				...state,
				userData: [...state.userData, action.payload]  //action.payload种的数据与现有的state合并以创建一个新的state
			}
			break;
	
		case DELETE_USER:
			return {
				...state,
				userData: state.userData.filter(item => item.id !== action.payload.id )
			}
			break;

		default:
			return state;
			break;
	}
}