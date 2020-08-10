import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Flex from './Flexbox'
//import { ApolloProvider } from "react-apollo";
//import ApolloClient from "apollo-boost"
import * as serviceWorker from './serviceWorker';



ReactDOM.render(<Flex/>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
