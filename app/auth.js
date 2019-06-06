import AsyncStorage from '@react-native-community/async-storage';
import ClientLogin from './ClientLogin';

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


const domain = 'http://cs130-stock-notifier-http-server.us-west-1.elasticbeanstalk.com/';
// const domain = 'http://10.0.2.2:5000';

const routes = {
  register: domain + '/register',
  login: {
    get_salt: domain + '/login/get_salt',
    get_b: domain + '/login/get_b',
    get_m2: domain + '/login/get_m2',
  }
};

function fetchWithTimeout(url, options, timeout = 1000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

function generateMessage(data = {}) {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  }
}

export async function register(username, password) {
  rvals = await ClientLogin.generateRegistration(username + password);
  data = {
    'username': username,
    'user_salt': rvals.s,
    'user_verifier': rvals.v
  }
  console.log(JSON.stringify(data));
  await fetchWithTimeout(routes.register, generateMessage(data))
  .then(function(response) {
    if (response.ok || response.status == 400 || response.status == 500) {
      return response.json();
    }
    throw new Error("ERROR");
  }).then(function(resBody) {
    if (typeof resBody.error !== "undefined") {
      alert(resBody.error);
      return false;
    } else {
      alert("registered");
      return true;
    }
  }).catch(function(error) {
    alert(error);
    return false;
  })
}


export async function login(username, password) {
  
  got_salt = await fetchWithTimeout(routes.login.get_salt, generateMessage({
    'username': username,
  })).then(function(response) {
    if (response.ok || response.status == 400 || response.status == 500) {
      return response.json();
    }
    throw new Error("ERROR");
  }).then(function(resBody) {
    if (typeof resBody.error !== "undefined") {
      alert(resBody.error);
      return null;
    } else {
      alert("got salt");
      AsyncStorage.setItem("username", username);
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })

  if (!got_salt) {
    return false;
  }

  avals = await ClientLogin.generateAs();

  got_b = await fetchWithTimeout(routes.login.get_b, generateMessage({
    'username': username,
    'big_a': avals.A,
  })).then(function(response) {
    if (response.ok || response.status == 400 || response.status == 500) {
      return response.json();
    }
    throw new Error("ERROR");
  }).then(function(resBody) {
    if (typeof resBody.error !== "undefined") {
      alert(resBody.error);
      return null;
    } else {
      alert("got B");
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })

  if (!got_b) {
    return false;
  }

  console.log(username,
    username + password,
    avals.a,
    avals.A,
    got_b.big_b,
    got_salt.user_salt,
    got_b.nonce);

  vvals = await ClientLogin.generateKey(
    username,
    username + password,
    avals.a,
    avals.A,
    got_b.big_b,
    got_salt.user_salt,
    got_b.nonce
  );

  console.log(vvals.hv);

  fcmToken = await AsyncStorage.getItem('fcmToken');

  got_m2 = await fetchWithTimeout(routes.login.get_m2, generateMessage({
    'username': username,
    'm1': vvals.m1,
    'session_id': vvals.hv,
    'device_id': fcmToken,
  })).then(function(response) {
    if (response.ok || response.status == 400 || response.status == 500) {
      return response.json();
    }
    throw new Error("ERROR");
  }).then(function(resBody) {
    if (typeof resBody.error !== "undefined") {
      alert(resBody.error);
      return null;
    } else {
      alert("got m2");
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })
  
  if (!got_m2) {
    return false;
  }

  return true;
}
