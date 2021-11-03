import React,{Component} from 'react';
import {BasePage} from 'simple-framework/base'

export default class Task extends BasePage {
  constructor(props) {
    super(props);
  }
  pageId='page-test';
  componentDidMount() {
    super.componentDidMount();
  }

  render(){
    return (
      <div>我是任务管理</div>
    );
  }
}

