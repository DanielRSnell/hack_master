/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class LinksNav extends Component {
	state = {
   current: 'coin-list',
	}
	
// Render Stage 
	  render() {

// Output 
		return (
		<Menu
			defaultOpenKeys={['coin-list']}
			defaultSelectedKeys={['coin-list']}
			mode="horizontal"
			theme="dark"
		  >
		  
			<Menu.Item key="quick-links" className="menu-logo">
			Q U I C K L I N K S			
			</Menu.Item>
			
			<Menu.Item key="upcomming"
			className="item-left">
			  <Icon type="user" />Upcomming
			</Menu.Item>
			
			<Menu.Item key="coin-list">
			  <Icon type="appstore" />Coin List
			</Menu.Item>

			<Menu.Item key="ico">
			  <Icon type="appstore" />ICO Activity
			</Menu.Item>

			<Menu.Item key="trending">
			  <Icon type="appstore" />Trending News
			</Menu.Item>
			  
			<Menu.Item key="top-picks">
				<Icon type="setting" />Hackcoin Top Picks
			</Menu.Item>
		  
			  </Menu>
		);
	}
}
export default LinksNav;
