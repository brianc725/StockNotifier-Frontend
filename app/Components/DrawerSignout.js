import React, { Component } from "react";
import { SafeAreaView, ScrollView, Button } from 'react-native';
import { DrawerItems } from "react-navigation";
import { clearSignIn } from '../auth';

export default class DrawerSignout extends Component {
  onSignOut = () => {
    clearSignIn();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <DrawerItems {...this.props} />
          <Button title="LOG OUT" onPress={this.onSignOut}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
