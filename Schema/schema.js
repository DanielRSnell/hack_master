const axios = require('axios');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull
} = require('graphql');

// You must define the type
const CoinInfo = new GraphQLObjectType({
	name: 'Coin',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		symbol: { type: GraphQLString },
		rank: { type: GraphQLInt },
		price_usd: { type: GraphQLFloat },
		price_btc: { type: GraphQLFloat },
		market_cap_usd: { type: GraphQLFloat },
		available_supply: { type: GraphQLFloat },
		total_supply: { type: GraphQLFloat },
		max_supply: { type: GraphQLFloat },
		percent_change_1h: { type: GraphQLFloat },
		percent_change_24h: { type: GraphQLFloat },
		percent_change_7d: { type: GraphQLFloat },
		last_updated: { type: GraphQLInt },
		coin_news: {
			type: new GraphQLList(coinNews),
			args: {
				symbol: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get(
						`https://cryptopanic.com/api/posts/?auth_token=8d6e7dba3f484613693516ded9b905c83ac894bc&currency=${
							parentValue.symbol
						}&count=10`
					)
					.then(response => response.data.results);
			}
		},
		btc_history: {
			type: new GraphQLList(historyMeta),
			args: {
				symbol: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get(
						`https://min-api.cryptocompare.com/data/histoday?fsym=${
							parentValue.symbol
						}&tsym=USD&allData=true`
					)
					.then(response => response.data.Data);
			}
		},
		eth_history: {
			type: new GraphQLList(historyMeta),
			resolve(parentValue, args) {
				return axios
					.get(
						`https://min-api.cryptocompare.com/data/histoday?fsym=${
							parentValue.symbol
						}&tsym=ETH&allData=true`
					)
					.then(response => response.data.Data);
			}
		},
		usd_history: {
			type: new GraphQLList(historyMeta),
			resolve(parentValue, args) {
				return axios
					.get(
						`https://min-api.cryptocompare.com/data/histoday?fsym=${
							parentValue.symbol
						}&tsym=USD&allData=true`
					)
					.then(response => response.data.Data);
			}
		}
	})
});

// const binanceKline = new GraphQLObjectType({
// 	name: 'CandleSticks',
// 	fields: () => ({
// 		feed:
// 	})
// })

const historyFetch = new GraphQLObjectType({
	name: 'coinHistorical',
	fields: () => ({
		Response: { type: GraphQLString },
		Type: { type: GraphQLInt },
		Aggregated: { type: GraphQLString },
		Data: { type: historyMeta },
		TimeTo: { type: GraphQLInt },
		TimeFrom: { type: GraphQLInt },
		ConversionType: { type: conversionMeta }
	})
});

const conversionMeta = new GraphQLObjectType({
	name: 'ConversionType',
	fields: () => ({
		type: { type: GraphQLInt },
		conversionSymbol: { type: GraphQLString }
	})
});

const historyMeta = new GraphQLObjectType({
	name: 'Histoday',
	fields: () => ({
		time: { type: GraphQLInt },
		close: { type: GraphQLFloat },
		high: { type: GraphQLFloat },
		low: { type: GraphQLFloat },
		open: { type: GraphQLFloat },
		volumefrom: { type: GraphQLFloat },
		volumeto: { type: GraphQLFloat }
	})
});

const coinData = new GraphQLObjectType({
	name: 'Data',
	fields: () => ({
		Date: { type: GraphQLInt },
		Open: { type: GraphQLFloat },
		High: { type: GraphQLFloat },
		Low: { type: GraphQLFloat },
		Close: { type: GraphQLFloat },
		Volume: { type: GraphQLFloat },
		VWAP: { type: GraphQLFloat },
		TWAP: { type: GraphQLFloat }
	})
});

const CoinHist = new GraphQLObjectType({
	name: 'History',
	fields: () => ({
		dataset_code: { type: GraphQLString },
		start_date: { type: GraphQLString },
		end_date: { type: GraphQLString },
		frequency: { type: GraphQLString },
		ticker: { type: GraphQLString },
		data: { type: coinData }
	})
});

const voteData = new GraphQLObjectType({
	name: 'voteInfo',
	fields: () => ({
		positive: { type: GraphQLInt },
		negative: { type: GraphQLInt },
		important: { type: GraphQLInt }
	})
});

const currencyNews = new GraphQLObjectType({
	name: 'currency',
	fields: () => ({
		code: { type: GraphQLString },
		title: { type: GraphQLString },
		slug: { type: GraphQLString }
	})
});

const sourceData = new GraphQLObjectType({
	name: 'sourceInfo',
	fields: () => ({
		title: { type: GraphQLString },
		domain: { type: GraphQLString },
		path: { type: GraphQLString }
	})
});

const coinNews = new GraphQLObjectType({
	name: 'coinPosts',
	fields: () => ({
		id: { type: GraphQLInt },
		currencies: { type: currencyNews },
		title: { type: GraphQLString },
		created_at: { type: GraphQLString },
		published_at: { type: GraphQLString },
		url: { type: GraphQLString },
		source: { type: sourceData },
		votes: { type: voteData },
		domain: { type: GraphQLString }
	})
});

// Bittrex Schema - This will be eventually seperated

const bittrexMarkets = new GraphQLObjectType({
	name: 'getMarkets',
	fields: () => ({
		MarketCurrency: { type: GraphQLString },
		BaseCurrency: { type: GraphQLString },
		MarketCurrencyLong: { type: GraphQLString },
		BaseCurrencyLong: { type: GraphQLString },
		MinTradeSize: { type: GraphQLFloat },
		IsActive: { type: GraphQLString },
		Created: { type: GraphQLString },
		Notice: { type: GraphQLString },
		IsSponsored: { type: GraphQLString },
		LogoUrl: { type: GraphQLString }
	})
});

// Query Modifier Functions

// This is the root query of the schema
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		coin: {
			type: CoinInfo,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get('https://api.coinmarketcap.com/v1/ticker/' + args.id + '/')
					.then(response => response.data[0]);
			}
		},
		coinPosts: {
			type: new GraphQLList(coinNews),
			args: {
				ticker: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get(
						'https://cryptopanic.com/api/posts/?auth_token=8d6e7dba3f484613693516ded9b905c83ac894bc&currency=' +
							args.ticker
					)
					.then(response => response.data.results);
			}
		},
		coins: {
			type: new GraphQLList(CoinInfo),
			args: {
				limit: { type: GraphQLInt }
			},
			resolve(parentValue, args) {
				return axios
					.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + args.limit)
					.then(response => response.data);
			}
		},
		getBittrex: {
			type: new GraphQLList(bittrexMarkets),
			args: {},
			resolve(parentValue, args) {
				return axios
					.get('https://bittrex.com/api/v1.1/public/getmarkets')
					.then(response => response.data.result);
			}
		},
		coinRange: {
			type: CoinHist,
			args: {
				ticker: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				return axios
					.get(
						'https://www.quandl.com/api/v3/datasets/BNC2/MWA_' +
							args.ticker +
							'_USD_USD/data.json?api_key=Cn-_uTWxszw4HXEB6ev-'
					)
					.then(response => response.data.dataset_data);
			}
		}
	}
});

// This is mutations - they are used for doing cool things.

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addCoin: {
			type: CoinInfo,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				symbol: { type: new GraphQLNonNull(GraphQLString) },
				rank: { type: new GraphQLNonNull(GraphQLInt) },
				price_usd: { type: new GraphQLNonNull(GraphQLFloat) }
			},
			resolve(parentValue, args) {
				return axios
					.post('http://localhost:3000/coins', {
						id: args.id,
						name: args.name,
						symbol: args.symbol,
						rank: args.rank,
						price_usd: args.price_usd
					})
					.then(res => res.data);
			}
		},
		deleteCoin: {
			type: CoinInfo,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				return axios
					.delete('http://localhost:3000/coins/' + args.id)
					.then(res => res.data);
			}
		},
		updateCoin: {
			type: CoinInfo,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLString },
				symbol: { type: GraphQLString },
				rank: { type: GraphQLInt },
				price_usd: { type: GraphQLFloat },
				price_btc: { type: GraphQLFloat },
				market_cap_usd: { type: GraphQLFloat },
				available_supply: { type: GraphQLFloat },
				total_supply: { type: GraphQLFloat },
				max_supply: { type: GraphQLFloat },
				percent_change_1h: { type: GraphQLFloat },
				percent_change_24h: { type: GraphQLFloat },
				percent_change_7d: { type: GraphQLFloat },
				last_updated: { type: GraphQLInt }
			},
			resolve(parentValue, args) {
				return axios
					.put('http://localhost:3000/coins/' + args.id, args)
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});
