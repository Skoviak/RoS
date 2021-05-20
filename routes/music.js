const express = require('express');
const router = express.Router();

/* GET music listing. */
router.get('/', function(req, res, next) {
  res.send('Display a list of genres here eventually.');
});

/* GET metal page. */
router.get('/metal', function(req, res, next) {
  var db = req.db; //db variable which is defined in app.js
  var collection = db.get('albums');
  collection.find({},{},function(e,docs){
      res.render('metal', { 
        "albums" : docs, 
        title: 'Metal' 
    });
  });
});

/* GET New Album page. */
router.get('/newalbum', function(req, res) {
  res.render('newalbum', { title: 'Add New Album' });
});

/* POST album. */
router.post('/insertalbum', function(req, res){
  var db = req.db;
  var collection = db.get('albums');

  var album_title = req.body.album_title;
  var album_release_year = req.body.album_release_year;

  // Submit to the DB
  collection.insert({
      "title" : album_title,
      "release_year" : album_release_year
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("metal");
      }
  });
});

module.exports = router;
