import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator, Alert
} from 'react-native';
import TickerCard from '../Components/TickerCard';
import PrimaryButton from '../Components/PrimaryButton';
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements'

// TODO: Remove Header so that there is no back button when navigating from 
//       Login page.

const API_URL = "http://localhost:5000/tickers"
// const API_URL = "http://10.0.2.2:5000/tickers"  // for android simulator

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker_data: undefined,
    };
  }

  static navigationOptions = {
    drawerLabel: 'Following Stocks',
  };

  async componentDidMount() {
    let temp;

    // Fetch the data from the API 
    await fetch(API_URL)
      .then((response) => { return response.json(); })
      .then((data) => {
        temp = data;
        // Currently data is returned in 'tickers'
        this.setState({ ticker_data: temp.tickers });
      })
      .catch((error) => { console.log(error); });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    let { ticker_data } = this.state

    if (ticker_data === undefined) {
      return (
        // TODO: refresh every 5 seconds until it can connect
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>Attempting to get ticker data...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      );
    }

    if (ticker_data.length === 0) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>No tickers added yet.</Text>
          {/* Takes you to manage tickers page right away  */}
          <PrimaryButton onPress={() => this.props.navigation.navigate('ManageTickers')}>Manage Stock List</PrimaryButton>
        </SafeAreaView>
      );
    }

    // TODO: Maybe have a filter option to sort by A-Z, sort by price, etc.
    return (
      <View style={styles.container}>
      <Header 
        leftComponent={{ 
          icon: 'menu', 
          color: '#fff', 
          onPress: () => this.props.navigation.openDrawer(), 
        }}
        centerComponent={{ text: 'Following Stocks', style: { color: '#fff' } }}
        rightComponent={{ 
          icon: 'refresh', 
          color: '#fff',
          onPress: () => Alert.alert('Refresh has not been implemented yet!'),
        }}
        containerStyle={{
          backgroundColor: '#5E8D93',
        }}
        />
        <FlatList
          data={this.state.ticker_data}
          renderItem={({ item }) =>
            <TickerCard id={item.id} name={item.name} price={item.price} />}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E8D93',
    top: 0,
    bottom: 0,
  },
  loading: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
