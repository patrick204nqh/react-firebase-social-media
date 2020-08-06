const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/screams', (req, res) => {
  admin.firestore().collection('screams').get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push(doc.data());
      });
      return res.json(screams);
    })
    .catch(err => console.log(err));
})

app.post('/scream', (req, res) => {
  const newScream = {
    name: req.body.name,
    do: req.body.do,
    createAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  admin.firestore()
    .collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} create successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: `something went wrong` });
      console.log(err);
    })
})

// https://baseurl.com/api/

exports.api = functions.https.onRequest(app);