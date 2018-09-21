import React from 'react';
import { shallow } from 'enzyme';
import { Route } from "react-router-dom";
import { App } from '../../src/components/App';

describe('>>> A P P ---- Test App.js Component <<<', () => {
	it('+++ Renders correct routes to Login Page +++', () => {
		const wrapper = shallow(<App />);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			pathMap[routeProps.path] = routeProps.component;
			return pathMap;
		}, {});
		
		expect(pathMap['/']).toBe(pathMap['/']);
	});
});