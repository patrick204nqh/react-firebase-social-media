const functions = require('firebase-functions');
const app = require('express')();

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');
const FBAuth = require('./util/fbAuth');

// screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.https.onRequest(app);
