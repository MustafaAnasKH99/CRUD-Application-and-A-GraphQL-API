import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css';

// imported comps
import Products from './Components/Products'

const client = new ApolloClient({
  uri: "http://localhost:5000/BeMyGuest"
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>User-Interface</h1>
          <Products />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
