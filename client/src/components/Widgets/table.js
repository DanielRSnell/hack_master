import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import RemoteStoreAll from './remote-store-all';

class CoinTable extends Component {
  
    render() {
        if (this.props.data.loading) {
            return <div className="container">
            Please wait!
            </div>;
        }
    return (
    <div>
        <div className='col-md-offset-1 col-md-8'>
            <div className='panel panel-default'>
            <div className='panel-heading'>Remote All Features Together Example</div>
            <div className='panel-body'>
                <RemoteStoreAll sizePerPage={ 5 } products={this.props.data} />
          </div>
        </div>
      </div>
    </div>
        
        );
    }
}

const query = gql`
{
    coins(limit: 10) {
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