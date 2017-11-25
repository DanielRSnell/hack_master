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
const Portfolio = () => <h1>Portfolio</h1>;
const PortfolioAdd = () => <h1>Change Portfolio</h1>;
const Home = () => <h1>Home</h1>;

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
							<Route exact={true} path="/" component={Home} />
							<Route exact={true} path="/landing" component={Landing} />
							<Route exact={true} path="/portfolio" component={Portfolio} />
							<Route
								exact={true}
								path="/portfolio/add"
								component={PortfolioAdd}
							/>
						</div>
					</div>
				</BrowserRouter>
				<div className="container" />
			</div>
		);
	}
}
// eslint-disable-next-line
export default connect(null, actions)(App);
