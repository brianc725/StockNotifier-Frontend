import AsyncStorage from '@react-native-community/async-storage';

export const USER_KEY = "auth-demo-key";

export const saveSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const clearSignIn = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
