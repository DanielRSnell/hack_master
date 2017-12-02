/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as Blueprint from '@blueprintjs/core';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// Blueprint JS 

import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';

// Apollo Client Imports for GraphQL
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';

// Import from the view controller
import App from './components/App';

// Import Reduces from all required reducers.
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const client = new ApolloClient({
	link: createHttpLink({ uri: '/graphql' }),
	cache: new InMemoryCache()
});

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Provider>,
	document.querySelector('#root')
);
