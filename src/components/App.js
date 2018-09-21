import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './Routers';

export class App extends Component {
	render() {
		const store = createStore(reducers, {}, applyMiddleware(thunk));

		return (
			<Provider store={store}>
				<RouterComponent />
			</Provider>
		);
	}
}

export default App;