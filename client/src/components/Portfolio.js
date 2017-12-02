import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
	return (
		<div className="container">
			<Link to="/portfolio/add">
				<h1>TRACK YOUR PERFORMANCE</h1>
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

export default Portfolio;
