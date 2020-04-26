var express = require('express');
var eventData = require('../com/rsvp/data/events')
var router = express.Router();
var cats = eventData.cats
/*
let event1 = { organizer: 'sergio', title: 'Heist of the royal mint of Spain', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'April 16, 2020 9:05 AM', desc: 'desf', capacity: 74, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event2 = { organizer: 'berlin', title: 'Printing money at the royal mint', category: cats.foodndrinks, isPaid: true, cost: 10, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'May 12, 2020 2:05 AM', desc: 'desf asdf', capacity: 10, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event3 = { organizer: 'denver', title: 'Stealing money from Bank of Spain', category: cats.artsnculture, isPaid: false, cost: 100, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'June 1, 2020 3:05 PM', desc: 'lorem ipsum', capacity: 100, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event4 = { organizer: 'salva', title: 'Plannig for the heist', category: cats.sportsnwellness, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'April 26, 2020 4:05 PM', desc: 'desf', capacity: 34, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event5 = { organizer: 'rio', title: 'Bogotta site training', category: cats.artsnculture, isPaid: true, cost: 30, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'April 22, 2020 5:05 AM', desc: 'desf', capacity: 734, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event6 = { organizer: 'sergio', title: 'Museum visit and planning', category: cats.sportsnwellness, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'April 21, 2020 6:05 PM', desc: 'desf', capacity: 746, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event7 = { organizer: 'sergio', title: 'Setup broadcast mechanism', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'May 10, 2020 9:50 AM', desc: 'desf', capacity: 7, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event8 = { organizer: 'tokyo', title: 'Setup supply chain', category: cats.sportsnwellness, isPaid: true, cost: 20, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'June 2, 2020 10:05 AM', desc: 'desf', capacity: 200, pricing: 'paid', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event9 = { organizer: 'sergio', title: 'Heist of the royal mint of Spain', category: cats.foodndrinks, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'June 3, 2020 9:05 AM', desc: 'desf', capacity: 30, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
let event10 = { organizer: 'salva', title: 'Heist of the royal mint of Spain', category: cats.music, isPaid: false, cost: 0, sDate: 'April 15, 2020 9:05 AM',
  eDate: 'May 6, 2020 11:05 PM', desc: 'desf', capacity: 24, pricing: 'free', stAddr: '123 Jack St', state: 'NJ', country: 'US'};
eventData.createEvent(event1);
eventData.createEvent(event2);
eventData.createEvent(event3);
eventData.createEvent(event4);
eventData.createEvent(event5);
eventData.createEvent(event6);
eventData.createEvent(event7);
eventData.createEvent(event8);
eventData.createEvent(event9);
eventData.createEvent(event10);*/

/* new event page */
router.get('/new', loggedIn, function(req, res, next) {
  let user = req.session.user;
  res.render('multipart_form', {layout: 'layouts/main', loggedInUser: user})
  // res.send('all events in system');
});

/* view user events */
router.get('/mine', loggedIn, async function(req, res, next) {
  let eventList = await eventData.getAll();
  let user = req.session.user;
  let page = req.query.pageName;
  res.render('my_events', {loggedInUser: user, layout: 'layouts/main', eventList: eventList, pageName: page})
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

function loggedIn(req, res, next) {
  if (req.session.user) {
    next();     //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    //  next(err);  //Error, trying to access unauthorized page!
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
  }
}
/* create event */
router.post('/create', loggedIn, async function(req, res, next) {
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
