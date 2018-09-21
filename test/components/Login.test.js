import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Login from '../../src/components/login';
import reducers from '../../src/components/reducers';

describe('>>> L O G I N ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	const initialProps = { formId: 'signInForm' };

	let wrapper, app;

	beforeEach(() => {
		app = <Provider store={store}>
			<Router>
				<Login {...initialProps}/>
			</Router>
		</Provider>;

		wrapper = mount(app);
	});

	it('+++ Render the connected() component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the connected() component', () => {
		expect(wrapper.find('form').prop('id')).toEqual(initialProps.formId);
	});

	it('+++ Capturing Snapshot of connected() component +++', () => {
		const renderedValue = renderer.create(app).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});