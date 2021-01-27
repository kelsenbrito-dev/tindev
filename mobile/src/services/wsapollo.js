import { WebSocketLink } from '@apollo/client/link/ws';

const GRAPHQL_ENDPOINT = "ws://192.168.0.226:4000/graphql";

const wsLink = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT,
  options: {
    reconnect: true
  }
});
export default wsLink;