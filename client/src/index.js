import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { AppContainer } from './Containers/AppContainer';

const getCookie = (cname) => {
	const name = cname + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1);
		if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
	}
	return '';
};

const setCookie = (cname, value, days) => {
	const d = new Date();
	d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + value + ';' + expires + ';path=/';
};

const handleNoCookies = () => {
	if (getCookie('user') === '')
		setCookie('user', Math.floor(Math.random() * 1000000), 30);
};

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{handleNoCookies()}
			<AppContainer user={getCookie('user')} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
