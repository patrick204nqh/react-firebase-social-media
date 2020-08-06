const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("hello, world");
});

exports.getScreams = functions.https.onRequest((req, res) => {
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

exports.createScream = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }
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