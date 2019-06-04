import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert, Platform, FlatList, ActivityIndicator,
  TouchableOpacity, Button,
} from 'react-native';
import styles from '../styles'
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import TickerCard from '../Components/TickerCard';
import { contains } from '../Scripts/Search';
import _ from 'lodash';

// Don't want this page to show up in the Drawer Navigator 
class Hidden extends React.Component {
  render() {
    return null;
  }
}

const NYSE_URL = `http://cs130-stock-notifier-http-server.us-west-1.elasticbeanstalk.com/all_tickers`;
const ITEMS_PER_PAGE = 20;

// This class is for adding new stock tickers 
export default class ManageTickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      // tickers is the tickers for user to display, dynamic
      tickers: undefined,
      // all Tickers is all of the tickers for API for search, static
      allTickers: [],
      offset: 1,
    };
  }

  async componentDidMount() {
    this.grabData()
  }

  // Function gets all stock tickers in NYSE from storage or the API 
  async grabData() {

    // Check to see if we already have it in storage 
    const temp = await AsyncStorage.getItem('ALL_TICKERS')
    if (temp !== null) {
      // value previously stored
      tempJSON = JSON.parse(temp);

      // Currently data is returned in 'nyse'
      this.setState({
        tickers: tempJSON,
        allTickers: tempJSON,
      });
    }
    else {
      // Fetch the data from the API 
      let stuff;
      await fetch(NYSE_URL)
        .then((response) => { return response.json(); })
        .then((data) => {
          stuff = data;
          // Store the value in storage
          AsyncStorage.setItem('ALL_TICKERS', JSON.stringify(data))

          // Currently data is returned in 'nyse'
          this.setState({
            tickers: stuff,
            allTickers: stuff,
          });
        })
        .catch((error) => { console.log(error); });
    }
  }

  // Hide direct navigation to this page via Drawer
  static navigationOptions = {
    drawerLabel: <Hidden />,
  };

  _keyExtractor = (item) => item.symbol;

  filterData = () => {
    const { navigation } = this.props;
    const { tickers, offset } = this.state;
    const userTickers = navigation.getParam('userTickers');

    // Sort all Tickers
    let sortedTickers = tickers.sort((a, b) => {
      return a.symbol.toLowerCase() >= b.symbol.toLowerCase();
    });

    // Remove tickers that the user has already added
    // Written by Vincent 
    let removedTickers = sortedTickers.filter(stock =>
      !userTickers.map(elem => elem.symbol).includes(stock.symbol));

    // Limit amount displayed
    let resulting = removedTickers.slice(0, offset * ITEMS_PER_PAGE);

    // Return edited information
    return resulting;
  }

  loadMoreData = () => {
    const { offset } = this.state;
    let updatedOffset = offset + 1;

    this.setState({
      offset: updatedOffset,
    });
  }

  // Save the current query string from the user 
  handleSearch = search => {
    const formatSearch = search.toLowerCase();
    // Filter for results via contain function
    const tickers = _.filter(this.state.allTickers, item => {
      return contains(item, formatSearch);
    });
    this.setState({ search: formatSearch, tickers });
  }

  resetOffset = () => {
    this.setState({
      offset: 1,
    });
  }

  resetClear = () => {
    AsyncStorage.removeItem('ALL_TICKERS');
    this.grabData();
    this.resetOffset();
  }

  render() {
    let { search, tickers } = this.state;

    // Loading screen 
    if (tickers === undefined) {
      return (
        <SafeAreaView style={localStyles.loading}>
          <Text style={localStyles.infoText}>Attempting to get all tickers...</Text>
          <ActivityIndicator size="large" color="#0B3948" />
          <Button
            onPress={() => this.grabData()}
            title="Refresh Now"
          />
        </SafeAreaView>
      );
    }

    else {
      const displayData = this.filterData();
      const { navigation } = this.props;
      const userTickers = navigation.getParam('userTickers');

      // Array of tickers that were same
      let duplicatedTickers = tickers.filter(stock =>
        userTickers.map(elem => elem.symbol).includes(stock.symbol));
      // Number of tickers remaining that user could add 
      const totalNonUserTickers = tickers.length - duplicatedTickers.length;

      return (
        <View style={localStyles.container}>
          <Header
            leftComponent={{
              text: 'Reset',
              style: { color: '#fff' },
              onPress: () => this.resetOffset(),
              onLongPress: () => this.resetClear(),
            }}
            centerComponent={{ 
              text: 'Add Symbols', 
              style: { color: '#fff' } 
            }}
            rightComponent={{
              icon: 'done',
              color: '#fff',
              onPress: () => this.props.navigation.goBack(),
            }}
            containerStyle={{
              backgroundColor: '#5E8D93',
            }}
          />
          <FlatList
            data={displayData}
            renderItem={({ item }) =>
              <TickerCard id={item.symbol} name={item.name} price={'ADD'} />}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={
              <View>
                <SearchBar style={styles.search} placeholder="Search For Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />
              </View>
            }
            ListFooterComponent={
              <View>
                <Text style={localStyles.footerText}>Showing {displayData.length} of {totalNonUserTickers}</Text>
                {
                  this.state.tickers.length != 0
                  &&
                  displayData.length < totalNonUserTickers
                  &&
                  <Button
                    onPress={() => this.loadMoreData()}
                    title="Load More"
                  />
                }
              </View>
            }
          />
        </View>
      );
    }
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    color: 'white'
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});