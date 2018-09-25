import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RouterComponent from '../../src/components/Routers';
import App from '../../src/components/App';
import Login from '../../src/components/login';
import Home from '../../src/components/home';

describe('>>> A P P ---- Test App.js Component <<<', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<App />);
	});

	it('+++ It renders correctly without error +++', () => {
		expect(wrapper.find(RouterComponent)).toHaveLength(1);
	});

	it('+++ Path should redirect to Login +++', () => {
		expect(wrapper.find(Login)).toHaveLength(1);
		expect(wrapper.find(Home)).toHaveLength(0);
	});

	it('+++ Capturing Snapshot of App component +++', () => {
		const renderedValue = renderer.create(<App />).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});