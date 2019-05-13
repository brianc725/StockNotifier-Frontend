import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert, Platform
} from 'react-native';
import styles from '../styles'
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements'

// Don't want this page to show up in the Drawer Navigator 
class Hidden extends React.Component {
  render() {
    return null;
  }
}

const NYSE_URL = Platform.OS == 'ios' ? "http://localhost:5000/nyse" : "http://10.0.2.2:5000/nyse"

// This class is for adding new stock tickers 
export default class ManageTickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      // all of the data received by the api call for "restoring" after search filtering
      tickers: undefined,
      userTickers: [], 
      all_tickers: [],
    };
  }

  async componentDidMount() {
    this.grabData()
  }

  // Function queries the DB for all stock tickers in NYSE 
  async grabData() {
    let temp;

    // Fetch the data from the API 
    await fetch(NYSE_URL)
      .then((response) => { return response.json(); })
      .then((data) => {
        temp = data;

        // Currently data is returned in 'tickers'
        this.setState({
          // remove the ones that user has already 
          tickers: temp.tickers,
          all_tickers: temp.tickers,
        });
      })
      .catch((error) => { console.log(error); });
  }

  // Hide direct navigation to this page via Drawer
  static navigationOptions = {
    drawerLabel: <Hidden />,
  };

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
    let { search } = this.state;

    return (
      <View style={localStyles.container}>
        {/* TODO: Needs to be edited */}
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
        <SearchBar style={styles.search} placeholder="Search For Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />
      </View>
    );
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
});