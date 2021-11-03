import React, { Component, PureComponent } from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';



import Home from "@pages/home"
import Task from "@pages/task"
import Test from "@pages/test"
// 使用异步组件加载工具方法加载组件
//import asyncComponent from '../components/route/AsyncComponent';
// const AsyncHome = asyncComponent(() => import('@pages/Basic'));
// const AsyncTask = asyncComponent(() => import('@pages/Task'));



export default class App extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/task/:id" component={Task} />
          <Route path="/test" component={Test} />
        </div>
      </Router>
      // // 使用异步组件
      // <BrowserRouter>
      //     <Switch>
      //         <Route path='/' component={AsyncHome} />
      //         <Route path='/login' component={AsyncTask} />
      //        
      //     </Switch>
      // </BrowserRouter>

    );

  }
}

