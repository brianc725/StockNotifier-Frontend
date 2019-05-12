import React, { Component } from 'react';
import {
  Text, View
} from 'react-native';
import styles from '../styles';
import PrimaryButton from '../Components/PrimaryButton';

export default class Landing extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <PrimaryButton
            onPress={() => this.props.navigation.navigate('Register')}>Sign Up
          </PrimaryButton>
        </View>
      </View>
    );
  }
}
