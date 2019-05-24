/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigator from './app/Navigator';
import { Platform, StyleSheet, Text, View } from 'react-native';
// import Login from './app/Screens/Login';
// import StockList from './app/Screens/StockList';
// import Register from './app/Screens/Register';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      // <Login></Login>
      // <Register></Register>
      // <StockList></StockList>
      // <SignedOut></SignedOut>
      // <SignedIn/>
      <Navigator/>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
