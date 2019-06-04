import React, { Component } from 'react';
import {
  Text, View
} from 'react-native';
import styles from '../styles';
import PrimaryButton from '../Components/PrimaryButton';
import ClientLogin from '../ClientLogin'

export default class Landing extends Component {

  async promiseTest() {
    console.debug(await ClientLogin.generateAs())
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.landingInputContainer}>
          <PrimaryButton
            onPress={() => this.props.navigation.navigate('Register')}>Sign Up
          </PrimaryButton>
          <PrimaryButton
            onPress={() => this.promiseTest()}>Test
          </PrimaryButton>
        </View>
      </View>
    );
  }
}
