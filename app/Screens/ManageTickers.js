import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert
} from 'react-native';
import styles from '../styles'
import { SafeAreaView } from 'react-navigation';
import { Header, SearchBar } from 'react-native-elements'

export default class ManageTickers extends Component {

  static navigationOptions = {
    drawerLabel: 'Manage Stocks',
  };

  render() {
    return (
      <View style={localStyles.container}>
      {/* TODO: Needs to be edited */}
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
        <Text style={styles.welcome}>Manage Stocks</Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#5E8D93',
    top: 0,
    bottom: 0,
  },
});