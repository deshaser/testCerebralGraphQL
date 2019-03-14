import React from 'react'
import ReactDOM from 'react-dom'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

const httpParams = {
  uri: 'https://devsqvr.ru/api/graphql/v1',
  credentials: 'include',
}

const client = new ApolloClient({
  link: new HttpLink(httpParams),
  cache: new InMemoryCache(),
})

ReactDOM.render((
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  ),
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
