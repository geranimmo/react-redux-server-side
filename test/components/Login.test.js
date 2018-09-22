import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Login, { validateEmail } from '../../src/components/login';
import reducers from '../../src/components/reducers';

describe('>>> L O G I N ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	const initialProps = { formId: 'signInForm' };

	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<Login {...initialProps}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Login component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the Login component', () => {
		expect(wrapper.find('form').prop('id')).toEqual(initialProps.formId);
	});

	it('+++ Capturing Snapshot of Login component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<Login {...initialProps}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
       
	it('+++ Should validate email address format if valid will return true +++', () => {
		expect(validateEmail('test@email.com')).toBe(true); // should return true
		expect(validateEmail('test_email_com')).toBe(false); // should return false
	});
});