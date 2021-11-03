import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Menu , Input, Button, Space, Modal, Radio } from 'antd';
import '@styles/UserLists.less';
import store from '../../store.js';
import UserLists from "@components/UserLists";
import ProjectInfo from "@components/ProjectInfo";
import { addToUser } from '../../actions/users-actions'

const { Search } = Input;

class Basic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current : 1,
			modalVisible: false
		};
		this.userId = React.createRef();
		this.userName = React.createRef();
	}

  	handleClick = e => {
	    this.setState({ current: e.key });
	};

	onSearch(){
		console.log(11);
	}

	showModel(){
		this.setState({
			modalVisible:true
		})
	}

	handleOk(){
		const { dispatch } = this.props;
		let id = this.userId.current.input.value;
		let name = this.userName.current.input.value;
		let userrole = this.state.userRole;
		dispatch(addToUser(id, name, userrole));
		this.handleCancel();
	}

	handleCancel(){
		this.setState({
			modalVisible:false
		})
	}

	handleChange(e){
		this.setState({
            userRole:e.target.value
        })
	}
  
	render(){
		const { userRole, modalVisible } = this.state;

		return(
			<div className="basicContainer">
				<Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current.toString()]} mode="horizontal">
					<Menu.Item key="1">
						基础信息
					</Menu.Item>
					<Menu.Item key="2">
						项目成员
					</Menu.Item>
				</Menu>
				{this.state.current == 2 && <Space className="addMember">
					<Search placeholder="input search text" allowClear onSearch={this.onSearch} style={{ width: 200 }} />
					<Button type="primary" onClick={this.showModel.bind(this)}>添加成员</Button>
				</Space>}
				<div className="container">
					{this.state.current == 1 ? <ProjectInfo /> : <UserLists />}
				</div>
				<Modal title = "添加成员"  visible={modalVisible} onOk={this.handleOk.bind(this)} confirmLoading={this.confirmLoading} onCancel={this.handleCancel.bind(this)}>
					<div className="addId">
						<div>账号:</div>
						<Input ref={this.userId} placeholder="请输入账号信息" />
					</div>
					<div className="addName">
						<div>用户:</div>
						<Input ref={this.userName} placeholder="请输入用户姓名" />
					</div>
					<div className="addRole">
						<div>权限:</div>
						<Radio.Group onChange={this.handleChange.bind(this)} >
					      <Radio value={"Visitor"} checked={userRole == 'Visitor'}>Visitor</Radio>
					      <Radio value={"Developer"} checked={userRole == 'Developer'}>Developer</Radio>
					      <Radio value={"Maintainer"} checked={userRole == 'Maintainer'}>Maintainer</Radio>
					    </Radio.Group>
					</div>
				</Modal>
			</div>
			)
		
	}
}

const stateToProps=(state)=>{
  return{
    userData:state.users
  }
}


export default connect(stateToProps)(Basic);