var express = require('express');
var router = express.Router();

/* get all events */
router.get('/', function(req, res, next) {
  res.send('all events in system');
});

/* get event with id */
router.get('/:id', function(req, res, next) {
  res.send(`event with id [${req.params.id}]`);
});

/* create event */
router.post('/create', function(req, res, next) {
  res.send('new event created');
});

/* update event */
router.post('/:id/update', function(req, res, next) {
  res.send(`event updated with id [${req.params.id}]`);
});

/* delete event */
router.post('/:id/delete', function(req, res, next) {
  res.send(`event deleted with id [${req.params.id}]`);
});

module.exports = router;
