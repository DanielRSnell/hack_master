import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { DatePicker, Row, Col, Layout, Spin, Alert } from 'antd';
import fetchCoin from '../query/fetchCoin';
import CandleChart from '../charts/Candle';

/* Todo List: 

1. Pricing Data Raw 
2. Progress Data 
3. Market Compairison 
4. News Widget 

*/


// Load Highmaps as a module

const { Content } = Layout;


class CryptoProfile extends Component {

constructor(props) {
	super(props);
}


// Coin Image Variable Return 
 cmc_() {
	 const { id } = this.props.data.coin;
	 const img_ = 'https://files.coinmarketcap.com/static/img/coins/64x64/';
	 return (
		 <img className="coin-img-src" src={img_ + id + '.png'} />
	 );
 }


render() {

	console.log(this.props.data);
	
if ( this.props.data.loading) {
	
	return( 
	<Layout style={{ padding: '15px 24px 24px ' }}>

	<div className="example">
    <Spin 
		size="large"
		tip="Waiting on the chicken to cross the road..."
	/>
  	</div>

	</Layout>

	 );
	}

	return (

		<Layout style={{ padding: '15px 24px 24px ' }}>
	
		<Row gutter={12} className="home-content-header">
				


<Col span={2}>
					
			<div className="img-example">

					<span className="coin-box-1">

						{this.cmc_()}
						
						</span>

					</div>
							
				</Col> 
					<Col span={6}>
					
				<span className="coin-name">{this.props.data.coin.name}</span>
		
					</Col> 
			
		
			</Row>

	

		
	<Row type="flex" justify="center" span={24}>
		
		<Col span={18} > 
			<div>
				<CandleChart data={this.props.data} />
				</div>
		
		</Col>
	
	</Row>


</Layout>
			);
		}	
	}

export default graphql(fetchCoin, {
	options: (props) => { return {  variables: { id: props.match.params.id } } }
})(CryptoProfile);
