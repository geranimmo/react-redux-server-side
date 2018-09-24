import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import expect from "expect";
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../../src/components/header';

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
		UserLogin: true
	};

	beforeEach(() => {
		store = mockStore(propHeader);
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<Header {...propHeader}/>
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
					<Header {...propHeader}/>
				</Router>
			</Provider>
		).toJSON();

		expect(renderedValue).toMatchSnapshot();
	});

	// it('+++ Should route to Cart when click openCartView +++', () => {
	// 	const showCart = jest.fn();

	// 	wrapper.find('div#openCartView').props('onClick')();
	// 	expect(showCart).toEqual(expect.any(Function));

	// 	// const historyMock = { push: jest.fn() };
	// 	// const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
	// 	// 	const routeProps = route.props();
	// 	// 	pathMap[routeProps.path] = routeProps.component;
	// 	// 	return pathMap;
	// 	// }, {});

		
	// 	// wrapper.find('div#openCartView').simulate('click');
	// 	// console.log(historyMock.push.mock);
	// 	// console.log(pathMap['/cart']);
	// 	// expect(historyMock.push.mock.calls[0])
	// 	// 	.toEqual(pathMap['/cart']);
	// });

	// it('+++ Should route to Home when click closeCartView +++', () => {
	// 	const spy = jest.fn();

	// 	wrapper.find('div#closeCartView').simulate('click');
	// 	expect(spy).toHaveBeenCalled();

	// 	// const historyMock = { push: jest.fn() };
	// 	// const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
	// 	// 	const routeProps = route.props();
	// 	// 	pathMap[routeProps.path] = routeProps.component;
	// 	// 	return pathMap;
	// 	// }, {});

	// 	// wrapper.find('div#closeCartView').simulate('click');
	// 	// expect(historyMock.push.mock.calls[0])
	// 	// 	.toEqual(pathMap['/home']);
	// });
});