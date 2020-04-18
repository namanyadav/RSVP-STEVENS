var express = require('express');
var userData = require('../com/rsvp/data/users')
var router = express.Router();

/* get all users */
router.get('/', function(req, res, next) {
  res.send('all users in system');
});

/* get user with id */
router.get('/:id', async function(req, res, next) {
  const user = await userData.getUser(req.params.id)
  res.json(user)
});

/* create user */
router.post('/create', async function(req, res, next) {
  //if request valid, can use a middleware
  // let email = req.body.email;
  // let password = req.body.password;
  // let fname = req.body.fname;
  // let lname = req.body.lname;
  // let dob = req.body.dob;
  // let gender = req.body.gender;
  console.log(`requs data: ${req.body.email}`)
  let userJson = {
    email: req.body.email,
    password: req.body.password,
    fname: req.body.fname,
    lname: req.body.lname,
    dob: req.body.dob,
    gender: req.body.gender
  }
  await userData.addUser(userJson)
  res.send('new user created');
});

/* update user */
router.post('/:id/update', function(req, res, next) {
  res.send(`user updated with id [${req.params.id}]`);
});

/* delete user */
router.post('/:id/delete', function(req, res, next) {
  res.send(`user deleted with id [${req.params.id}]`);
});

module.exports = router;
