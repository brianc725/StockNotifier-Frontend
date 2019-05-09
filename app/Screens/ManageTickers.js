import React, { Component } from 'react';
import {
  Text, View
} from 'react-native';
import styles from '../styles'

export default class ManageTickers extends Component {
  static navigationOptions = {
    drawerLabel: 'Manage Tickers',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Manage Tickers</Text>
      </View>
    );
  }
}
