import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { AppContainer } from './Containers/AppContainer';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
