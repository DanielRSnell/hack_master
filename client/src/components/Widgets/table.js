import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import _ from 'underscore';



class CoinTable extends Component {

render() {
  if (this.props.data.loading) {
    return <div> Waiting </div>;
  }
  console.log(this.props);

  return (

<div className="container">
  <table className="pt-table pt-interactive">
      <thead>
        <tr>
          <th className="th-center">RANK</th>
          <th className="th-center">ICON</th>
          <th className="th-center">NAME</th>
          <th className="th-center">USD</th>
          <th className="th-center">BTC</th>
          <th className="th-center">HOUR</th>
          <th className="th-center">WEEK</th>
          <th className="th-center">DAY</th>
      </tr>
      </thead>
        <tbody>
        {this.props.data.coins.map(data => {
          return (
        
          <tr key={data.id}>
            <td className="ct-numeric">
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
            
            <td className="ct-numeric">{data.price_usd}</td>
            <td className="ct-numeric">{data.price_btc}</td>
            <td className="ct-numeric">{data.percent_change_1h}</td>
            <td className="ct-numeric">{data.percent_change_24h}</td>
            <td className="ct-numeric">{data.percent_change_7d}</td>
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

export default graphql(query)(CoinTable);