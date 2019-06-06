import React, { Component } from 'react';
import {
  Text, View
} from 'react-native';
import styles from '../styles';
import PrimaryButton from '../Components/PrimaryButton';
import { register, login } from '../auth'

export default class Landing extends Component {

  async f() {
    console.log(await register('f', 'u'));
  }

  async g() {
    console.log(await login('f', 'u'));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.landingInputContainer}>
          <PrimaryButton
            onPress={() => this.props.navigation.navigate('Register')}>
              Sign Up
          </PrimaryButton>
          <PrimaryButton
            onPress={() => this.f("f", "u")}>
              Test Register
          </PrimaryButton>
          <PrimaryButton
            onPress={() => this.g("f", "u")}>
              Test Login
          </PrimaryButton>
        </View>
      </View>
    );
  }
}
