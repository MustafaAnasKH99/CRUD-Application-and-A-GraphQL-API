import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:5000/BeMyGuest"
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>User-Interface</h1>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
