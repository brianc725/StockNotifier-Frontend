import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet
} from 'react-native';

export default class StockList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>StockList Page!</Text>
        <Text style={styles.instructions}>To get started, edit StockList.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
