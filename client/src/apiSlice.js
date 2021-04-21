import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://autorecipe.csh.rit.edu:5000';

export const recipeSearch = createAsyncThunk(
	'api/searchRecipes',
	async (queryText, thunkAPI) => {
		const url = `${BASE_URL}/search/${queryText}`;

		let response = await fetch(url, {
			method: 'GET',
			headers: { Origin: 'localhost:3000/' },
		}).catch((error) => {
			console.error('Error:', error);
		});

		response = await response.json();
		return response;
	}
);

export const setPantry = createAsyncThunk(
	'api/setPantry',
	async (pantry, thunkAPI) => {
		const url = `${BASE_URL}/pantry/${encodeURIComponent(
			pantry.user
		)}/${encodeURIComponent(pantry.pantry)}`;
		let response = await fetch(url, {
			method: 'PUT',
			headers: {},
		}).catch((error) => {
			console.error('Error:', error);
		});

		response = await response.json();
		return response;
	}
);

export const getPantry = createAsyncThunk(
	'api/getPantry',
	async (user, thunkAPI) => {
		const url = `${BASE_URL}/pantry/${user}`;
		let response = await fetch(url, {
			method: 'GET',
			headers: {},
		}).catch((error) => {
			console.error('Error:', error);
		});

		response = await response.json();
		return response;
	}
);

export const apiSlice = createSlice({
	name: 'api',
	initialState: {
		searchResults: {},
		pantryResults: {},
	},
	reducers: {},
	extraReducers: {
		[recipeSearch.fulfilled]: (state, action) => {
			state.searchResults = action.payload;
		},
		[getPantry.fulfilled]: (state, action) => {
			state.pantryResults = action.payload;
		},
	},
});

export const selectSearchResults = (state) => state.api.searchResults;
export const selectPantryResults = (state) => state.api.pantryResults;

export default apiSlice.reducer;
