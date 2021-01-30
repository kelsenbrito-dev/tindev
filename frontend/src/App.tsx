import React from 'react';
import { ApolloProvider } from '@apollo/client';

import './App.css';
import Routes from './routes';
import client from './services/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
