import gql from 'graphql-tag';

export default gql`

query fetchCoin($id: String) {
    coin(id: $id) {
        id
        name
        symbol
        price_usd
        price_btc
        percent_change_1h
        percent_change_24h
        percent_change_7d 
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
