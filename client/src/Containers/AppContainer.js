import logo from '../logo.svg';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { setPantry, getPantry, selectPantryResults } from '../apiSlice';
import RecipeCard from '../Components/RecipeCard';

const renderRecipes = (data) => {
	let components = [];
	let keys = Object.keys(data);
	if (keys.length === 0)
		return <p>No recipes found, try different ingredients</p>;
	let recipe;
	for (let i = 0; i < 10; i++) {
		recipe = data[keys[i]];
		components.push(
			<RecipeCard
				image={recipe.thumbnail_url}
				title={recipe.name}
				link={`https://tasty.co/recipe/${recipe.object_name}`}
				time={recipe.cook_time_minutes}
				key={recipe.object_name}
			/>
		);
	}

	return <>{components}</>;
};

let renderRecipesBool = false;
const showRenderedRecipes = (flag) => {
	renderRecipesBool = flag;
};

export function AppContainer(user) {
	const pantryResults = useSelector(selectPantryResults);
	const [userInput, setUserInput] = useState(
		'chocolate, butter, sugar, eggs, vanilla-extract, flour, cocoa-powder, salt'
	);
	const dispatch = useDispatch();

	const parseUserInput = (data) => {
		data.replace(' ', '');
		return data.toLowerCase().split(',');
	};

	return (
		<div style={{ paddingBottom: '100px' }} className='App'>
			<header className='App-header'>
				<img
					src={logo}
					className='App-logo'
					alt='logo'
					style={{ maxWidth: '50%' }}
				/>
			</header>
			<form className='pantryForm' noValidate autoComplete='off'>
				<h2>Add ingredients to pantry</h2>
				<TextField
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					label='Type here...'
					color='secondary'
				/>
				<br />
				<Button
					variant='contained'
					color='default'
					size='small'
					onClick={() =>
						dispatch(
							setPantry({
								user: user.user,
								pantry: parseUserInput(userInput),
							})
						)
					}>
					Submit
				</Button>
			</form>
			<br />
			<Button
				onClick={() => {
					showRenderedRecipes(false);
					dispatch(getPantry(user.user));
					showRenderedRecipes(true);
				}}
				variant='contained'
				color='default'
				size='small'>
				Get recipes
			</Button>
			<br />
			<br />
			{renderRecipesBool && renderRecipes(pantryResults)}
		</div>
	);
}
