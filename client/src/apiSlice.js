import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:5000';

export const recipeSearch = createAsyncThunk(
	'api/fetchRecipes',
	async (queryText, thunkAPI) => {
		const url = `${BASE_URL}/search/${queryText}`;

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
	},
	reducers: {},
	extraReducers: {
		[recipeSearch.fulfilled]: (state, action) => {
			state.searchResults = action.payload;
		},
	},
});

export const selectSearchResults = (state) => state.api.searchResults;

export default apiSlice.reducer;
