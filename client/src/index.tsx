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
// import { SubscriptionClient } from "subscriptions-transport-ws";
import { InMemoryCache } from 'apollo-cache-inmemory';

// const GRAPHQL_ENDPOINT = "ws://localhost:4000/graphql";

// const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {
//   reconnect: true
// });

// const link = new WebSocketLink(client);


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
//   depending on what kind of operation is being sent
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

//   const links = ApolloLink.from([link]);

// const apolloClient = new ApolloClient({
//     uri: 
// });

// const terminatingLink = split(
//     ({ query }) => {
  
//       const { kind, operation } = getMainDefinition(query);
//       return (
//         kind === 'OperationDefinition' && operation === 'subscription'
//       );
//     },
//     wsLink,
//     httpLink,
//   );
  
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
