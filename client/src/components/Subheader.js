import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Subheader extends Component {
	render() {
		return (
			<div>
				<nav className="nav-extended">
					<div className="nav-wrapper-alt">
						<ul id="nav-mobile" className="right hide-on-med-and-down" />
						<ul className="side-nav" id="mobile-demo" />
					</div>
					<div className="center nav-content">
						<ul className="center tabs tabs-transparent">
							<li className="tab">
								<Link to="/">HOME</Link>
							</li>
							<li className="tab">
								<Link to="/portfolio">PORTFOLIO</Link>
							</li>
							<li className="tab">
								<Link to="/portfolio/add">ADD COINS</Link>
							</li>
							<li className="tab">
								<Link to="/query/stuff">Query</Link>
							</li>
							<li className="tab">
								<a href="/test">TEST PAGE</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Subheader;
