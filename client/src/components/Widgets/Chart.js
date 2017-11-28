import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Highcharts from 'highcharts';

class Chart extends Component {
	getData() {
		var rawData = this.props.data.coin;
		var data = [];
		console.log(this.props);
		if (this.props.data.loading == false) {
			return this.componentWillMount();
		} else {
			return rawData.btc_history
				.map(res => {
					var obj = {
						time: res.time,
						open: res.open,
						high: res.high,
						low: res.low,
						close: res.close
					};
				})
				.done(data => {
					console.log(data);
					this.setState({
						data: data
					});
				});
			this.drawChart(data);
		}
	}

	drawChart(data) {
		Highcharts.chart('chart', {
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

			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointStart: 2010
				}
			},

			series: data,

			responsive: {
				rules: [
					{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom'
							}
						}
					}
				]
			}
		});
	}

	createChart() {
		return <Chart />;
	}

	render() {
		console.log(this.props);
		if (this.props.data.loading) {
			var loadCount = 0;
			return loadCount + 1;
			console.log(loadCount);
			if (loadCount > 0 && this.props.data.loading == true) {
				return <div>Data is loading {this.loadCount}</div>;
				console.log(this.loadCount);
				console.log(this.props.data.coin);
			} else {
				return <div>{this.createChart()}</div>;
			}
		}

		return (
			<div>
				<Chart />
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

export default graphql(query)(Chart);
