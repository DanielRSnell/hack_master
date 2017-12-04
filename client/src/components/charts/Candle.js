import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as m_ from 'moment';
import { Layout } from 'antd';
import Highcharts from 'highcharts/highstock';

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class CandleChart extends Component {

	constructor(props) {
		super(props);
	}
	
	// Error Handling

	componentDidCatch(error, info) {
		// Is there an error?
		console.log(error);
		// Tell about it if so!
		console.log(info);
	}



	// Element is ready 

	componentDidMount() {
		
		const { id, name, symbol, btc_history } = this.props.data.coin;
		
		this.loadChart(id, name, symbol, btc_history)
	
	}

	//Props Passed 

	loadChart(id, name, symbol, btc_history) {
		
	// Variables	
		
		const ohlcData = [];
	
		const volumeData = [];
	
	// Splitting the data set
	
		btc_history.forEach(item => {
		
		// Organize OHLC Data
			ohlcData.push([ 
				m_.unix(item.time).valueOf(),
				item.open,
				item.high,
				item.low,
				item.close
		]);

		// Organize volume data 

			volumeData.push([
				m_.unix(item.time).valueOf(), // date
				item.volumeto // Volume
			]);

		});
	
	// Chart Creation Starts Here 
		Highcharts.stockChart("loading", {

			rangeSelector: {
				selected: 0
			}, 
			
			credits: {
				enabled: false
			  },

			yAxis: [
				{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'OHLC'
					},
					height: '100%',
					lineWidth: 4,
					resize: {
						enabled: true
					}
				},
				{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'Volume'
					},
					top: '100%',
					height: '35%',
					offset: 0,
					lineWidth: 2
				}
			],

			tooltip: {
				split: true
			},

			series: [
				{
					type: 'candlestick',
					name: name,
					data: ohlcData
				},
				{
					type: 'column',
					name: 'Volume',
					data: volumeData,
					yAxis: 1
				}
			]
		});
	}
	
// Render the data unless data is still pending
	render() {

	// Post the data 		
			
		return (
			
			<div>
				<div id="loading" />
			
			
			
				<div id="candle" />
			</div>	
			
		);
	}
}

export default CandleChart;
