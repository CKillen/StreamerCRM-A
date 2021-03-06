const express = require('express');
const router = express.Router();
const { validateApikey, findOrCreateViewer, updateViewer } = require('../db/dbCalls.js') 

router.use((req, res, next) => {
  console.log("Call has been made!")
  let { authorization } = req.headers;
  if(authorization === undefined) {
    authorization = '';
  }
  const apikey = authorization.split("apikey ")[1];
    validateApikey(apikey)
      .then(response => {
        const { username, id } = response
        req.userId = id;
        req.username = username;
        next();
      })
      .catch(() => res.send({ validated: false }))
})

router.get('/getOrCreateViewer', (routeReq, routeRes) => {
  console.log("getOrCreate Called")
  findOrCreateViewer(routeReq.userId, routeReq.query.name)
    .then(response => {
      console.log(response)
      routeRes.json(response)
    })
    .catch(error => console.log(error))
});

router.get('/validate', (routeReq, routeRes) => {
  console.log("validate")
  routeRes.json({ 
    validated: "true",
    username: routeReq.username,
    id: routeReq.userId
   });
});


router.post('/updateViewer', (routeReq, routeRes) => {
  console.log("update called")
  const { name } = routeReq.query;
  const { body, userId } = routeReq;
  updateViewer(userId, name, body)
  .then((response) => routeRes.json({ statusCode: "200"}))
  .catch((e) => {
    logError(e);
    routeRes.sendStatus(542);
  })
})

function logError(err) {
  //TODO actual logger replacement
  console.log(err);
}

module.exports = router;
