var express = require('express');
var garageController = require('../garageController');
var router = express.Router();
var DAO = require('../houseDAO');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Time' });
});

router.get('/house', function(req, res, next){
	res.render('house', {initialStates: DAO.asyncGetStates} );
	
});

router.get('/garage', function (req, res, next){
    res.render('garage', {dist: garageController.dist, state : garageController.state});
});


module.exports = router;
