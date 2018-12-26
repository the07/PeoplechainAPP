var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log("Session " + req.sessionID);
  res.send('Welcome to PeopleChain, PCN');
});

module.exports = router;
