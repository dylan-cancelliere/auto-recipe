import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const recipeSearch = createAsyncThunk(
	'api/fetchRecipes',
	async (queryText, thunkAPI) => {
		// const url = `${BASE_URL}/search?q=${encodeURIComponent(
		// 	queryText
		// )}&app_id=${EDAMAM_ID}&app_key=${EDAMAM_API}`;
		// let response = await fetch(url, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Accept-Encoding': 'gzip',
		// 	},
		// }).catch((err) => {
		// 	console.log('API failed');
		// });
		// response = await response.json();
		// return response;
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

export const { sendData, getData } = apiSlice.actions;
export const selectApiDataFromBackend = (state) => state.api.dataFromBackend;

export default apiSlice.reducer;
