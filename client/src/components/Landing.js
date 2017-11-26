import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<Link to="/portfolio/add">
				<h1>Landing</h1>
				<i className="material-icons">add</i>
			</Link>
			<h4 className="subheader-content">
				This is just some header below the header.
			</h4>
			<p className="some-cool">
				This is just some sample content for the purposes of sample content.
			</p>
		</div>
	);
};

export default Landing;
