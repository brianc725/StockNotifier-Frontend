import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, FlatList, StyleSheet, Dimensions,
  ActivityIndicator, Alert, Platform, Modal, TouchableHighlight, Animated
} from 'react-native';
import TickerCard from '../Components/TickerCard';
import { contains } from '../Scripts/Search';
import PrimaryButton from '../Components/PrimaryButton';
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar, Button } from 'react-native-elements'
import Ionicon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import _ from 'lodash';

const API_URL = Platform.OS == 'ios' ? "http://localhost:5000/tickers" : "http://10.0.2.2:5000/tickers"
// const AnimatedIcon = Animated.createAnimatedComponent(Icon);

// The filter picker options 
const pickerValues = [
  {
    title: 'A-Z by Name',
    value: 'azID'
  },
  {
    title: 'Z-A by Name',
    value: 'zaID'
  },
  {
    title: 'Increasing Price',
    value: 'incrPrice'
  },
  {
    title: 'Decreasing Price',
    value: 'decrPrice'
  },
]


export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker_data: undefined,
      search: "",
      // all of the data received by the api call for "restoring" after search filtering
      full_ticker_data: [],
      lastUpdated: undefined,
      // default sort by a-z
      filterMode: 'azID',
      pickerDisplayed: false,
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

  _keyExtractor = (item) => item.id;

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

  // Navigate to add ticker page with props of user's ticker data passed in
  onAddSymbolPress() {
    const { ticker_data } = this.state;

    this.props.navigation.navigate('ManageTickers', {
      userTickers: ticker_data,
    });
  }

  // Toggle the Pop up Picker for Filter options
  togglePicker() {
    const { pickerDisplayed } = this.state;
    this.setState({
      pickerDisplayed: !pickerDisplayed,
    });
  }

  // Save the picker value chosen 
  setPickerValue(selection) {
    this.setState({
      filterMode: selection
    })

    // Close the picker 
    this.togglePicker();
  }

  filterData = () => {
    const { filterMode, ticker_data } = this.state;
    switch (filterMode) {
      // Apple, Boeing, Delta, Snap
      case 'azID':
        return ticker_data.sort((a, b) => {
          return a.id.toLowerCase() >= b.id.toLowerCase();
        });
      // Snap, Delta, Boeing, Apple
      case 'zaID':
        return ticker_data.sort((a, b) => {
          return a.id.toLowerCase() <= b.id.toLowerCase();
        });
      // 10, 40, 200, 3000
      case 'incrPrice':
        return ticker_data.sort((a, b) => {
          var aPrice = parseFloat(a.price);
          var bPrice = parseFloat(b.price)

          // If any of the prices are NaN, just treat as Infinity 
          if (isNaN(aPrice)) {
            aPrice = Infinity;
          }
          if (isNaN(bPrice )) {
            bPrice = Infinity;
          }

          return aPrice >= bPrice;
        });
      // 3000, 200, 40, 10
      case 'decrPrice':
        return ticker_data.sort((a, b) => {
          var aPrice = parseFloat(a.price);
          var bPrice = parseFloat(b.price)

          // If any of the prices are NaN, just treat as Infinity 
          if (isNaN(aPrice)) {
            aPrice = Infinity;
          }
          if (isNaN(bPrice )) {
            bPrice = Infinity;
          }

          return aPrice <= bPrice;
        });
      // no filter
      default:
        return ticker_data;
    }
  }

  // Handle the deletion of the ticker 
  handleDelete(item) {
    Alert.alert('Deleted not implemented!');
    // Call the API with the API to be deleted 

    // Alert.alert('Deleted ' + item.id);
  }

  // Confirm deletion of the stock ticker
  confirmDelete(item) {
    const tickerID = item.id

    Alert.alert(
      'Are you sure you want to delete?',
      tickerID,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.handleDelete(item) }
      ],
      { cancelable: false },
    );
  }

  renderItem(item) {
    // Buttons
    let swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.confirmDelete(item); }
      },
    ];

    return (
      <Swipeout right={swipeoutBtns}
        autoClose={true}
        backgroundColor='transparent'>
        <TickerCard id={item.id} name={item.name} price={item.price} />
      </Swipeout>
    );
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

    // Loading screen 
    if (ticker_data === undefined) {
      return (
        <SafeAreaView style={styles.loading}>
          <Text style={styles.infoText}>Attempting to get ticker data...</Text>
          <ActivityIndicator size="large" color="#0B3948" />
          <Button
            onPress={() => this.grabData()}
            title="Refresh Now"
          />
        </SafeAreaView>
      );
    }

    else {
      // TODO: Maybe have a filter option to sort by A-Z, sort by price, etc.
      const timeStamp = <Text style={styles.footerText}>Last updated: {lastUpdated}</Text>

      return (
        <View style={styles.container}>
          {header}
          {/* Picker Modal */}
          <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
            <View style={styles.picker}>
              <Text style={{ color: 'white', fontSize: 20, }}>Please pick filtering option:</Text>
              {pickerValues.map((choice, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    onPress={() => this.setPickerValue(choice.value)}
                    style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text style={styles.pickerText}>> {choice.title}</Text>
                  </TouchableHighlight>);
              })}

              {/* Close the picker on cancel */}
              <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: '#D9DBF1' }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <FlatList
            data={this.filterData()}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={
              <View>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => this.onAddSymbolPress()}>
                    <Text style={styles.addText}>+ Add Symbol</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.togglePicker()}>
                    <Ionicon color="white" name="ios-funnel" size={25} />
                  </TouchableOpacity>
                </View>
                <SearchBar style={styles.search} placeholder="Search Followed Stocks..." lightTheme round onChangeText={this.handleSearch} value={search} />
              </View>
            }
            // Only show Empty Component to add new stock if search length is 0
            ListEmptyComponent={
              (this.state.search.length == 0 && <TouchableOpacity onPress={() => this.onAddSymbolPress()}>
                <Text style={styles.emptyAdd}>Add first stock!</Text>
              </TouchableOpacity>)
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
    justifyContent: 'space-around',
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
  },
  picker: {
    margin: 20,
    padding: 20,
    backgroundColor: '#5E8D93',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 3,
  },
  pickerText: {
    fontSize: 17,
    color: 'white',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
});
