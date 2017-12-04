import React, { Component } from 'react';
import { Router, history } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Home from '../pages/Home';
import { Table, Button, Layout, Row, Col } from 'antd';
const { Column } = Table;
const { Content } = Layout;



class CoinTable extends Component {



  constructor(props) {
    super(props);
   
  }

  state = {
    path: this.props.history.location.pathname,
  }

componentWillMount() {
  console.log("Table will mount... Soon... ");
  console.log(this.props);
  console.log(this.router);
  console.log(this.state.path);;
}


  rowClickHandler(id) {
    console.log("Checking clickable props");
    console.log(this.state.path);
    console.log(id);
    this.setState({path: '/cryptocurrency/'+id});
    this.props.history.push('/cryptocurrency/' + id);
  }

render() {
  if (this.props.data.loading) {
    return <div> Waiting </div>;
  }
  
  return (
 <Layout>   

    <Home />
      <Layout style={{ padding: '10px 0px 0px 0px'}}>
        <Row type="flex" span={24} justify="center">

        <Col span={23} value={5}>

          <Table dataSource={this.props.data.coins} 
                rowKey={coins => coins.id}
                pagination={{ pageSize: 100 }}
                onRowClick={(item) => (this.rowClickHandler(item.id))}
                >

          <Column title="RANK" dataIndex="rank" keys="rank"/>
          
          
          <Column title="ICON"  keys="icon" render={(item) => (
            <img src={'https://files.coinmarketcap.com/static/img/coins/32x32/'+ item.id + '.png'} />
          )} />


          <Column title="NAME" dataIndex="name" keys="name" />
        
          <Column title="USD" dataIndex="price_usd" keys="price_usd" />
        
          <Column title="BTC" dataIndex="price_btc" keys="price_btc" />
        
          <Column title="HOUR" dataIndex="percent_change_1h" keys="percent_change_1h" />
        
          <Column title="WEEK" dataIndex="percent_change_24h" keys="percent_change_24h" />
        
          <Column title="DAY" dataIndex="percent_change_7d" keys="percent_change_7d" />

          </Table>
        
        </Col>
      
      </Row>
  
  </Layout>

</Layout>
    );
  }
}

console.log(Table);

const query = gql`
{
  coins(limit: 0) {
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