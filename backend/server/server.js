const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const { initDb, getDbUserCollection } = require('./db/db.js');

const config = require('./config/config.js');
const port = config.port;

const api = require('./routes/api');
const user = require('./routes/user');
const db = require('./db/db.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cookieSession({ secret: config.secret }));
app.use(cors());
app.use('/user', user)
app.use('/api', api);

initDb((err) => {
  app.listen(port, () => {
    getDbUserCollection().createIndex({ email: 1, username: 1 }, { unique: true });
    console.log(`server running on ${port}`);
    if(err) throw err;
  });
  
});
