// Required
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../style/main.css';

// Components
import Header from './Header';
import Subheader from './Subheader';

// Other Pre-Render Options
import Landing from './Landing';
import Portfolio from './Portfolio';
import PortfolioAdd from './PortfolioAdd';

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
						<div className="container">
							<Route exact={true} path="/" component={Landing} />
							<Route exact={true} path="/portfolio" component={Portfolio} />
							<Route path="/portfolio/add" component={PortfolioAdd} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}
// eslint-disable-next-line
export default connect(null, actions)(App);
