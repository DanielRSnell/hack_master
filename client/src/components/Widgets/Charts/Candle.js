import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as m_ from 'moment';
import Moment from 'react-moment';
import Highcharts from 'highcharts/highstock';
import $ from 'jquery';
// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class CandleChart extends Component {
	componentDidMount() {
		console.log('chart mounted');
	}

	componentWillReceiveProps(props) {
		console.log('chart will update');
		this.prepareData(props.data.coin.btc_history);
	}

	prepareData(data) {
		const ohlc = [],
			volume = [],
			dataLength = data.length,
			groupingUnits = [['week', [1, 2, 3, 4]], ['month', [1, 2, 3, 4, 6]]];

		data.forEach(itr => {
			//console.log(convertTime);
			ohlc.push([
				m_.unix(itr.time).valueOf(), // date
				itr.open, // open
				itr.high, // high
				itr.low, // low
				itr.close // close
			]);

			volume.push([
				m_.unix(itr.time).valueOf(), // date
				itr.volumeto // Volume
			]);
		});

		this.drawChart(ohlc, volume, groupingUnits);
	}

	convertUnix() {
		const unixTimestamp = 1510963200;
		return (
			<Moment unix format="x" locale="en-us">
				{unixTimestamp}
			</Moment>
		);
	}

	drawChart(ohlc, volume, groupingUnits) {
		Highcharts.stockChart('CandleChart', {
			rangeSelector: {
				selected: 1
			},

			title: {
				text: 'District0x Historical'
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
					height: '60%',
					lineWidth: 2,
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
					top: '65%',
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
					name: 'District0x',
					data: ohlc
				},
				{
					type: 'column',
					name: 'Volume',
					data: volume,
					yAxis: 1
				}
			]
		});
	}

	render() {
		return (
			<div className="container-table">
				<div id="CandleChart" />
			</div>
		);
	}
}

const query = gql`
	{
		coin(id: "district0x") {
			btc_history {
				time
				high
				low
				open
				close
				volumeto
			}
		}
	}
`;

export default graphql(query)(CandleChart);
