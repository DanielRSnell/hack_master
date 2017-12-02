import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';



class QueryTest extends Component { 


render() {
		if (this.props.data.loading) {
			return <div> Waiting </div>;
		}
		console.log(this.props);
		console.log("Table Presented");
		return (
	<div className="pt-grid 2">
		<table className="pt-table pt-interactive pt-bordered">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Icon</th>
						<th>Name</th>
						<th>USD</th>
						<th>BTC</th>
						<th>HOUR</th>
				</tr>
				</thead>
					<tbody>
					{this.props.data.coins.map(data => {
						return (
					
						<tr key={data.id}>
							<td>
							 	{data.rank}
							 </td>

							<td>
							<img 
							className="coin-icon" 
							src={"https://files.coinmarketcap.com/static/img/coins/32x32/" + data.id + ".png"} 
							/>
							</td>

							<td>
								{data.name}
							</td>
							
							<td>{data.price_usd}</td>
							<td>{data.price_btc}</td>
							<td>{data.percent_change_1h}</td>
						</tr>
						);
						})}
						</tbody>
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
			percent_change_7d
		}
	}
`;

export default graphql(query)(QueryTest);
