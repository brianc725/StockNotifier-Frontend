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

function postData(url = '', data = {}) {
  return fetch(url, {
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
  })
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then(function(json) {
    return(json);
  }).catch(function(error) {
    console.log('Fetch error: ', error.message);
    return null;
  })
}

function register(username, password) {
  rvals = dummy_generate_registration(username + password);
  return postData(routes.register, {
    'username': username,
    'user_salt': rvals.s,
    'user_verifier': rvals.v
  })
}

function get_salt(username) {
  return postData(routes.login.get_salt, {
    'username': username
  })
}

function get_b(big_a, nonce) {
  return postData(routes.login.get_b, {
    'big_a': big_a,
    'nonce': nonce,
  })
}

function get_m2(m1, nonce) {
  return postData(routes.login.get_m2, {
    'm1': m1,
    'nonce': nonce,
  })
}

function login(username, password) {
  get_salt(username)
  .then(function(res1) {
    console.log(res1);
    avals = dummy_generate_a();
    get_b(avals.big_a, res1.nonce)
    .then(function(res2) {
      console.log(res2);
      vvals = dummy_generate_cs(username + password, avals.little_a, avals.big_a, res2.big_b, res1.user_salt);
      get_m2(vvals.m1, res1.nonce)
      .then(function(res3) {
        console.log(res3)
      })
    })
  })
}

register('username', 'password');
login('username', 'password');
