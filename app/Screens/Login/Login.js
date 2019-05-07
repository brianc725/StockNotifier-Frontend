import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login Page!</Text>
        <Text style={styles.instructions}>To get started, edit Login.js</Text>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
