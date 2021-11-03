import React,{Component} from 'react';
import {SimplePage} from 'simple-framework/base'
import {Block0,Block3,Block5} from 'simple-framework';
// const {Block0,Block3,Block5} = Section;
export default class Test extends SimplePage {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    super.componentDidMount();
    this.appendSection(Block0);
    this.appendSection(Block3);
    this.appendSection(Block5);
    this.renderPage();
  }

  render(){
    return (
      <div>我是需求管理
        {this.sections()}
      </div>
    );
  }
}

