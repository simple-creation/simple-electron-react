import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import store from '../store.js';
import { deleteToUser } from '../actions/users-actions'

class UserLists extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '账号',
				dataIndex: 'id',
				key: 'id'
			},{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
				render: text => <a>{text}</a>
			},{
				title: '角色',
				dataIndex: 'role',
				key: 'role'
			},{
				title: '操作',
				key: 'action',
				render: (text, record) => (
			      <div size="middle">
			        <a onClick={this.deleteUser.bind(this,record)}>删除</a>
			      </div>
			    ),
			}
		];
	}

	deleteUser = record => {
		store.dispatch(deleteToUser(record.id));
	}

	render(){
		let userData = store.getState().users;

		return(
			<Table rowKey={"id"} columns={this.columns} dataSource={userData.userData} />
		)
		
	}
}

const stateToProps=(state)=>{
  return{
    userData:state.users
  }
}


export default connect(stateToProps)(UserLists);