import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConnectedLogin, { Login } from '../../src/components/login';
import reducers from '../../src/components/reducers';

describe('>>> L O G I N ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	const initialProps = { formId: 'signInForm' };

	let wrapper, container;

	beforeEach(() => {
		wrapper = shallow(<Login {...initialProps}/>);
		container = mount(
			<Provider store={store}>
				<Router>
					<ConnectedLogin {...initialProps}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the DUMB component +++', () => {
		expect(wrapper.length).toEqual(1);
	});
       
	it('+++ Contains props that assigned to the DUMB component +++', () => {
		const targetComponent = wrapper.find('form').prop('id');

		expect(targetComponent).toEqual(initialProps.formId);
	});

	it('+++ Render the connected() component', () => {
		expect(container.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the connected() component', () => {
		expect(container.find('form').prop('id')).toEqual(initialProps.formId);
	});

	it('+++ Capturing Snapshot of connected() component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedLogin {...initialProps}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});