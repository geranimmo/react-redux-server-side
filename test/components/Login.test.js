import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConnectedLogin, { Login, validateEmail } from '../../src/components/login';
import { InputField } from '../../src/components/common/InputField';
import { Button } from '../../src/components/common/Button';
import reducers from '../../src/components/reducers';

describe('>>> L O G I N ---- Test & Snapshot <<<', () => {
	const initialProps = { formId: 'signInForm' };
	const usernameVal = 'client@default.com';
	const passwordVal = 'default123';

	let store, mountWrapper, shallWrapper, history, loginFetch;

	beforeEach(() => {
		store = createStore(reducers, {}, applyMiddleware(thunk));
		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedLogin {...initialProps}/>
				</Router>
			</Provider>
		);
		history = { push: jest.fn() };
		loginFetch = jest.fn();
		window.alert = jest.fn();
		shallWrapper = shallow(
			<Login
				history={history}
				loginFetch={loginFetch}
				{...initialProps}
			/>
		);
	});

	it('+++ Render the Login component should display all child components +++', () => {
		const finder = mountWrapper.find('form.sign__in__form');
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

	it('+++ Contains props that assigned to the Login component +++', () => {
		expect(mountWrapper.find('form').prop('id')).toEqual(initialProps.formId);
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
		const finder = shallWrapper.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputPassword = findFormWrapper.find(InputField).at(1).dive();

		findInputPassword.simulate('change', { target: { value: passwordVal } });
		expect(shallWrapper.state('passwordValue')).toEqual(passwordVal);
	});

	it('+++ Simulate form username and handleUsernameField() should return value in state +++', () => {
		const finder = shallWrapper.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputUsername = findFormWrapper.find(InputField).at(0).dive();

		findInputUsername.simulate('change', { target: { value: usernameVal } });
		expect(shallWrapper.state('usernameValue')).toEqual(usernameVal);
	});

	it('+++ Should show alert window if username or password is null +++', () => {
		const finder = shallWrapper.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findSubmitButton = findFormWrapper.find(Button).dive();

		findSubmitButton.simulate('click');
		expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
		expect(shallWrapper.state('usernameValue')).toEqual(null);
		expect(shallWrapper.state('passwordValue')).toEqual(null);
	});

	it('+++ Should handle enter key when login +++', () => {
		const finder = shallWrapper.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputUsername = findFormWrapper.find(InputField).at(0).dive();

		findInputUsername.simulate("keypress", { key: 'Enter' });
		expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
		expect(shallWrapper.state('usernameValue')).toEqual(null);
		expect(shallWrapper.state('passwordValue')).toEqual(null);
	});

	it('+++ Should initialize loginFetch() if username or password is valid +++', () => {
		const pathChangeSpy = jest.spyOn(shallWrapper.instance(), 'createDataSource');
		const finder = shallWrapper.find('form.sign__in__form');
		const findFormWrapper = finder.find('.form__wrapper');
		const findInputUsername = findFormWrapper.find(InputField).at(0).dive();
		const findInputPassword = findFormWrapper.find(InputField).at(1).dive();
		const findSubmitButton = findFormWrapper.find(Button).dive();

		findInputUsername.simulate('change', { target: { value: usernameVal } });
		findInputPassword.simulate('change', { target: { value: passwordVal } });

		expect(shallWrapper.state()).toEqual(
			expect.objectContaining({
				usernameValue: usernameVal,
				passwordValue: passwordVal
			})
		);

		findSubmitButton.simulate('click');
		expect(loginFetch).toHaveBeenCalledWith(
			expect.objectContaining({
				username: usernameVal,
				password: passwordVal
			})
		);

		// handle change path if login success
		shallWrapper.setProps({ UserLogin: true });
		expect(pathChangeSpy.mock.calls.length).toBe(1);
	});

	it('+++ Should initialize componentWillMount() +++', () => {
		const tempWrapper = shallow(
			<Login
				history={history}
				loginFetch={loginFetch}
				{...initialProps}
				UserLogin={true}
			/>
		);
		
		tempWrapper.update();
		expect(history.push).toHaveBeenCalledWith('/home');
	});
});