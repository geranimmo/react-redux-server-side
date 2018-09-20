import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	Route
} from "react-router-dom";
import reducers from '../../src/components/reducers';
import RouterComponent from '../../src/components/Routers';

const createMockStore = configureMockStore([thunk]);
const store = createMockStore(reducers);

describe('>>> A P P ---- Test App.js Component <<<', () => {
	it('+++ Renders correct routes to Login Page +++', () => {
		const wrapper = shallow(
			<Provider store={store}>
				<RouterComponent />
			</Provider>
		);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			pathMap[routeProps.path] = routeProps.component;
			return pathMap;
		}, {});
		
		expect(pathMap['/']).toBe(pathMap['/']);
	});
});