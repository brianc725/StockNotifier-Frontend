import React, {  Component } from 'react';
import {
  Text, TouchableOpacity
} from 'react-native';
import styles from '../styles'

export default class PrimaryButton extends Component {
  render() {
    return (
      <TouchableOpacity style={this.props.disabled ? styles.buttonDisabledContainer : styles.buttonContainer} 
        onPress={this.props.disabled ? null : this.props.onPress}
        disabled={this.props.disabled}>
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

PrimaryButton.defaultProps = {
  disabled: false,
}
