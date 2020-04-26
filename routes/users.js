const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
var eventsData = require('../com/rsvp/data/events')



router.post('/', async (req, res) => {
    let usersResponse = req.body;
    let username = usersResponse.username
    if (!username) {
      res.status(400).json({error: 'You must provide username'});
      return;
    }
    if (!usersResponse.email) {
      res.status(400).json({error: 'You must provide email'});
      return;
    }

    if (!usersResponse.password) {
      res.status(400).json({error: 'You must provide password'});
      return;
    }
  
    try {
      let eventList = await eventsData.getAll();
      const result = await usersData.addUsers(
        usersResponse['username'], usersResponse['email'], usersResponse['password'], 
        "2012388477", "07-13-1994"," 1 Castle Point Ter, Hoboken, NJ 07030"
      );
      res.render('home', {
        loggedInUser: result,
         eventList: eventList
        }
        );
    } catch (e) {
      res.status(400).render('signup', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });

  router.get('/logout', async (req, res) => {
    req.session.destroy();
    // res.status(200).json('user logged out')
    res.redirect('/')
  })
  router.post('/login', async (req, res) => {
    let usersResponse = req.body;
    if (!usersResponse.email) {
      res.status(400).json({error: 'You must provide email'});
      return;
    }

    if (!usersResponse.password) {
      res.status(400).json({error: 'You must provide password'});
      return;
    }
  
    try {
      // let eventList = await eventsData.getAll();
      //   const result = await usersData.checkLogin( usersResponse['email'], usersResponse['password']
      // );
      // console.log(result._id)
      // res.render('home', {
      //   data: result,
      //   eventList: eventList
      // });
        const result = await usersData.checkLogin( usersResponse['email'], usersResponse['password']);
      let eventList = await eventsData.getAll();
      console.log(`user logged in ${result.email}`)
      req.session.user = result
      // res.render('home', {data: result});
      //   res.render('home', {loggedInUser: result, eventList: eventList, isSearch: true})
      let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/'
      res.redirect(redirectTo)
    } catch (e) {
      console.log(e.message)
      res.status(400).render('login', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });
  router.post('/forgotPassword', async (req, res) => {
    let usersResponse = req.body;
    if (!usersResponse.email) {
      res.status(400).json({error: 'You must provide email'});
      return;
    }
  
    try {
        const result = await usersData.emailForgotPassword( usersResponse['email']);
      res.render('forgotPassword', {
        data: result,
        isSuccess: true,
      });
    } catch (e) {
      res.status(400).render('forgotPassword', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });
  router.post('/resetPassword', async (req, res) => {
    let usersRequest = req.query;
    console.log(usersRequest.id);
    let usersResponse = req.body;
    if (!usersRequest.id) {
      res.status(400).json({error: 'You must provide id'});
      return;
    }
  
    try {
        const result = await usersData.updatePassword(usersRequest.id, usersResponse['password']);
      res.render('login');
    } catch (e) {
      res.status(400).render('changePassword', {
        error: e,
        hasErrors: true,
      });
      //res.sendStatus(400);

    }
  });

  module.exports = router;
