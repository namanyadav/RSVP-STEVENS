var express = require('express');
var eventData = require('../com/rsvp/data/events')
var router = express.Router();
const usersData = require('../data/users');
const middy = require('middy')
const middlewares = require('middy/middlewares')
const chromium = require('chrome-aws-lambda')

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

router.post('/ticket', async function(req, res) {
  console.log(req.query.id);
  const event = await eventData.getEvent(req.query.id);
  const userData = req.session ? req.session.user : undefined;
  console.log(userData.email)
  try {
    let eventList = await eventData.getAll();
    const handler = await eventData.generateTicket(req.query.id, userData._id).then(handler => {
      middy(handler)
      .use(middlewares.httpHeaderNormalizer())
      .use(middlewares.cors())
      .use(middlewares.doNotWaitForEmptyEventLoop())
      .use(middlewares.httpErrorHandler());
    });
    //res.send(handler);
    res.render('home', {
      loggedInUser: userData,
       eventList: eventList
      }
      );
  
  } catch (e) {
    console.log("error:"+e)
    res.status(400).render('details', {
      error: e,
      hasErrors: true,
      event: event,
			userId: userData._id
    });

  }
});

module.exports = router;
