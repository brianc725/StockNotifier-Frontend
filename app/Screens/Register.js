import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import RegisterForm from '../Components/RegisterForm'
import styles from '../styles'

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login</Text>
        <View style={styles.formContainer}>
          <RegisterForm />
        </View>
      </View>
    );
  }
}
