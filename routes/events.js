var express = require('express');
var eventData = require('../com/rsvp/data/events')
var router = express.Router();

/* new event page */
router.get('/new', function(req, res, next) {
  res.render('event_new', {user: 'naman'})
  // res.send('all events in system');
});


/* get all events */
router.get('/', function(req, res, next) {
  res.send('all events in system');
});

/* get event with id */
router.get('/:id', async function(req, res, next) {
  console.log(`get event [${req.params.id}]`)
  const event = await eventData.getEvent(req.params.id)
  res.json(event);
});

/* create event */
router.post('/create', async function(req, res, next) {
  console.log(`inside create event form: ${req.body.organizer}`)
  let eventJson = {
    organizer: req.body.organizer,
    title: req.body.title,
    desc: req.body.desc,
    eventDate: req.body.eventDate,
    category: req.body.category,
    capacity: req.body.capacity,
    isPaid: req.body.isPaid,
    cost: req.body.cost,
    address: req.body.address
  }
  let event = await eventData.createEvent(eventJson)
  // let event = eventJson
  res.json(event);
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
