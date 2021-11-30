import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `https://recruiters-api.herokuapp.com`,
  cache: new InMemoryCache(),
});
