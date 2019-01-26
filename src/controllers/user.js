const UserModel = require('../models/user')
const User = require('../services/user')

exports.handleInput = function(req, res) {

  let input = {
    name: req.body.name,
	  email: req.body.email,
	  password: req.body.password
  }

	User.saveInput(input, function(err, data) {
	  if(err) {
	    res.render('register', { errorMessage: err, isHuman: true })
	  } else if (data === "same") {
	    res.render('register', { errorMessage: 'Usuário já cadastrado', isHuman: true });
	    return;
	  } else {
	    res.redirect('/');
	    return;
    }
	});
}