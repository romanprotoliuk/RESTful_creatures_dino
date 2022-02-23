const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');
const methodOverride = require('method-override');

const app = express();

// middleware
// tell express to use ejs as the view engine
app.set('view engine', 'ejs');
// Enable EJS layouts middleware
app.use(ejsLayouts);

// Method override
app.use(methodOverride('_method'));

// body-parser middleware
// this tells express how to form incoming data, will allow req.body
app.use(express.urlencoded({ extended: false }));

// Controllers
app.use('/prehistoric_creatures', require('./controllers/creatureController'));
app.use('/dinosaurs', require('./controllers/dinoController'));

// ROUTES
// home
app.get('/', (req, res) => {
	res.send('Hello Dinos');
});

app.listen(7000, () => {
	console.log('DINO CRUD TIME');
});
