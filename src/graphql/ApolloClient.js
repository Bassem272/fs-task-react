import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8090', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export { ApolloClientProvider };
// uri: 'https://f22c-197-32-64-10.ngrok-free.app', // Replace with your GraphQL endpoint
