import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator, Alert, Platform
} from 'react-native';
import TickerCard from '../Components/TickerCard';
import {contains} from '../Scripts/Search';
import PrimaryButton from '../Components/PrimaryButton';
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements'
import _ from 'lodash';

const API_URL = Platform.OS == 'ios' ? "http://localhost:5000/tickers" : "http://10.0.2.2:5000/tickers"

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker_data: undefined,
      search: "",
      // all of the data received by the api call for "restoring" after search filtering
      full_ticker_data: [],
    };
  }

  static navigationOptions = {
    drawerLabel: 'Following Stocks',
  };

  async componentDidMount() {
    this.grabData()
  }

  // Function queries the DB via API URL to return tickers that user is 
  // following 
  async grabData() {
    let temp;

    // Fetch the data from the API 
    await fetch(API_URL)
      .then((response) => { return response.json(); })
      .then((data) => {
        temp = data;
        // Currently data is returned in 'tickers'
        this.setState({
          ticker_data: temp.tickers,
          full_ticker_data: temp.tickers,
        });
      })
      .catch((error) => { console.log(error); });
  }

  _keyExtractor = (item, index) => item.id;

  // Save the current query string from the user 
  handleSearch = search => {
    // console.log("search", search)
    const formatSearch = search.toLowerCase();
    // Filter for results via contain function
    const ticker_data = _.filter(this.state.full_ticker_data, item => {
      return contains(item, formatSearch);
    });
    this.setState({ search: formatSearch, ticker_data });
  }

  render() {
    let { ticker_data, search } = this.state

    if (ticker_data === undefined) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>Attempting to get ticker data...</Text>
          <ActivityIndicator size="large" color="#0B3948" />
          <PrimaryButton onPress={() => this.grabData()}>Refresh Now</PrimaryButton>
        </SafeAreaView>
      );
    }
    // This is for no tickers. Differentiate from no search results.
    else if (ticker_data.length === 0 && search.length == 0) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>No tickers added yet.</Text>
          {/* Takes you to manage tickers page right away  */}
          <PrimaryButton onPress={() => this.props.navigation.navigate('ManageTickers')}>Manage Stock List</PrimaryButton>
        </SafeAreaView>
      );
    }
    else {
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
              onPress: () => this.grabData(),
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
            ListHeaderComponent={<SearchBar placeholder="Search Followed Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />}
            ListFooterComponent={<Text style={styles.footerText}>Viewing {this.state.ticker_data.length} stocks</Text>}
          />
        </View>
      );
    }
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#5E8D93',
    top: 0,
    bottom: 0,
    paddingBottom: 10,
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
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: 'white'
  }
});
