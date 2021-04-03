import logo from '../logo.svg';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recipeSearch, selectSearchResults } from '../apiSlice';

export function AppContainer() {
	const searchResults = useSelector(selectSearchResults);
	const [userInput, setUserInput] = useState('chicken');
	const dispatch = useDispatch();

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
			<p>Enter some text</p>
			<input
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
			/>
			<button onClick={() => dispatch(recipeSearch(userInput))}>
				Submit
			</button>
			<p style={{ paddingBottom: '100px' }}>
				{JSON.stringify(searchResults)}
			</p>
		</div>
	);
}
