require('dotenv').config()
const express = require('express'),
      app = express(),
      port = process.env.PORT,
      path = require('path'),
      bodyParser = require('body-parser'),
      routes = require('./src/route')
      mongoose = require('mongoose');
      
// substitui pelo link do mLAB no heroku em produção
if (process.env.NODE_ENV === "development") {
	mongoose.connect('mongodb://127.0.0.1:27017/hopes', { useNewUrlParser: true })
} else if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) 
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(port, () =>
console.log(`Server started on port ${port}`));