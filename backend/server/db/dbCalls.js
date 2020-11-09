const config = require('../config/config');
const { getDbUserCollection } = require('../db/db')
const uuidAPIKey = require('uuid-apikey');

//TODO this is doing too much, should only be a db call
function loginOrCreateUser(userObject) {
  const { uuid, apiKey } = uuidAPIKey.create();
  return new Promise((resolve, reject) => {
    getDbUserCollection().updateOne(userObject, { $set: { uuid } }, { upsert: true })
    .then(() => resolve(apiKey))
    .catch(error => reject(error))
  })
}

//TODO This is doing too much. Probably should wrap uuid class with something
function validateApikey(apikey) {
  return new Promise((resolve, reject) => {
    if(uuidAPIKey.isAPIKey(apikey)) {
      let uuid = uuidAPIKey.toUUID(apikey);
      getDbUserCollection().findOne({ uuid })
        .then(response => {
          const { username, id } = response;
          resolve({ username, id })
        })
        .catch(error => reject(error))
    } else {
      reject("bad apikey")
    }
  })
}

function findOrCreateViewer(userId, viewername) {
  return new Promise((resolve, reject) => {
    getDbUserCollection().findOne({ id: userId })
    .then(response => {
      const { viewers } = response;
      if(viewers !== undefined) {
        const viewer = viewers.find(viewer => viewer.name === viewername);
        if(viewer !== undefined) {
          resolve(viewer)
        } else {
          const newViewer = { 
            name: viewername, 
            inputs: ['', '', ''] 
          }
          const newViewerArray = [...viewers, newViewer]
          updateViewerArray(userId, newViewerArray)
          resolve(newViewer);
        }
      } else {
        const newViewer = { 
          name: viewername, 
          inputs: ['', '', ''] 
        }
        createViewerArray(userId, newViewer)
        resolve(newViewer);
      }
    })
  })
}

function updateViewer(userId, viewername, viewerInfo) {
  return new Promise((resolve, reject) => {
    getDbUserCollection().findOne({ id: userId })
    .then(response => {
      const { viewers } = response;
      viewers.find((viewer, index) => {
        if(viewer.name === viewername) {
          viewers[index].inputs = viewerInfo.inputs
          updateViewerArray(userId, viewers)
          resolve();
          return true;
        }
      })
    })
  })
}

function updateViewerArray(userId, viewerArray) {
    getDbUserCollection().updateOne({ id: userId}, { $set: { viewers: viewerArray }})
    .catch(error => console.log(error))
}

function createViewerArray(userId, viewer) {
    getDbUserCollection().updateOne({ id: userId }, { $set : { viewers: [viewer] }})
    .catch(error => console.log(error))
}



module.exports = { loginOrCreateUser, validateApikey, findOrCreateViewer, updateViewer }