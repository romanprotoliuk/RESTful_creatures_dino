const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
	// read in the array from the dinosaurs.json
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	// need to parse dina
	let creatureData = JSON.parse(creatures);

	// grabbing the quiried name from the url
	let nameFilter = req.query.nameFilter;
	console.log(creatureData);
	// if there IS a query
	if (nameFilter) {
		// fillter out all dinos who don't have the queried name
		creatureData = creatureData.filter((creature) => {
			return creature.type.toLowerCase() === nameFilter.toLowerCase();
		});
	}

	res.render('./creatures/indexCreatures.ejs', { myCreature: creatureData });
});

router.get('/new', (req, res) => {
	res.render('./creatures/newCreatures.ejs');
});

router.get('/edit/:idx', (req, res) => {
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	let creatureIndex = req.params.idx;
	let targetCreature = creatureData[creatureIndex];

	res.render('./creatures/editCreatures.ejs', { creature: targetCreature, creatureId: creatureIndex });
});

// read in the dinos from the db
router.get('/:idx', (req, res) => {
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	let creatureIndex = req.params.idx;
	let targetCreature = creatureData[creatureIndex];
	res.render('./creatures/showCreature.ejs', { creature: targetCreature });
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

router.put('/:idx', (req, res) => {
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	creatureData[req.params.idx].type = req.body.type;
	creatureData[req.params.idx].img_url = req.body.img_url;

	// write the updated array back to the json file
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));
	// obce the dinosaur has been
	res.redirect('/prehistoric_creatures');
});

router.delete('/:idx', (req, res) => {
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	// remove the delete
	creatureData.splice(req.params.idx, 1);
	// write the updated array back to the json file
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData));

	res.redirect('/prehistoric_creatures');
});

module.exports = router;
