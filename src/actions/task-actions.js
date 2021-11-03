export const ADD_TO_TASK = 'ADD_TO_TASK';

export function addToTask(store){ //定义一个action,有必须的type和可选的payload
	console.log("store",store.getState());
	return{
		type: ADD_TO_TASK
	}
}

