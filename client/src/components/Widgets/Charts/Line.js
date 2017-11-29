import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts/highstock';
// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class lineChart extends Component {
	componentDidMount() {
		console.log('chart mounted');
	}

	componentWillReceiveProps(props) {
		console.log('chart will update');
		this.prepareData(props.data.coin);
	}

	prepareData(data) {
		console.log('preparing data');
		var array = [];
		data.btc_history.forEach(function(item) {
			array.push(item.high);
		});
		console.log(array);
		var dataObj = {
			name: 'coin',
			data: array
		};
		this.drawChart(dataObj);
	}

	drawChart(data) {
		console.log(data);
		Highcharts.chart('lineChart', {
			title: {
				text: 'Test Chart'
			},
			subtitle: {
				text: 'Testing Stuff'
			},
			yAxis: {
				title: {
					text: 'Some Test Data'
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},
			credits: {
				enabled: false
			},
			series: [data]
		});
	}

	render() {
		return (
			<div>
				<h1>Chart</h1>
				<div id="lineChart" />
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
			}
		}
	}
`;

export default graphql(query)(lineChart);
