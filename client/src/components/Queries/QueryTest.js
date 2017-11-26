import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class QueryTest extends Component {
	renderCoins() {
		return this.props.data.coins.map(coin => {
			return (
				<tr key={coin.id}>
					<td>{coin.rank}</td>
					<td>
						<img
							src={
								'https://files.coinmarketcap.com/static/img/coins/32x32/' +
								coin.id +
								'.png'
							}
						/>
					</td>
					<td>{coin.name}</td>
					<td>${coin.price_usd}</td>
					<td>{coin.price_btc}</td>
					<td>{coin.percent_change_1h}%</td>
					<td>{coin.percent_change_24h}%</td>
				</tr>
			);
		});
	}

	render() {
		if (this.props.data.loading) {
			return <div>Loading ... </div>;
		}
		return (
			<div className="coin-table-list">
				<table className="highlight striped centered responsive-table">
					<thead>
						<tr>
							<th>RANK</th>
							<th>ICON</th>
							<th>NAME</th>
							<th>CURRENT</th>
							<th>SATOSHI</th>
							<th>1 HOUR</th>
							<th>24 HOUR</th>
						</tr>
					</thead>
					<tbody>{this.renderCoins()}</tbody>
				</table>
			</div>
		);
	}
}

const query = gql`
	{
		coins(limit: 100) {
			id
			rank
			name
			price_usd
			price_btc
			percent_change_1h
			percent_change_24h
		}
	}
`;

export default graphql(query)(QueryTest);
