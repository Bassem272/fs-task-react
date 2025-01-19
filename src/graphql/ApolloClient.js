import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://adbc-197-32-83-84.ngrok-free.app', 
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export { ApolloClientProvider };
// uri: 'http://localhost:8090', 
