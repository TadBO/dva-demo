import React, {Componnet} from 'react';
import { connect } from "dva";
import { Layout, Menu, Icon } from 'antd';
import styles from "./BasicLayout.less";
import {Link} from "react-router-dom";
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;

const menuData = [
  {
    icon: 'user',
    name: 'home',
    path: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
      },
      {
        name: 'about',
        path: '/about',
      },
      {
        name: 'setting',
        path: '/setting'
      },
    ],
  },
  {
    icon: 'video-camera',
    name: 'work',
    path: '/work',
    children: [
      {
        name: 'epic',
        path: '/epic',
      },
      {
        name: 'feature',
        path: '/feature',
      },
      {
        name: 'story',
        path: '/story'
      }
    ]
  },
  {
    name: 'logs',
    path: '/logs',
    icon: 'upload',
    children: [
      {
        name: 'login',
        path: '/login'
      },
      {
        name: 'logout',
        path: '/logout',
      },
      {
        name: 'other',
        path: '/other',
      },
    ],
  },
];

class Aside extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {
      menus,
      dispatch,
      collapsed,
    } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo}/>
        <Menu theme="dark" mode="inline"  openKeys={[menus.current.navname]} selectedKeys={[menus.current.pathname]} defaultSelectedKeys={['home']} defaultOpenKeys={['home']}>
          {
            menuData.map((item, index) => {
              return (
                <SubMenu onTitleClick={() => {dispatch({type: 'menus/setNavName', payload: item.name})}} key={item.name} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                  {
                    item.children.map((list, key) => {
                      return (
                        <Menu.Item key={list.name} >
                          <Link to={item.path + list.path}>
                            <span>{list.name}</span>
                          </Link>
                        </Menu.Item>
                      );
                    })
                  }
                </SubMenu>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
};

export default connect(({menus}) => ({menus}))(Aside);


