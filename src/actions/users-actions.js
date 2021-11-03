export const ADD_TO_USER = 'ADD_TO_USER';
export const DELETE_USER = 'DELETE_USER';

export function addToUser(id, name, role){ //定义一个action,有必须的type和可选的payload
	return{
		type: ADD_TO_USER,
		payload: {id, name, role}
	}
}

export function deleteToUser(id){ //定义一个action,有必须的type和可选的payload
	return{
		type: DELETE_USER,
		payload: { id }
	}
}