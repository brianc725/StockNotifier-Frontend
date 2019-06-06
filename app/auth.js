import AsyncStorage from '@react-native-community/async-storage';
import ClientLogin from './ClientLogin';

const domain = 'http://cs130-stock-notifier-http-server.us-west-1.elasticbeanstalk.com/';

const routes = {
  register: domain + '/register',
  login: {
    get_salt: domain + '/login/get_salt',
    get_b: domain + '/login/get_b',
    get_m2: domain + '/login/get_m2',
    terminate: domain + '/login/terminate',
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

export const clearSignIn = async () => {
  username = await AsyncStorage.getItem("username");
  session_id = await AsyncStorage.getItem("session_id");
  data = {
    'username': username,
    'session_id': session_id,
  };
  return await fetchWithTimeout(routes.login.terminate, generateMessage(data))
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
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("session_id");
      return true;
    }
  }).catch(function(error) {
    alert(error);
    return false;
  })
}


export async function register(username, password) {
  rvals = await ClientLogin.generateRegistration(username + password);
  data = {
    'username': username,
    'user_salt': rvals.s,
    'user_verifier': rvals.v
  }
  console.log(JSON.stringify(data));
  return await fetchWithTimeout(routes.register, generateMessage(data))
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
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })

  console.log(got_salt);

  if (got_salt == null) {
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
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })

  if (got_b === null) {
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
      return resBody;
    }
  }).catch(function(error) {
    alert(error);
    return null;
  })
  
  if (got_m2 === null) {
    return false;
  }

  if (got_m2.m2 != vvals.m2) {
    return false;
  }
  
  AsyncStorage.setItem("username", username);
  AsyncStorage.setItem("session_id", vvals.hv);

  return true;
}
