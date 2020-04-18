var express = require('express');
var eventData = require('../com/rsvp/data/events')
var router = express.Router();

/* new event page */
router.get('/new', function(req, res, next) {
  res.render('multipart_form', {user: 'naman', layout: 'layouts/main'})
  // res.send('all events in system');
});

/* view user events */
router.get('/mine', function(req, res, next) {
  res.render('my_events', {user: 'naman'})
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
  let organizer = 'professor'
  let eventJson = {
    organizer: organizer,
    title: req.body.title,
    desc: req.body.desc,
    sDate: req.body.sDate,
    eDate: req.body.eDate,
    category: req.body.category,
    capacity: req.body.capacity,
    isPaid: req.body.pricing=='paid',
    cost: req.body.cost,
    stAddr: req.body.stAddr,
    state: req.body.state,
    country: req.body.country,
    pricing: req.body.pricing
  }
  let ej = eventJson;
  console.log(`inside create event form: [${req.body.organizer}, ${req.body.title}, ${req.body.desc}]`)
  console.log(`param: [${ej.category}, ${ej.sDate}, ${ej.eDate}, ${ej.title}, ${ej.capacity}, ${ej.stAddr}, ${ej.state},
    ${ej.country}, ${ej.desc}, ${ej.pricing}, ${ej.isPaid}]`)
  req.body.organizer = 'professor';
  let event = await eventData.createEvent(req.body)
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
