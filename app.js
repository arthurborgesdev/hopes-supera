require('dotenv').config()
const express = require('express'),
      app = express(),
      port = process.env.PORT,
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose');
      
// substitui pelo link do mLAB no heroku em produção
/* Essa parte ficará desabilitada em produção por enquanto
até o banco ser setado.
if (process.env.NODE_ENV === "development") {
	mongoose.connect('mongodb://localhost/hopes', { useNewUrlParser: true })
} else if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) 
}

//Users = require('./src/models/Users')

// Schema declaration
var userSchema = new mongoose.Schema({
	username: String,
	password: String
})

// Compilation of schema into Model
var User = mongoose.model('User', userSchema);
*/

// MongoDB using the oficial driver

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'hopes';

const client = new MongoClient(url);
let db;
client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	db = client.db(dbName);
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
//app.use('/public', express.static(path.join(__dirname, 'public')));

/* rotas:
    get index (/)
    post index (/)
    get register
    post register
    get feed
    get profile
    publish image
    delete user
  */

//rootPATH = { root: path.join(__dirname, 'public') }
const rootPATH = { root: path.join(__dirname, './public') }

app.get('/', function(req, res) {
	res.sendFile("index.html", rootPATH)
})

app.post('/', function(req, res) {
  
  let input = {
    username: req.body.username,
    password: req.body.password
  }
  console.log(input);

  const verifyUser = function(db, callback) {
  	const collection = db.collection('users');
  	console.log(input)
  	collection.findOne({ 
  		username: input.username,
  		password: input.password
  	}, function(err, result) {
  		console.log(result);
  		callback(result);
  	})
  }

  verifyUser(db, function(result) {
    if (result) {
    	res.sendFile("feed.html", rootPATH)
    } else {
    	res.sendFile("index.html", rootPATH)
    }
  	//client.close();
  });

  
})

app.get('/register', function(req, res) {
	res.sendFile("register.html", rootPATH)
})

// Estou aqui
app.post('/register', function(req, res) {

  let input = {
    username: req.body.username,
    password: req.body.password
  }

  const insertUser = function(db, callback) {
  	const collection = db.collection('users');
  	collection.insertOne({
  		username: input.username,
  		password: input.password
  	}, function(err, result) {
  		console.log(result);
  		callback(result);
  	})
  }

  insertUser(db, function() {

  	res.sendFile("index.html", rootPATH)
  	//client.close();
  });
  
  /* Essa parte não está funcionando - 
  "Cannot read property 'save' of null"
  User.findOne({}, function(err, user) {
  	if (err) {
  		console.log(error);
  		res.send("ERROR!!")
  		return;
  	} else if(user !== null) {
      res.sendFile("index.html", rootPATH)
      return;
    } else {
    	user.save(function(err) {
    	  res.sendFile("register.html", rootPATH);
        return;
    	})
    }
  });
  */
  
})

app.get('/feed', function(req, res) {
  res.sendFile("feed.html", rootPATH)
})

app.get('/profile', function(req, res) {
  res.sendFile("profile.html", rootPATH)
})

app.get('/publish', function(req, res) {
  res.sendFile("publish.html", rootPATH)
})

app.post('/publish', function(req, res) {
  // logica para receber a imagem e salvar no banco de dados

  res.sendFile("feed.html", rootPATH)
})

app.delete('/user', function(req, res) {
  // logica para excluir o usuario do banco
  res.sendFile("index.html", rootPATH)
})

app.listen(port, () =>
console.log(`Server started on port ${port}`));