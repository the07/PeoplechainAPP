var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
    res.send('Respond with resource');
});

module.exports = router;