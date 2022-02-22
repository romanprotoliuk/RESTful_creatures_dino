const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fs = require('fs');

const app = express();

// middleware
// tell express to use ejs as the view engine
app.set('view engine', 'ejs');
// Enable EJS layouts middleware
app.use(ejsLayouts);

app.use('/prehistoric_creatures', require('./controllers/creatureController'));

// body-parser middleware
// this tells express how to form incoming data, will allow req.body
app.use(express.urlencoded({ extended: false }));

// ROUTES
// home
app.get('/', (req, res) => {
	res.send('Hello Dinos');
});

// index ie list all dinasours
app.get('/dinosaurs', (req, res) => {
	// read in the array from the dinosaurs.json
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	// need to parse dina
	let dinoData = JSON.parse(dinosaurs);
	res.render('index.ejs', { myDinos: dinoData });
});

app.get('/prehistoric_creatures', (req, res) => {
	// read in the array from the dinosaurs.json
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	// need to parse dina
	let creatureData = JSON.parse(creatures);
	res.render('indexCreatures.ejs', { myCreature: creatureData });
});

// new route (renders the new dino form)
app.get('/dinosaurs/new', (req, res) => {
	res.render('new.ejs');
});

app.get('/prehistoric_creatures/new', (req, res) => {
	res.render('newCreatures.ejs');
});

// show ie show all info about a single dino
// : indicates that the followingis a url params
app.get('/dinosaurs/:idx', (req, res) => {
	// read in the dinos from the db
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);

	let dinoIndex = req.params.idx;
	let targetDino = dinoData[dinoIndex];
	res.render('show.ejs', { dino: targetDino });
});

app.get('/prehistoric_creatures/:idx', (req, res) => {
	// read in the dinos from the db
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	let creatureIndex = req.params.idx;
	let targetCreature = creatureData[creatureIndex];
	res.render('showCreature.ejs', { creature: targetCreature });
});

app.post('/dinosaurs', (req, res) => {
	// read in our dino data from the json file
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);
	dinoData.push(req.body);
	// save the dinosaurs to the json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	console.log(req.body);

	// res.redirect takes the url pattern for the get route that you want to run next
	res.redirect('/dinosaurs');
});

app.post('/prehistoric_creatures', (req, res) => {
	// read in our dino data from the json file
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);
	creatureData.push(req.body);
	// save the dinosaurs to the json file
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
	console.log(req.body);

	// res.redirect takes the url pattern for the get route that you want to run next
	res.redirect('/prehistoric_creatures');
});

app.listen(7000, () => {
	console.log('DINO CRUD TIME');
});
