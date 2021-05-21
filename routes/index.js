const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // eslint-disable-line
  res.render('index', { title: 'Reprieve of Sound' });
});

module.exports = router;
