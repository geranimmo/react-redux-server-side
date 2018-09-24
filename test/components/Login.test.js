import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConnectedLogin, { Login, validateEmail } from '../../src/components/login';
import { InputField } from '../../src/components/common/InputField';
import { Button } from '../../src/components/common/Button';
import reducers from '../../src/components/reducers';

describe('>>> L O G I N ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	const initialProps = { formId: 'signInForm' };

	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedLogin {...initialProps}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Login component should display all child components', () => {
		const finder = wrapper.find('form.sign__in__form');
		expect(finder.length).toEqual(1);

		const findFormWrapper = finder.find('.form__wrapper');
		expect(findFormWrapper.length).toEqual(4);

		const findInputUsername = findFormWrapper.find('input[name="username"]');
		expect(findInputUsername.length).toEqual(1);

		const findInputPassword = findFormWrapper.find('input[name="password"]');
		expect(findInputPassword.length).toEqual(1);

		const findSubmitButton = findFormWrapper.find('button');
		expect(findSubmitButton.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the Login component', () => {
		expect(wrapper.find('form').prop('id')).toEqual(initialProps.formId);
	});

	it('+++ Capturing Snapshot of Login component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedLogin {...initialProps}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
       
	it('+++ Should validate email address format if valid will return true +++', () => {
		expect(validateEmail('test@email.com')).toBe(true); // should return true
		expect(validateEmail('test_email_com')).toBe(false); // should return false
	});

	it('+++ Simulate form password and handlePasswordField() should return value in state +++', () => {
		const wrappers = shallow(<Login {...initialProps}/>);
		const passValue = 'default123';
		
		const finder = wrappers.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputPassword = findFormWrapper.find(InputField).at(1).dive();

		findInputPassword.simulate('change', { target: { value: passValue } });

		wrapper.instance().forceUpdate();
		wrapper.update();

		expect(wrappers.state('passwordValue')).toEqual(passValue);
	});

	it('+++ Simulate form username and handleUsernameField() should return value in state +++', () => {
		const wrappers = shallow(<Login {...initialProps}/>);
		const usernameValue = 'client@default.com';
		
		const finder = wrappers.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputPassword = findFormWrapper.find(InputField).at(0).dive();

		findInputPassword.simulate('change', { target: { value: usernameValue } });

		wrapper.instance().forceUpdate();
		wrapper.update();

		expect(wrappers.state('usernameValue')).toEqual(usernameValue);
	});

	it('+++ Should show alert window if username and password is blank +++', () => {
		window.alert = jest.fn();
		const wrappers = shallow(<Login {...initialProps}/>);
		
		const finder = wrappers.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputPassword = findFormWrapper.find(Button).dive();

		findInputPassword.simulate('click');

		wrapper.instance().forceUpdate();
		wrapper.update();
		
		expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
		expect(wrappers.state('usernameValue')).toEqual(null);
		expect(wrappers.state('passwordValue')).toEqual(null);
	});
});