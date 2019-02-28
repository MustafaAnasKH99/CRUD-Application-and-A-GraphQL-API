import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './App.css';

// imported comps
import Products from './Components/Products'
import CreateProduct from './Components/CreateProduct'
import CreateCategory from './Components/CreateCategory'

const client = new ApolloClient({
  uri: "http://localhost:5000/BeMyGuest"
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="grid-container">
          <h1>User-Interface</h1>
          <Products />
          <CreateCategory />
          <CreateProduct />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
