import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions
} from 'react-native';
import TickerCard from '../Components/TickerCard';

// TODO: Remove Header so that there is no back button when navigating from 
//       Login page.

// const API_URL = "http://localhost:5000/tickers"
const API_URL = "http://10.0.2.2:5000/tickers"  // for android simulator

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker_data: undefined,
    };
  }

  async componentDidMount() {
    let temp; 

    // Fetch the data from the API 
    await fetch(API_URL)
      .then((response) => {return response.json();})
      .then((data) => {
        temp = data;
        // Currently data is returned in tickers 
        this.setState({ticker_data: temp.tickers});
      })
      .catch((error) => {console.log(error);});
  }

  _keyExtractor = (item, index) => item.id;

  render() {  
    let { ticker_data } = this.state

    // TODO: Convert this Text to the Animation 
    // https://facebook.github.io/react-native/docs/activityindicator
    if (ticker_data === undefined) {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>Attempting to get ticker data...</Text>
        </View>
      );
    }

    if (ticker_data.length === 0){
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>No tickers added yet</Text>
        </View>
      );
    }

    // TODO: Maybe have a filter option to sort by A-Z, sort by price, etc.
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ticker_data}
          renderItem={({item}) => 
            <TickerCard id={item.id} name={item.name} price={item.price}/>}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const headerHeight = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: headerHeight,
    top: 0,
    bottom: 0,
  },
});
