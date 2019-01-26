const user = require('../src/controllers/user'),
      path = require('path'),
      router = require('express').Router();

module.exports = function(app) {

	/* rotas:
    get home (/)
    get register
    post register
    get feed
    get profile
    *post image
    delete user
    get logout
  */

  //rootPATH = { root: path.join(__dirname, 'public') }
  const rootPATH = { root: path.join(__dirname, '../public') }

	app.get('/', function(req, res) {
		res.sendFile("index.html", rootPATH)
	})

  app.post('/', function(req, res) {
    res.sendFile("feed.html", rootPATH)
  })

  app.get('/feed', function(req, res) {
    res.sendFile("feed.html", rootPATH)
  })

	app.get('/register', function(req, res) {
		res.sendFile("register.html", rootPATH)
	})

	app.post('/register', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + password);
    res.redirect("../public/index.html")
	})

} 