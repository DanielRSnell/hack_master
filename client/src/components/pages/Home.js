/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React, { Component } from 'react';
import { Router, History, withRouter } from 'react-router-dom';
import CoinTable from '../library/table';
// Styling Imports for the page 
import { Row, Col, Layout } from 'antd';
const { Content } = Layout;

class Home extends Component {
	
	constructor(props) {
		super(props); 
		
	}

	componentWillMount() {
		console.log("Component Mounted");
		console.log(this.props);
	}
	
render() {

	return (
	
<Layout style={{ padding: '15px 24px 24px ' }}>
	<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
	<Row className="home-content-header">
	
				<Col>

					
						<h1>CRYPTO MARKET DATA</h1>
					

					<h4 className="subheader-content">
						This is just some header below the header.
					</h4>

					<p className="some-cool">
						This is just some sample content for the purposes of sample content.
					</p>

					</Col> 

			</Row>

	

		</Content>
	
</Layout>

		);
	}
}
export default withRouter(Home);
