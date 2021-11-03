import { createStore } from "redux"; //从redux包中引入createStore()方法
import rootReducer from './reducers/index'

const store = createStore(rootReducer); //创建一个Redux存储区,存储在Redux存储区中的数据可以被直接访问，但只能通过提供的reducer进行更新
export default store;