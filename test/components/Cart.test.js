import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import ConnectedCart, { Cart } from '../../src/components/cart';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> C A R T ---- Test & Snapshot <<<', () => {
	const mockStore = configureMockStore([thunk]);
	let wrapper, store;

	const propCart = {
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
		Packages: ListPackages,
		id: 'shopping__cart__wrapper'
	};

	beforeEach(() => {
		store = mockStore(propCart);
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedCart {...propCart}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the ConnectedCart component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the ConnectedCart component', () => {
		expect(wrapper.find(`main`).prop('id')).toEqual(propCart.id);
	});

	it('+++ Capturing Snapshot of ConnectedCart component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedCart {...propCart}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});

	it('+++ Should simulate click on delete cart item button +++', () => {
		expect(wrapper.find('.cart__delete').length)
			.toEqual(2);

		wrapper
			.find('div.cart__delete')
			.at(0)
			.simulate('click');

		expect(wrapper.find('div.cart__delete').length)
			.toEqual(1);

		wrapper
			.find('div.cart__delete')
			.at(0)
			.simulate('click');

		expect(wrapper.find('div.cart__delete').length)
			.toEqual(0);
	});

	it('+++ Should convert timestamp into date time format +++', () => {
		const renders = new ShallowRenderer();
		renders.render(<Cart {...propCart}/>);
		const result = renders.getRenderOutput();

		console.log(result.props);
		console.log('################################################');
		console.log(result.props.children[1].props);
		console.log('################################################');
		console.log(result.props.children[1].props.children);

		//const mockWrapper = shallow(<Cart />);
		

		// const mockFn = jest.fn();
		// //const renderBuyTime = new mockFn();
		// console.log(jest.mock(Cart));
		// console.log(mockFn.mock.instances[0]);

		// console.log(instance[7].debug());
		// const timestamp = 1537425742947;
		// const expectedValue = new Intl.DateTimeFormat('en-US', {
    	// 	year: 'numeric',
    	// 	month: '2-digit',
    	// 	day: '2-digit',
    	// 	hour: '2-digit',
    	// 	minute: '2-digit',
    	// 	second: '2-digit'
		// }).format(timestamp);

		// const renderBuyTime = jest.fn(() => expectedValue);
		// // console.log(renderBuyTime());

		// Cart.prototype.renderBuyTime = jest.fn();
		// console.log(Cart.prototype.renderBuyTime);
		// expect(Cart.prototype.renderBuyTime(timestamp)).toBe(expectedValue);

		//wrapper.instance().populateTotalCost();
		
		// console.log(renderedValue.getInstance('populateTotalCost'));
		//expect(wrapper.state().totalCartCost).toEqual(664.98);
		// expect(instance[7].renderBuyTime(timestamp)).toBe(expectedValue);
	});

	
});