const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

const EDAMAM_API = require('./secrets').EDAMAM_API;
const EDAMAM_ID = require('./secrets').EDAMAM_ID;
const BASE_URL = 'api.edamam.com';

const getIngredients = () => {
	let result, data;
	try {
		data = fs.readFileSync(
			'/home/ripto/auto-recipe/ingredients.txt',
			'utf8'
		);
	} catch (error) {
		console.error(error);
		return;
	}
	result = new Set(
		data
			.substring(1, data.length - 1)
			.replace(/'/g, '')
			.split(', ')
	);
	return result;
};

const parseSearchResults = (results) => {
	console.log('init:', results);
	let data = results['hits'];
	let parsedData = {};
	console.log('step 1:', data);

	for (let i = 0; i < 10; i++) {
		let recipe = data[i]['recipe'];
		parsedData[recipe['label']] = {
			ingredients: recipe['ingredientLines'],
			cookTime: recipe['totalTime'],
			mealType: recipe['mealType'],
			link: recipe['url'],
		};
	}

	return parsedData;
};

const ingredients = getIngredients();

app.use(express.json());

app.get('/search/:query', async (request, response) => {
	const options = {
		host: BASE_URL,
		path: `/search?q=${encodeURIComponent(
			request.params.query
		)}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_API}`,
		method: 'GET',
		headers: { 'content-type': 'application/json' },
	};

	const req = https.request(options, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);

		let data = [];

		res.on('data', (chunk) => {
			data.push(chunk);
		}).on('end', () => {
			let result = JSON.parse(Buffer.concat(data));
			response.send(parseSearchResults(result));
		});
	});

	req.on('error', (e) => {
		console.error('Error:', e);
	});

	req.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
