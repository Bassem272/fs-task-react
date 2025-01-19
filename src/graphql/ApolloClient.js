import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dazzling-bulb-production-0b35.up.railway.app/', 
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export { ApolloClientProvider };
// uri: 'http://localhost:8090', 
