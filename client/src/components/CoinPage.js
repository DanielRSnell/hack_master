import React from 'react';
import { Link } from 'react-router-dom';
import EnhancedTable from './Widgets/CoinList.js';

const CoinPage = () => {
	return (
		<div style={{ textAlign: 'justify' }}>
			<Link to="/">
				<h1>TRACK YOUR FAVORITE COIN</h1>
			</Link>
			<h4 className="subheader-content">
				This is just some header below the header.
			</h4>
			<div className="Complicated-Table">
				<EnhancedTable />
			</div>
			<p className="some-cool">
				This is just some sample content for the purposes of sample content.
			</p>
		</div>
	);
};

export default CoinPage;
