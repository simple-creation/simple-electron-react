import React,{Component} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Space, Divider } from 'antd';
import { EditOutlined, RollbackOutlined, CheckOutlined } from '@ant-design/icons';
import '@styles/ProjectInfo.less';

export default class ProjectInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hideContent : true,
			content : ''
		}
		this.content = "";
	}

	editCKEditor(){
		this.setState({
			hideContent : false
		})
	}

	cancelCKEditor(){
		this.setState({
			hideContent : true
		})
	}

	saveCKEditor(){
		let value = this.content.replace("<p>","").replace("</p>","");
		//console.log(value);
		this.setState({
			content: value
		})
		this.cancelCKEditor();
	}

	render(){
		const { hideContent, content } = this.state;

		return(
			<React.Fragment>
				<div className="item">
					<div className="item_head">
						<Space>
							<span>项目目标</span>
							<Divider type="vertical" />
							{ hideContent && <span className="toEdit" onClick={this.editCKEditor.bind(this)}><EditOutlined />编辑</span>}
							{ !hideContent && <Space>
								<span className="toSave" onClick={this.saveCKEditor.bind(this)}><CheckOutlined />保存</span>
								<span className="toCancel" onClick={this.cancelCKEditor.bind(this)}><RollbackOutlined />取消</span>
							</Space>}
						</Space>
					</div>
					<div className="item_body">
						<div className = {`riceTextEditor ${hideContent ? 'hideHeader' : ''}`}>
						<CKEditor
		                    editor = { ClassicEditor }
		                    disabled = { hideContent }
		                    data = { content }
		                    onReady = { editor => {
		                        
		                    } }
		                    onChange = { ( event, editor ) => {
		                      	const data = editor.getData();
		                      	this.content = data;
		                    } }
		                />
		                </div>
					</div>
				</div>
			</React.Fragment>
		)
		
	}
}
