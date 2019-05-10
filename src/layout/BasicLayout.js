import React, { Component } from 'react';
import { Router, Route, Switch, Redirect} from "dva/router";
import { connect } from "dva";
import { Layout, Icon } from 'antd';
import styles from './BasicLayout.less';
import IndexPage from "../routes/IndexPage";
import Count from "../routes/count/Count";
import Epic from "../pages/work/Epic";
import Aside from './Aside';
const { Header, Content, Footer } = Layout;

class BasicLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    this.props.dispatch({type: 'menus/setNavName', payload: ''});
  }
  render() {
    const {
      history,
    } = this.props;
    return (
     <Router history={history}>
       <Layout>
         <Aside collapsed={this.state.collapsed}/>
         <Layout>
           <Header style={{ background: '#fff', padding: 0 }}>
             <Icon
               className={styles.trigger}
               type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
               onClick={this.toggle}
             />
           </Header>
           <Content style={{
             margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
           }}
           >
             <Switch>
               <Route path="/home/home" exact component={IndexPage}/>
               <Route path="/home/about" exact component={Count}/>
               <Route path="/work/epic" exact component={Epic}/>
               <Redirect to="/home/home"/>
             </Switch>
           </Content>
           <Footer style={{ textAlign: 'center' }}>
             Ant Design ©2018 Created by Ant UED
           </Footer>
         </Layout>
       </Layout>
     </Router>
    );
  }
}

export  default connect(({menus}) => ({menus}))(BasicLayout);
