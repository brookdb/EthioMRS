import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

//components
import Search from './components/search';
import AddPatient from './components/addPatient';
import Menu from './components/menubar/menubar';

//apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="main">
        <h1>Hospital</h1>
        <Menu/>
        <Search/>
        <AddPatient/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
