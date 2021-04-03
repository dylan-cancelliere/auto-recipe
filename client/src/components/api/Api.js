import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recipeSearch, selectApiDataFromBackend } from './apiSlice';

export function Api() {
	const dataFromBackend = useSelector(selectApiDataFromBackend);
	const [userInput, setUserInput] = useState('chicken');
	const dispatch = useDispatch();

	return (
		<div style={{ paddingBottom: '100px' }}>
			<p>Enter some text</p>
			<input
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
			/>
			<button onClick={() => dispatch(recipeSearch(userInput))}>
				Submit
			</button>
			<p style={{ paddingBottom: '100px' }}>{dataFromBackend}</p>
		</div>
	);
}
