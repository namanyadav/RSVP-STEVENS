const users = require('./users');
const events = require('./events');
const eventsData = require('../com/rsvp/data/events');
const path = require('path');
const usersData = require('../data/users');

const constructorMethod = (app) => {
	app.use('/users', users);
	app.use('/events', events);
	app.get('/changePassword', (req, res) => {
		res.render('changePassword', 
		{
			userID: req.query.id
		  });
	});
	app.get('/signup', (req, res) => {
		res.render('signup');
	});
	app.get('/forgotPassword', (req, res) => {
		res.render('forgotPassword');
	});
	app.get('/login', (req, res) => {
		res.render('login');
	});
	app.get('/home', async (req, res) => {
		let eventList = await eventsData.getAll();
		const userData = await usersData.getUser(req.query.userId)
		// let catEventList = await eventsData.getEventsOfCategory(eventsData.cats.music);
		// let foodEventList = await eventsData.getEventsOfCategory(eventsData.cats.foodndrinks);
		// let artsEventList = await eventsData.getEventsOfCategory(eventsData.cats.artsnculture);
		// let sportsEventList = await eventsData.getEventsOfCategory(eventsData.cats.sportsnwellness);
		let catEventList = await eventsData.getEventsOfCategories([eventsData.cats.music, eventsData.cats.artsnculture]);
		res.render('home', {
			data: userData,
			 eventList: eventList
			}
			);
		// res.render('home', {eventList: eventList, catEventList: catEventList, foodEventList: foodEventList, artsEventList: artsEventList, sportsEventList: sportsEventList})
	});
	app.get('/search', async (req, res) => {
		let cats = req.query.cats;
		let catList = [];
		if(cats) {
			cats = cats.trim();
			cats = cats.replace('[','').replace(']','');
			catList = cats.split(',')
		}
		// console.log(catList);
		let eventList = await eventsData.getEventsOfCategories(catList);
		// console.log(eventList);
		// res.json(eventList);
		res.render('partials/home_event_panel', {eventList: eventList, isSearch:true})
	});

	app.get('/details', async (req, res) => {
		//console.log(req.body.title)
		try{
			const data = await eventsData.getEvent(req.query.id);
		res.render('details',{
			event: data,
			userId: req.query.userId
		  });
		}
		catch (e) {
			res.status(400).json({error: e});
		}
	});
	app.get('/details/ticket.pdf', async (req, res) => {
		console.log(req.query.id)
		try{
			const data = await eventsData.getEvent(req.query.id);
			const userData = await usersData.getUser(req.query.userId);
		res.render('ticket',{
			event: data,
			user: userData,
			isTicket:true
		  });
		}
		catch (e) {
			res.status(400).json({error: e});
		}
	});
	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	  });

};

module.exports = constructorMethod;