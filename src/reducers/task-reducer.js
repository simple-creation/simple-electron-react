import {ADD_TO_TASK} from '../actions/task-actions'

export default function(state={}, action){ //一个reducer需要处理不同的action类型
	switch (action.type){
		case ADD_TO_TASK: 
			console.log('task:',state);
			return state;
			break;

		default:
			return state;
			break;
	}
}