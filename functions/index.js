const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyAmrGi-vGSoYU4AJiImy6uIzTIt9gGGzgQ",
  authDomain: "social-media-9aa90.firebaseapp.com",
  databaseURL: "https://social-media-9aa90.firebaseio.com",
  projectId: "social-media-9aa90",
  storageBucket: "social-media-9aa90.appspot.com",
  messagingSenderId: "503353149603",
  appId: "1:503353149603:web:f51ff43f50b9f89a5d1716",
  measurementId: "G-43GTRCH2TB"
};

admin.initializeApp();
firebase.initializeApp(firebaseConfig);
const db = admin.firestore();

app.get('/screams', (req, res) => {
  db
    .collection('screams')
    .orderBy('createAt', 'desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          userHandle: doc.data().userHandle,
          body: doc.data().body,
          ...doc.data()
        });
      });
      return res.json(screams);
    })
    .catch(err => console.log(err));
})

app.post('/scream', (req, res) => {
  const newScream = {
    userHandle: req.body.userHandle,
    body: req.body.body,
    createAt: new Date().toISOString()
  }

  db
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

// Signup route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  // TODO: validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({
          handle: 'this handle is already taken'
        })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      console.log(data);
      userId = data.user.uid;
      return data.user.getIdToken()
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' })
      } else {
        return res.status(500).json({ error: err.code })
      }
    })
})

exports.api = functions.https.onRequest(app);
