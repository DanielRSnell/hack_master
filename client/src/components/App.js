// Required
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
// or just take everything!

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Blueprint from "@blueprintjs/core";
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../style/main.css';


// Apollo Client Imports for GraphQL

// Apollo Client Dpenedencies for changes
// import { InMemoryCache } from 'apollo-cache-inmemory';

// Components
import Header from './Header';
import Subheader from './Subheader';

// Other Pre-Render Options
import Landing from './Landing';
import Portfolio from './Portfolio';
import PortfolioAdd from './PortfolioAdd';
import QueryTest from './Queries/QueryTest';
import CoinPage from './CoinPage';
import TestPage from './test';
// import CoinList from './Widgets/CoinList';
import CoinTable from './Widgets/table';
import sparkCharts from './Widgets/Charts/sparkchart'
import coinSheet from './Widgets/spreadsheet.js'

// View State Starts Here
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="row">
						<Header />
						<Subheader />
						<div>
							<Route exact={true} path="/" component={CoinTable} />
							<Route exact={true} path="/portfolio" component={Portfolio} />
							<Route path="/portfolio/add" component={PortfolioAdd} />
							<Route path="/cryptocurrency/coin" component={CoinPage} />
							<Route exact={true} path="/test" component={TestPage} />
							<Route exact={true} path="/list" component={QueryTest} />
							<Route exact={true} path="/spark" component={sparkCharts} />
							<Route exact={true} path="/sheet" component={coinSheet} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
// eslint-disable-next-line
export default connect(null, actions)(App);
