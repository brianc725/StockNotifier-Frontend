import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Header } from 'react-native-elements'

export default class Privacy extends Component {

  static navigationOptions = {
    drawerLabel: 'Privacy Policy',
  };

  render() {
    return (
      <View style={localStyles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
          }}
          centerComponent={{ text: 'Privacy Policy', style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#5E8D93',
          }}
        />
        <WebView
          source={{ uri: 'https://github.com/brianc725/StockNotifier-Frontend/blob/master/PRIVACY.md' }}
        />
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});