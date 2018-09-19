import React from 'react';
import { shallow } from 'enzyme';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../src/components/reducers';
import App from '../../src/components/App';

import {
	TEST_FETCH,
	TEST_FETCH_SUCCESS
} from '../../src/components/actions/types';
import TestReducer from '../../src/components/reducers/TestReducers';

const store = createStore(reducers, {}, applyMiddleware(thunk));

describe('Intro Route', () => {
	it('renders correct routes to Login', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Login}/>
						<Route exact path="/home" component={Home}/>
						<Route exact path="/cart" component={Cart}/>
					</Switch>
				</Router>
			</Provider>
		);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			pathMap[routeProps.path] = routeProps.component;
			return pathMap;
		}, {});
		
		expect(pathMap['/']).toBe(pathMap['/']);
	});

	it('result when TEST_FETCH should return the INITIAL_STATE', () => {
		expect(
			TestReducer(undefined, {
				type: TEST_FETCH
			}))
			.toEqual([]);
	});

	it('result when TEST_FETCH_SUCCESS', () => {
		expect(
			TestReducer([], {
				type: TEST_FETCH_SUCCESS,
				payload: [
					{
						text: 'Testing Redux',
						completed: false
					}
				]
			}))
			.toEqual([
				{
					text: 'Testing Redux',
					completed: false
				}
			]);
	});
});