import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Highcharts from 'highcharts';

class coinSpark extends Component {

    componentWillMount(props){
        console.log("Data is gathering");
        console.log(this.props.data.coin);
    }

    render() {
        if (this.props.data.load){
            <div className="example">
            Please wait...
            </div>
        }
        console.log(this.props);
        console.log(this.props.data);
        console.log(this.props.data.coin);
        console.log(this.props.data.coin);
        return (
        
            <div className="exmaple-map">
        
        {this.props.data.coin.btc_history.forEach(item => {
            return (<ul>
            <li>{item.open}</li>
            </ul>);
        })
        }

        </div>
        );
    }
}

const query = gql`
{
    coin(id: "district0x") {
        btc_history {
            time
            high
            low
            open
            close
            volumeto
        }
    }
}
`;

export default graphql(query)(coinSpark);
