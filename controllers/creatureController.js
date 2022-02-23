const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
	// read in the array from the dinosaurs.json
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	// need to parse dina
	let creatureData = JSON.parse(creatures);
	res.render('indexCreatures.ejs', { myCreature: creatureData });
});

router.get('/new', (req, res) => {
	res.render('newCreatures.ejs');
});

// read in the dinos from the db
router.get('/:idx', (req, res) => {
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	let creatureIndex = req.params.idx;
	let targetCreature = creatureData[creatureIndex];
	res.render('showCreature.ejs', { creature: targetCreature });
});

router.post('/', (req, res) => {
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

module.exports = router;
