const express = require('express');

const router = express.Router();
const User = require('../../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => { // eslint-disable-line
  res.send('respond with a resource');
});

router.get('/list', (req, res, next) => { // eslint-disable-line
  User.find((err, users) => {
    if (err) {
      return res.send(err);
    }
    return res.json(users);
  });
});

module.exports = router;
