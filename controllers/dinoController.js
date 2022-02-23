const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
	// read in the array from the dinosaurs.json
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	// need to parse dina
	let dinoData = JSON.parse(dinosaurs);

	// grabbing the quiried name from the url
	let nameFilter = req.query.nameFilter;
	// if there IS a query
	if (nameFilter) {
		// fillter out all dinos who don't have the queried name
		dinoData = dinoData.filter((dino) => {
			return dino.name.toLowerCase() === nameFilter.toLowerCase();
		});
	}
	res.render('./dinos/index.ejs', { myDinos: dinoData });
});

// new route (renders the new dino form)
router.get('/new', (req, res) => {
	res.render('./dinos/new.ejs');
});

router.get('/edit/:idx', (req, res) => {
	let dinos = fs.readFileSync('./dinosaurs.json');
	let dinosData = JSON.parse(dinos);

	let dinoIndex = req.params.idx;
	let targetDino = dinosData[dinoIndex];

	res.render('./dinos/edit.ejs', { dino: targetDino, dinoId: dinoIndex });
});

// show ie show all info about a single dino
// : indicates that the followingis a url params
router.get('/:idx', (req, res) => {
	// read in the dinos from the db
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);

	let dinoIndex = req.params.idx;
	let targetDino = dinoData[dinoIndex];
	res.render('./dinos/show.ejs', { dino: targetDino });
});

router.post('/', (req, res) => {
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

router.put('/:idx', (req, res) => {
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);

	dinoData[req.params.idx].name = req.body.name;
	dinoData[req.params.idx].type = req.body.type;

	// write the updated array back to the json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	// obce the dinosaur has been
	res.redirect('/dinosaurs');
});

router.delete('/:idx', (req, res) => {
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);

	// remove the delete
	dinoData.splice(req.params.idx, 1);
	// write the updated array back to the json file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	res.redirect('/dinosaurs');
});

module.exports = router;
