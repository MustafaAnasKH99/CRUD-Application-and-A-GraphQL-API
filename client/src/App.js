import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { graphql } from 'react-apollo'
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:5000/BeMyGuest"
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
