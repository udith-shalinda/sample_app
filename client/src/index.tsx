import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { split, ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';


  const httpLink = new HttpLink({
      uri: 'http://localhost:5000/graphql'
    });
  
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:5000/graphql`,
    options: {
      reconnect: true
    }
  });
  
//   using the ability to split links, you can send data to each link
  const linksss = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
 
  const link = ApolloLink.from([linksss]);
  
  const cache = new InMemoryCache();
  
  const apolloClient = new ApolloClient({
    link,
    cache
  });

ReactDOM.render(<ApolloProvider client={apolloClient}><App/></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
