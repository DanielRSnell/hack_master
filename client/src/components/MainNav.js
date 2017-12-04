/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import LinksNav from './LinksNav';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class MainNav extends Component {
  state = {
    current: 'logo',
  }

  menuClickHandler = () => {
    console.log(this.props);
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    console.log(this.props);
  }

  render() {
  
    return (
<div>
      <Menu
        defaultOpenKeys={['logo']} 
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
        mode="horizontal"
        className="mainheader"
        theme="light"
          >
       <Menu.Item 
        key="logo"
		    className="menu-logo">
         <Link to={{pathname: '/'}}> <Icon type="BTC" />H A C K C O I N . I O </Link>
        </Menu.Item>

		  <Menu.Item 
        key="create"
		    className="item-left">
          <Icon type="user" /><span className="item">Create Account
        </span>
        </Menu.Item>
       
        <Menu.Item
        key="cryptocurrency/bitcoin">
          <Icon type="appstore" /><span className="item">Analyze Coins
        </span>
        </Menu.Item>
       
       <Menu.Item 
       key="portfolio">
       <Icon type="appstore" />
       <span className="item"> Portfolio 
       </span>
       </Menu.Item>
       
        <Menu.Item
        key="alert">
		    <Icon type="setting" />
        <span className="item">Alert
        </span>
        </Menu.Item>
      </Menu>
      <LinksNav />
      </div>
    );
  }
}

export default withRouter(MainNav);