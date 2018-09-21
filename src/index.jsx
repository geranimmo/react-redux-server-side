import 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style';

if (process.env.NODE_ENV==='production') {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js')
				.then(() => {
					console.log('SW registered successfully');
				})
				.catch((error) => {
					console.error('Could not register service worker', error);
				});
		});
	}
}

ReactDOM.render(<App />, document.getElementById('app'));