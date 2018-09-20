import React from 'react';
import { shallow } from 'enzyme';
import { Route } from "react-router-dom";
import App from '../../src/components/App';

describe('>>> I N D E X ---- Test Index.jsx Component <<<', () => {
	it('+++ Renders App.js Component +++', () => {
		const wrapper = shallow(<App />);
		const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
			const routeProps = route.props();
			pathMap[routeProps.path] = routeProps.component;
			return pathMap;
		}, {});
		
		expect(pathMap['/']).toBe(pathMap['/']);
	});
});