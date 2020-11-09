const assert = require('assert');
const client = require('mongodb').MongoClient;
const config = require('../config/config.js');

const url = config.mongoURL;

let _db;

function initDb(callback) {
  if (_db) {
    console.warn('Trying to init DB again!');
    return callback(null, _db);
  }

  client.connect(url, { useUnifiedTopology: true }, connected);

  function connected(err, db) {
    if (err) {
      return callback(err);
    }
    console.log('DB initialized  ' );
    _db = db.db(config.database);
    return callback(null, _db);
  }
}

function getDbUserCollection() {
  assert.ok(_db, 'Db has not been initialized. Please called init first.');
  return _db.collection(config.userCollection);
}

module.exports = {
  getDbUserCollection,
  initDb,
};
