import { ApolloProvider } from '@apollo/client';
import React from 'react';

import Routes from './src/routes';
import { client } from './src/services/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />  
    </ApolloProvider>
  );
}

export default App;