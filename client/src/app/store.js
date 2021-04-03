import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../components/api/apiSlice';
import counterReducer from '../components/counter/counterSlice';

export default configureStore({
	reducer: {
		counter: counterReducer,
		api: apiReducer,
	},
});
