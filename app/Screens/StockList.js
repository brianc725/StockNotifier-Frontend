import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator, Alert, Platform
} from 'react-native';
import TickerCard from '../Components/TickerCard';
import { contains } from '../Scripts/Search';
import PrimaryButton from '../Components/PrimaryButton';
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar, Button } from 'react-native-elements'
import Ionicon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { whileStatement } from '@babel/types';

const API_URL = Platform.OS == 'ios' ? "http://localhost:5000/tickers" : "http://10.0.2.2:5000/tickers"
const NYSE_URL = Platform.OS == 'ios' ? "http://localhost:5000/nyse" : "http://10.0.2.2:5000/nyse"

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker_data: undefined,
      search: "",
      // all of the data received by the api call for "restoring" after search filtering
      full_ticker_data: [],
      lastUpdated: undefined,
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

        // Get last synced time 
        const time = new Date().toLocaleString();

        // Currently data is returned in 'tickers'
        this.setState({
          ticker_data: temp.tickers,
          full_ticker_data: temp.tickers,
          lastUpdated: time,
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
    let { ticker_data, search, lastUpdated } = this.state

    const header = <Header
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

    if (ticker_data === undefined) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>Attempting to get ticker data...</Text>
          <ActivityIndicator size="large" color="#0B3948" />
          <PrimaryButton onPress={() => this.grabData()}>Refresh Now</PrimaryButton>
        </SafeAreaView>
      );
    }

    else {
      // TODO: Maybe have a filter option to sort by A-Z, sort by price, etc.
      const timeStamp = <Text style={styles.footerText}>Last updated: {lastUpdated}</Text>

      return (
        <View style={styles.container}>
          {header}
          <FlatList
            data={this.state.ticker_data}
            renderItem={({ item }) =>
              <TickerCard id={item.id} name={item.name} price={item.price} />}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={
              <View>
                <SearchBar style={styles.search} placeholder="Search Followed Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />
                <View style={styles.row}>
                {/* TODO: Touchable Opacity these two! */}
                  <Text style={styles.addText}>+ Add Symbol</Text>
                  <Ionicon color="white" name="ios-funnel" size={25} />
                </View>
              </View>
            }
            ListEmptyComponent={
              <TouchableOpacity onPress={() => Alert.alert('not implemented yet!')}>
                <Text style={styles.emptyAdd}>Add first stock!</Text>
              </TouchableOpacity>
            }
            ListFooterComponent={
              // Grammatical fix for 1 stock result only 
              this.state.ticker_data.length == 1
                ?
                <View>
                  <Text style={styles.footerText}>Viewing {this.state.ticker_data.length} stock</Text>
                  {timeStamp}
                </View>
                :
                <View>
                  <Text style={styles.footerText}>Viewing {this.state.ticker_data.length} stocks</Text>
                  {timeStamp}
                </View>
            }
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  search: {
    width: 250,
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
  },
  emptyAdd: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: height / 16,
    paddingBottom: height / 16,
    fontSize: 20,
    textAlign: 'center',
    color: '#F4F5FB',
    backgroundColor: '#0B3948',
  },
  addText: {
    fontSize: 17,
    color: 'white',
  }
});
