import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import expect from 'expect';
// import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ConnectedHeader, { Header } from '../../src/components/header';

describe('>>> H E A D E R ---- Test & Snapshot <<<', () => {
	const mockStore = configureMockStore([thunk]);
	let wrapper, store;

	const propHeader = {
		onCart: true,
		ShoppingCart: [
			{ id: 'Classic', buy_time: 1537425742947 },
			{ id: 'Premium', buy_time: 1537425742948 }
		],
		Profile: {
			client_id: 1,
			first_name: "Default",
			last_name: "Client",
			business_name: "Default",
			phone_number: "+612529291002",
			client_logo: "client-default-logo.png",
			client_special: []
		},
		UserLogin: true,
		showCart: jest.fn()
	};

	beforeEach(() => {
		store = mockStore(propHeader);
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedHeader {...propHeader}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Header component +++', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Should return of total Cart length in Cart notification +++', () => {
		expect(wrapper.find('div#openCartView').text())
			.toEqual(`${propHeader.ShoppingCart.length}`);
	});

	it('+++ Capturing Snapshot of Header component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedHeader {...propHeader}/>
				</Router>
			</Provider>
		).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	it('+++ Should call showCart() when click cart button +++', () => {
		const history = { push: jest.fn() };
		const wrappers = shallow(<Header {...propHeader} history={history}/>);
		const showCart = jest.spyOn(wrappers.instance(), 'showCart');

		wrappers.instance().forceUpdate();
		wrappers.update();
		wrappers.find('div#openCartView').first().simulate('click');
		expect(showCart.mock.calls.length).toBe(1);
	});

	it('+++ Should call closeCart() when click close cart button +++', () => {
		const history = { push: jest.fn() };
		const wrappers = shallow(<Header {...propHeader} history={history}/>);
		const showCart = jest.spyOn(wrappers.instance(), 'closeCart');

		wrappers.instance().forceUpdate();
		wrappers.update();
		wrappers.find('div#closeCartView').first().simulate('click');
		expect(showCart.mock.calls.length).toBe(1);
	});
});