// Required
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
// or just take everything!

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
// The Style Sheets
import '../style/App.css';



// Apollo Client Imports for GraphQL

// Apollo Client Dpenedencies for changes
// import { InMemoryCache } from 'apollo-cache-inmemory';

// Components
import MainNav from './MainNav';


// Other Pre-Render Options
import Portfolio from './pages/Portfolio';
import CryptoProfile from './pages/CryptoProfile';
import CoinTable from './library/table';

// Testing Grounds - Where we build things 
import Test from '../tests/test';


// View State Starts Here


class App extends Component {

// Antd Design Specification Grid 
	
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {

		
		return (
		
		<div className="app-grid">
		
				<BrowserRouter>

					<div className="row">					
				
					<MainNav />		


						<div>
					
							<Route exact={true} path="/" component={CoinTable} />
							<Route exact={true} path="/portfolio" component={Portfolio} />
							<Route exact={true} path="/cryptocurrency/:id" component={CryptoProfile} />
							<Route exact={true} path="/test" component={Test} />
					
						</div>
					
					</div>
				
				</BrowserRouter>
			
			</div>
		);
	}
}
// eslint-disable-next-line
export default connect(null, actions)(App);
