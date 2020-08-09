const { db } = require('../util/admin');

exports.getAllScreams = (req, res) => {
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
}

exports.postOneScream = (req, res) => {
  const newScream = {
    userHandle: req.user.handle,
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
}