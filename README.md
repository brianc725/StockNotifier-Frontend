# Stock Notification App - Frontend 
## CS 130 

## Installation Guide
- Pull repo from Github.
- Install dependencies

```
$ react-native upgrade
```

```
$ npm install
```

```
$ react-native link react-native-vector-icons
$ react-native link @react-native-community/async-storage
$ react-native link react-native-svg
$ react-native link react-native-webview
$ react-native link
```

- Run (Temporary) Local API for StockList page 
    - Open new terminal window and CD into `./app/Scripts/`
    - Run the following 
    - Note: If there's a problem delete `app.pyc`.
```
$ flask run
```
- Set PROJECT_ROOT Variable 
    - CD into the base of the repository
```
export PROJECT_ROOT=$(pwd)
```

- Confirm PROJECT_ROOT is base of repository 
```
echo $PROJECT_ROOT
```

- Run app depending on which platform you would like
```
$ react-native run-ios
$ react-native run-android
```
- Note: For Android, the emulator must be opened in advance before using 
the `react-native run-android` command. To do so, CD into `./app/Scripts/`.

    - For Windows run `android-emulator.bat`
    - For MacOS: `./emulator-android-mac.sh`

## Debugging

- For Fatal Android crushes, review `adb logcat`.
- For haste cache module crashes, delete `package-lock.json` and `npm install` fresh.

## Introduction

The Stock Notification App has the purpose of allowing users to follow tickers 
and receive notifications for when it hits a support or resistance line. It is 
developed in React Native with primary build target of Android. 