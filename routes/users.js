var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const defaultUser = {
        id: 0,
        name: 'Johny Bravo'
    };


    res.send(defaultUser);
});

module.exports = router;
