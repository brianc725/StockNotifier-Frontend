const fetch = require("node-fetch");

const domain = 'http://localhost:5000';

const routes = {
  register: domain + '/register',
  login: {
    get_salt: domain + '/login/get_salt',
    get_b: domain + '/login/get_b',
    get_m2: domain + '/login/get_m2',
  }
};

function dummy_generate_registration(up) {
  return {s: 1, v: 2}
}

function dummy_generate_a() {
  return {big_a: 3, little_a: 4}
}

function dummy_generate_cs(up, little_a, big_a, big_b, user_salt) {
  return {m1: 5, m2: 6}
}

function register(username, password) {
  rvals = dummy_generate_registration(username + password);
  return fetch(routes.register, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      'username': username,
      'user_salt': rvals.s,
      'user_verifier': rvals.v
    })
  }).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(json) {
    console.log(json);
    return(json);
  }).catch(function(err) {
    console.log('Fetch error: ', err.message);
    return null;
  })
}

function get_salt(username, password) {
  return fetch(routes.login.get_salt, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      'username': username,
    })
  }).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(json) {
    return get_b(username, password, json.user_salt, json.nonce);
  }).catch(function(err) {
    console.log('Fetch error: ', err.message);
    return null;
  })
}

function get_b(username, password, user_salt, nonce) {
  avals = dummy_generate_a();
  return fetch(routes.login.get_b, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      'big_a': avals.big_a,
      'nonce': nonce,
    })
  }).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(json) {
    return get_m2(username, password, avals.little_a, avals.big_a, json.big_b, user_salt, nonce)
  }).catch(function(err) {
    console.log('Fetch error: ', err.message);
    return null;
  })
}

function get_m2(username, password, little_a, big_a, big_b, user_salt, nonce) {
  vvals = dummy_generate_cs(username + password, little_a, big_a, big_b, user_salt);
  return fetch(routes.login.get_m2, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify({
      'm1': vvals.m1,
      'nonce': nonce,
    })
  }).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(json) {
    console.log(json);
    return(json);
  }).catch(function(err) {
    console.log('Fetch error: ', err.message);
    return null;
  })
}

function login(username, password) {
  get_salt(username, password)
}

register('username', 'password');
login('username', 'password');
