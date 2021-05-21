const express = require('express');

const router = express.Router();

/* GET music listing. */
router.get('/', (req, res, next) => { // eslint-disable-line
  res.send('Display a list of genres here eventually.');
});

/* GET metal page. */
router.get('/metal', (req, res, next) => { // eslint-disable-line
  const { db } = req; // db variable which is defined in app.js
  const collection = db.get('albums');
  collection.find({}, {}, (e, docs) => {
    res.render('metal', {
      albums: docs,
      title: 'Metal',
    });
  });
});

/* GET New Album page. */
router.get('/newalbum', (req, res) => {
  res.render('newalbum', { title: 'Add New Album' });
});

/* POST album. */
router.post('/insertalbum', (req, res) => {
  const { db } = req;
  const collection = db.get('albums');

  const { album_title } = req.body;
  const { album_release_year } = req.body;

  // Submit to the DB
  collection.insert({
    title: album_title,
    release_year: album_release_year,
  }, (err) => {
    if (err) {
      // If it failed, return error
      res.send('There was a problem adding the information to the database.');
    } else {
      // And forward to success page
      res.redirect('metal');
    }
  });
});

module.exports = router;