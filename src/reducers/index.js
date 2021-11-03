import { combineReducers } from "redux"
import task from './task-reducer'
import users from './users-reducer'

const allReducers = {
	task,
	users
}

const rootReducer = combineReducers(allReducers) //一个store中使用combineReducers函数组合多个reducer
export default rootReducer;