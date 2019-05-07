import React, { Component } from 'react';
import {
  Text, View
} from 'react-native';
import LoginForm from '../Components/LoginForm'
import styles from '../styles'

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    );
  }
}
