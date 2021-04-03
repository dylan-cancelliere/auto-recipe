import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EDAMAM_API, EDAMAM_ID } from '../../secrets';

const BASE_URL = 'https://api.edamam.com/';

export const recipeSearch = createAsyncThunk(
	'api/fetchRecipes',
	async (queryText, thunkAPI) => {
		console.log('Reached thunk');
		const url = `${BASE_URL}/search?q=${encodeURIComponent(
			queryText
		)}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_API}`;
		console.log(`URL: ${url}`);
		let response = await fetch(url, {
			method: 'GET',
			headers: {
				'Accept-Encoding': 'gzip',
			},
		}).catch((err) => {
			console.log('API failed');
		});
		response = await response.json();
		console.log('End of thunk');
		return response.data;
	}
);

export const apiSlice = createSlice({
	name: 'api',
	initialState: {
		dataFromBackend: 'Nothing yet',
	},
	reducers: {},
	extraReducers: {
		[recipeSearch.fulfilled]: (state, action) => {
			console.log('Start of reducer');
			console.log(state);
			console.log(action.payload);
			console.log('End of reducer');
		},
	},
});

export const { sendData, getData } = apiSlice.actions;
export const selectApiDataFromBackend = (state) => state.api.dataFromBackend;

export default apiSlice.reducer;
