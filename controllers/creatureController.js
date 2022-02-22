const express = require('express');
const router = express.Router();

// router.get('/:id', (req, res) => {
// 	let imdbID = req.params.id;
// 	const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}`;
// 	axios.get(url).then((response) => {
// 		const searchResults = response.data;
// 		res.render('detail.ejs', { results: searchResults });
// 	});
// });

router.get('/:idx', (req, res) => {
	// read in the dinos from the db
	let creatures = fs.readFileSync('./prehistoric_creatures.json');
	let creatureData = JSON.parse(creatures);

	let creatureIndex = req.params.idx;
	let targetCreature = creatureData[creatureIndex];
	res.render('showCreature.ejs', { creature: targetCreature });
});

module.exports = router;
