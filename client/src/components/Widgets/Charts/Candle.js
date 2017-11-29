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
		console.log(data);
		const ohlc = [],
			volume = [],
			dataLength = data.length,
			groupingUnits = [['week', [1, 2, 3, 4]], ['month', [1, 2, 3, 4, 6]]];

		data.forEach(itr => {
			const convertTime = m_().valueOf(itr.time);
			console.log(convertTime);
			ohlc.push([
				m_().valueOf(itr.time), // date
				itr.open, // open
				itr.high, // high
				itr.low, // low
				itr.close // close
			]);
			console.log('OHLC DATA PREP');
			console.log(ohlc);
			volume.push([
				m_().valueOf(itr.time), // date
				itr.volumefrom // Volume
			]);
			console.log('VOLUME DATA PREP');
			console.log(volume);
		});
		console.log('Checking all fields before charting');
		console.log(ohlc, volume, dataLength, groupingUnits);
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
		console.log('Organizing The Data');
		console.log(ohlc);
		console.log(volume);
		console.log(groupingUnits);
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
					data: ohlc,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'column',
					name: 'Volume',
					data: volume,
					yAxis: 1,
					dataGrouping: {
						units: groupingUnits
					}
				}
			]
		});
	}

	render() {
		return (
			<div>
				{this.convertUnix()}
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
				volumefrom
			}
		}
	}
`;

export default graphql(query)(CandleChart);
