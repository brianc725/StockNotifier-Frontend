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
        {/* <Text style={styles.welcome}>Log In</Text> */}
        <View style={styles.formContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
