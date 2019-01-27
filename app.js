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

  res.sendFile("feed.html", rootPATH)
})

app.get('/register', function(req, res) {
	res.sendFile("register.html", rootPATH)
})

// Estou aqui
app.post('/register', function(req, res) {

  let input = {
    username: req.body.username,
  }
  
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
  res.sendFile("index.html", rootPATH)
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