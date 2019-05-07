import React, {  Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet, Dimensions
} from 'react-native';

export default class TickerCard extends Component {
  render() {
    let {id, name, price} = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.idText}>{id}</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.priceText}>${price}</Text>
        </View>
      </View>
    );
  }
}

/* Get width of window */
const { width, height } = Dimensions.get('window');
const headerHeight = 80;

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: height / 8,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  },
  nameText: {
    fontSize: 12,
    color: '#616161'
  },
  idText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  priceText: {
    fontSize: 20,
  },
});
