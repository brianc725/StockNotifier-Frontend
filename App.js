/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import Login from './app/Screens/Login';
// import StockList from './app/Screens/StockList';
// import Register from './app/Screens/Register';

import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import Login from './app/Screens/Login';
import StockList from './app/Screens/StockList';
import Register from './app/Screens/Register';
import Navigator from './app/Navigator';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Sound from 'react-native-sound';



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
async componentDidMount() {
	const channel = new firebase.notifications.Android.Channel(
	"notification",
	"Notification",
	firebase.notifications.Android.Importance.High,
	)//.setSound("default");
    firebase.notifications().android.createChannel(channel);
  this.checkPermission();
  this.createNotificationListeners(); 
  
}

  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
    console.log('Token:' + fcmToken);

}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
        console.log('Check Permission')
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const {title, body} = notification;
      this.sendNotification(notification.setSound("default"));
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  	  this.sendNotification(notificationOpen.notification.setSound("default"));
  	    });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  // if (notificationOpen) {
  // 	 this.sendNotification(notificationOpen.notification.setSound("default"));
  // }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

sendNotification(notification){
	var sound = new Sound('cha_ching_sound', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
            } else {
                sound.play(); // have to put the call to play() in the onload callback
            }
        });
	const channelGroup = new firebase.notifications.Android.ChannelGroup('notification-group', 'Notification Group');
	firebase.notifications().android.createChannelGroup(channelGroup);
      notification = notification//.setSound("default")
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .android.setChannelId('notification')
      .android.setGroup('notification-group')
      .android.setGroupSummary(true)
      .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.All)
      .android.setCategory(firebase.notifications.Android.Category.Alarm)
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setAutoCancel(true);
      firebase.notifications().displayNotification(notification);
}

  render() {
    return (
      // <Login></Login>
      // <Register></Register>
      // <StockList></StockList>
      // <SignedOut></SignedOut>
      // <SignedIn/>
      <Navigator/>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });