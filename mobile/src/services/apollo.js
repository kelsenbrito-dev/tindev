import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const GRAPHQL_HTTP_ENDPOINT = "http://192.168.0.226:4000/graphql";
const GRAPHQL_WS_ENDPOINT = "ws://192.168.0.226:4000/graphql";

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_ENDPOINT,
})

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_ENDPOINT,
  options: {
      reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
      const definition = getMainDefinition(query)
      return (
          definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription'
      )
  },
  wsLink,
  httpLink,
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})