import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import styles from '../styles'
import { clearSignIn } from '../auth';

export default class Register extends Component {

  onSignOut = () => {
    clearSignIn();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} 
                          onPress={this.onSignOut}>
          <Text  style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
