import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert, ScrollView,
} from 'react-native';
import ExpandedMessage from '../Components/ExpandedMessage';
import { Header } from 'react-native-elements'

const termsMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "+ 
"Suspendisse auctor dui vitae nisl interdum consectetur. Fusce pulvinar lorem" + 
"ut velit scelerisque mollis. Curabitur fermentum tempor eros ut euismod." +
"Donec pellentesque ante vitae lectus vulputate, non porttitor ex tempus. Sed" +
"posuere cursus ante, eu mattis lacus semper eget. Vestibulum suscipit" +
"condimentum blandit. Duis vitae varius purus. Mauris non nisl ultricies, " + 
"molestie orci quis, ultricies sapien. Nullam lobortis rhoncus sapien, vel" +
"tristique ligula cursus vitae."

const privacyMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "+ 
"Suspendisse auctor dui vitae nisl interdum consectetur. Fusce pulvinar lorem" + 
"ut velit scelerisque mollis. Curabitur fermentum tempor eros ut euismod." +
"Donec pellentesque ante vitae lectus vulputate, non porttitor ex tempus. Sed" +
"posuere cursus ante, eu mattis lacus semper eget. Vestibulum suscipit" +
"condimentum blandit. Duis vitae varius purus. Mauris non nisl ultricies, " + 
"molestie orci quis, ultricies sapien. Nullam lobortis rhoncus sapien, vel" +
"tristique ligula cursus vitae."

export default class About extends Component {

  static navigationOptions = {
    drawerLabel: 'About',
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
          centerComponent={{ text: 'About App', style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#5E8D93',
          }}
        />
        <ScrollView>
          <ExpandedMessage title="Terms of Service" message={termsMsg} />
          <ExpandedMessage title="Privacy Policy" message={privacyMsg} />
        </ScrollView>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    top: 0,
    bottom: 0,
  },
});