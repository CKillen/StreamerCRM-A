const express = require('express');
const router = express.Router();
const { loginOrCreateUser } = require('../db/dbCalls');
const Axios = require('axios');
const config = require('../config/config');
const { clientId } = require('../config/config');

router.post('/signup', (routeReq, routeRes) => {
  routeRes.redirect(`${config.twitchOauthUrl}authorize?claims=${config.claims}&response_type=code&client_id=${config.clientId}&state=reee&redirect_uri=${config.oauthRedirect}&response_type=post&scope=${config.scope}`)
});

router.get('/signupFinish', (routeRequest, routeResponse) => {
  tokenPost(routeRequest.query.code)
  .then(tokenResponse => {
    grabUserInfo(tokenResponse.data.access_token)
    .then(userInfo => {
      loginOrCreateUser(userInfo)
      .then(response => {
          routeResponse.redirect(`${config.redirect}?apikey=${response}`);
      })
      .catch(error => {
	      console.log('loginn', error)
	      routeResponse.redirect(`${config.redirect}?error=true`)
      })
    })
    .catch(error => routeResponse.redirect(`${config.redirect}?error=true`))
  })
  .catch(error => {
	  console.log('token', error);
	  routeResponse.redirect(`${config.redirect}?error=true`)})
})

function grabUserInfo(token) {
  return new Promise((resolve, reject) => {
    Axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'client-id': config.clientId,
      }
    })
    .then(response => {
      const { id, display_name, email } = response.data.data[0];
      const userInfo = {
        email,
        id,
        username: display_name.toLowerCase(),
      }
      resolve(userInfo)
    })
    .catch(response => console.log(response))
  })
}

function tokenPost(code) {
  const apicall = `${config.twitchOauthUrl}token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=authorization_code&redirect_uri=${config.oauthRedirect}&code=${code}`;
  return new Promise((resolve, reject) => {
    Axios.post(apicall)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

module.exports = router;
