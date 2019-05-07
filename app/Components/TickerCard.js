import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet
} from 'react-native';

export default class TickerCard extends Component {
  render() {
    let {id, name, price} = this.props;
    return (
      <View style={styles.container}>
        <Text>{id}</Text>
        <Text>{name}</Text>
        <Text>{price}</Text>
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
