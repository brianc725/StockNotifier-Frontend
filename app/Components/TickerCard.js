import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet, Dimensions, 
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class TickerCard extends Component {

  onAddPress(name) {
    Alert.alert(name + " was added!")
  }

  render() {
    let { id, name, price } = this.props;

    // No price means it's just the list for Add Tickers
    if (price === 'ADD') {
      return (
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.idText}>{id}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.onAddPress(id)}>
            <Ionicon color="green" name="ios-add-circle" size={25} />
          </TouchableOpacity>
        </View>
      )
    }
    else {
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
}

/* Get width of window */
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: height / 8,
    backgroundColor: '#E8E9FF',
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#D0CDD7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  nameText: {
    fontSize: 12,
    color: '#616161'
  },
  idText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  priceText: {
    fontSize: 20,
  },
});
