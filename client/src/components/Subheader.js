import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Subheader extends Component {
	render() {
		return (
			<div>
				<nav className="pt-navbar">
				
						<div className="margin: 0 auto; width: 480px;">
					
						<div className="pt-navbar-group pt-align-left">
						<Link to="/">
						<button className="pt-button pt-minimal">HOME</button>
						</Link>
						<span className="pt-navbar-divider" />

						<Link to="/test" >
						<button className="pt-button pt-minimal">CHART</button>
						</Link>
						<span className="pt-navbar-divider" />
						<Link to="/list">
						<button className="pt-button pt-minimal">LIST</button>
						</Link>
						<span className="pt-navbar-divider" />
						<Link to="/portfolio">
						<button className="pt-button pt-minimal">PORTFOLIO</button>
						</Link>
						<span className="pt-navbar-divider" />
						<Link to="/portfolio/add">
						<button className="pt-button pt-minimal">ADD</button>
						</Link>
						<span className="pt-navbar-divider" />
						
				</div>
			</div>
		</nav>
	</div>
		);
	}
}

export default Subheader;
