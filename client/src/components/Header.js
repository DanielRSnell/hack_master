import React, { Component } from 'react';
import * as Icon from 'react-cryptocoins';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">LOG IN</a></li>;
      default:
        return [
          <li key="2"><a href="/api/logout">LOGOUT</a></li>
        ];
    }
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<ul className="left" />
					<Link
						to={this.props.atuh ? '/Landing' : '/'}
						className="center brand-logo"
					>
						{' < / '}
						<span className="logo-style-hack"> H A C K </span>
						<span className="logo-style-icon">
							{'[ '}
							<Icon.Strat />
							{' ]'}
						</span>
						<span className="logo-style-coin"> C O I N</span>
						{' >'}
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
