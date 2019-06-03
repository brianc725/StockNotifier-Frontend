import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet, Dimensions,
} from 'react-native';

export default class SupportResistData extends Component {

  render() {
    const { item } = this.props;

    if (item === undefined) {
      return (
        <View>
        </View>
      )
    }
    else {
      const { strength, price } = item;
      return (
        <View>
          <Text style={styles.infoText}>${price}</Text>
          <Text style={styles.infoText}>Strength: {strength}</Text>
        </View>
      );
    }
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');

const text = {
  color: 'black',
  fontSize: 20,
  textAlign: 'center',
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 12,
    color: '#616161'
  },
  idText: {
    ...text,
    fontWeight: 'bold',
  },
  priceText: {
    ...text,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoText: {
    ...text,
    fontSize: 16,
  }
});