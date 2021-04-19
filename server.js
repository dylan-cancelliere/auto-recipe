const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

const getIngredients = () => {
	let result, data;
	try {
		data = fs.readFileSync(
			'/home/ripto/auto-recipe/tasty_ingredients.txt',
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

const getIngredientJson = () => {
	return JSON.parse(fs.readFileSync(RECIPES_FILE_NAME));
};

const buildRecipeMap = (data) => {
	const database = {};
	const recipes = {};

	Object.keys(data).forEach((ingredient) => {
		database[ingredient] = new Set();
		data[ingredient].forEach((recipe) => {
			if (!recipe['name'] in recipes) recipes[recipe['name']] = recipe;
			database[ingredient].add(recipe['name']);
		});
	});
	return [database, recipes];
};

const buildRecipeArray = (pantryData) => {
	// data is list of ingredients in pantry
	let recipes = [];
	pantryData.forEach((ingredient) => {
		recipes.concat(Array.from(recipeMap[ingredient]));
	});
	return recipes;
};

const sortRecipesByFrequency = (recipeArray) => {
	let frequency = {};

	recipeArray.forEach((recipe) => {
		frequency[value] = 0;
	});

	let uniques = recipeArray.filter((recipe) => {
		return ++frequency[recipe] == 1;
	});

	return uniques.sort((a, b) => {
		return frequency[b] - frequency[a];
	});
};

const getPantryRecipes = (pantryData) => {
	const recipeArray = buildRecipeArray(pantryData);
	const recipes = sortRecipesByFrequency(recipeArray);
	return;
};

const RECIPES_FILE_NAME = 'tasty_recipes_json.txt';

const ingredientJson = getIngredientJson();
const ingredients = getIngredients();
const recipeMap,
	recipes = buildRecipeMap(ingredientJson);
const pantry = {};

app.use(express.json());

app.put('/pantry', (req, res) => {
	pantry[req.body.user] = req.body.pantry;
	res.sendStatus(200);
});

app.get('/pantry', (req, res) => {});

app.get('/search/:query', (req, res) => {});

app.listen(port, () => console.log(`Listening on port ${port}`));

// const EDAMAM_API = require('./secrets').EDAMAM_API;
// const EDAMAM_ID = require('./secrets').EDAMAM_ID;
// const BASE_URL = 'api.edamam.com';

// const parseSearchResults = (results) => {
// 	console.log('init:', results);
// 	let data = results['hits'];
// 	let parsedData = {};
// 	console.log('step 1:', data);

// 	for (let i = 0; i < 10; i++) {
// 		let recipe = data[i]['recipe'];
// 		parsedData[recipe['label']] = {
// 			ingredients: recipe['ingredientLines'],
// 			cookTime: recipe['totalTime'],
// 			mealType: recipe['mealType'],
// 			link: recipe['url'],
// 		};
// 	}

// 	return parsedData;
// };

// app.get('/search/:query', async (request, response) => {
// 	const options = {
// 		host: BASE_URL,
// 		path: `/search?q=${encodeURIComponent(
// 			request.params.query
// 		)}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_API}`,
// 		method: 'GET',
// 		headers: { 'content-type': 'application/json' },
// 	};

// 	const req = https.request(options, (res) => {
// 		console.log('statusCode:', res.statusCode);
// 		console.log('headers:', res.headers);

// 		let data = [];

// 		res.on('data', (chunk) => {
// 			data.push(chunk);
// 		}).on('end', () => {
// 			let result = JSON.parse(Buffer.concat(data));
// 			response.send(parseSearchResults(result));
// 		});
// 	});

// 	req.on('error', (e) => {
// 		console.error('Error:', e);
// 	});

// 	req.end();
// });
