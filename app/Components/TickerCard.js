import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet, Dimensions,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const API_URL = 'http://cs130-stock-notifier-http-server.us-west-1.elasticbeanstalk.com/add_ticker';

export default class TickerCard extends Component {

  async onAddPress(name) {
    // TODO: load this stuff in from async storage
    const body = {
      username: 'brian',
      session_id: '0747f11d56c721d49fae05e96abf261c192503b6bf59a2897f069738c3cbe8ff',
      tickers: [name],
    };

    // Fetch the data from the API 
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => { return response.json(); })
      .then((data) => {
        Alert.alert(name + ' was added!');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(name + ' failed to be added at this time');
      });
  }

  render() {
    const { id, name, price } = this.props;

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
          <View>
            <Text style={styles.idText}>{id}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View>
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
    color: 'black',
  },
});
