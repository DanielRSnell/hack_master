import React, { Component } from 'react';
import * as Icon from 'react-cryptocoins';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {

	
	render() {
		return (
			<nav className="pt-navbar pt-dark">
		
			<div className="pt-navbar-group pt-align-left">
		
			<div className="pt-ui-text-large">
			<span className="pt-icon-chart-large" />
			   <span className="header-logo-primary"> H A C K  C O I N . I O </span>
		
			</div>
		
			</div>
			
			<div className="pt-navbar-group pt-align-right">
			
				<button className="pt-button pt-minimal pt-icon-user">Button</button>
			
			<span className="pt-navbar-divider" />

				<button className="pt-button pt-minimal pt-icon-home">Button</button>
		
			</div>
		
		</nav>
			
		);
	}
}

export default Header;
