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
import PrimaryButton from '../Components/PrimaryButton';
import { contains } from '../Scripts/Search';
import _ from 'lodash';

// Don't want this page to show up in the Drawer Navigator 
class Hidden extends React.Component {
  render() {
    return null;
  }
}

const NYSE_URL = Platform.OS == 'ios' ? "http://localhost:5000/nyse" : "http://10.0.2.2:5000/nyse"
const ITEMS_PER_PAGE = 20;

// This class is for adding new stock tickers 
export default class ManageTickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      tickers: undefined,
      // all of the data received by the api call for "restoring" after search filtering
      all_tickers: [],
      // Remove this, this is passed via props
      userTickers: [],
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
        tickers: tempJSON.nyse,
        all_tickers: tempJSON.nyse,
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
            tickers: stuff.nyse,
            all_tickers: stuff.nyse,
          });
        })
        .catch((error) => { console.log(error); });
    }
  }

  // Hide direct navigation to this page via Drawer
  static navigationOptions = {
    drawerLabel: <Hidden />,
  };

  _keyExtractor = (item) => item.id;

  filterData = () => {
    const { navigation } = this.props;
    const { tickers } = this.state;
    const userTickers = navigation.getParam('userTickers');

    // Sort all Tickers
    let sortedTickers = tickers.sort((a, b) => {
      return a.id.toLowerCase() >= b.id.toLowerCase();
    });

    // Remove tickers that the user has already added
    // Written by Vincent 
    let removedTickers = sortedTickers.filter(stock =>
      !userTickers.map(elem => elem.id).includes(stock.id));

    // Return edited information
    return removedTickers;
  }

  // Save the current query string from the user 
  handleSearch = search => {
    // console.log("search", search)
    const formatSearch = search.toLowerCase();
    // Filter for results via contain function
    const tickers = _.filter(this.state.all_tickers, item => {
      return contains(item, formatSearch);
    });
    this.setState({ search: formatSearch, tickers });
  }

  render() {
    let { search, tickers } = this.state;

    // Loading screen 
    if (tickers === undefined) {
      return (
        <SafeAreaView style={localStyles.loading}>
          <Text style={localStyles.infoText}>Attempting to get all tickers...</Text>
          <ActivityIndicator size="large" color="#0B3948" />
          <PrimaryButton onPress={() => this.grabData()}>Refresh Now</PrimaryButton>
        </SafeAreaView>
      );
    }

    else {
      return (
        <View style={localStyles.container}>
          <Header
            centerComponent={{ text: 'Add Symbols', style: { color: '#fff' } }}
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
            data={this.filterData()}
            renderItem={({ item }) =>
              <TickerCard id={item.id} name={item.name} price={'ADD'} />}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={
              <View>
                <SearchBar style={styles.search} placeholder="Search For Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />
              </View>
            }
            ListFooterComponent={
              // Showing ... of tickers.length. 
              <View>
                {/* Need special case if on page tickers shown is > tickers.length  */}
                <Text style={localStyles.footerText}>Showing ___ of {this.state.tickers.length}</Text>
                {/* Change this to a button */}
                {this.state.tickers.length != 0 && <Text style={localStyles.footerText}>Load more...</Text>}
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