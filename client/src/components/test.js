import React from 'react';
import { Link } from 'react-router-dom';
import CandleChart from './Widgets/Charts/Candle';
import LineChart from './Widgets/Charts/Line';

const Testpage = () => {
	return (
		<div style={{ textAlign: 'justify' }}>
			<div className="container">
				<CandleChart />
			</div>
			<div />
		</div>
	);
};

export default Testpage;
