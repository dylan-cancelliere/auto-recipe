import logo from '../logo.svg';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPantry, getPantry, selectPantryResults } from '../apiSlice';

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
			<p>Add ingredients to pantry</p>
			<input
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
			/>
			<button
				onClick={() =>
					dispatch(
						setPantry({
							user: user.user,
							pantry: parseUserInput(userInput),
						})
					)
				}>
				Submit
			</button>
			<br /> <br /> <br /> <br />
			<button onClick={() => dispatch(getPantry(user.user))}>
				Get recipes
			</button>
			<p style={{ paddingBottom: '100px' }}>
				{JSON.stringify(pantryResults)}
			</p>
		</div>
	);
}
