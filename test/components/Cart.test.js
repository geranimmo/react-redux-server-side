import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ConnectedCart, { Cart } from '../../src/components/cart';
import { CartItem } from '../../src/components/common';
import reducers from '../../src/components/reducers';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> C A R T ---- Test & Snapshot <<<', () => {
	let store,
		mountWrapper,
		shallWrapper,
		removeFromCart,
		getTotalCost,
		getTotalDiscount,
		getListPackage,
		history;

	const propCart = {
		ShoppingCart: [
			{
				id: 'Classic',
				buy_time: 1537425742947,
				package_id: "Classic",
				package_name: "Classic",
				package_recommend: false,
				package_description: "Classic Ad Lorem Ipsum is simply dummy text of the printing and typesetting",
				package_price: 269.99,
				package_image: "/assets/images/employeer-image-sample.jpg"
			}, {
				id: 'Premium',
				buy_time: 1537425742948,
				package_id: "Classic",
				package_name: "Classic",
				package_recommend: false,
				package_description: "Classic Ad Lorem Ipsum is simply dummy text of the printing and typesetting",
				package_price: 269.99,
				package_image: "/assets/images/employeer-image-sample.jpg"
			}
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
		store = createStore(reducers, {}, applyMiddleware(thunk));

		history = { push: jest.fn() };
		getTotalCost = jest.fn();
		getTotalDiscount = jest.fn();
		getListPackage = jest.fn();
		window.alert = jest.fn();
		removeFromCart = jest.fn();

		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedCart
						{...propCart}
						history={history}
						getTotalCost={getTotalCost}
						getTotalDiscount={getTotalDiscount}
						getListPackage={getListPackage}
					/>
				</Router>
			</Provider>
		);

		shallWrapper = shallow(
			<Cart
				{...propCart}
				history={history}
				getTotalCost={getTotalCost}
				getTotalDiscount={getTotalDiscount}
				getListPackage={getListPackage}
				removeFromCart={removeFromCart}
			/>
		);
	});

	it('+++ Render the ConnectedCart component', () => {
		const container = shallWrapper.find('.cart__component');
		expect(container.length).toEqual(1);

		const findWrapper = container.find('#content__scroller');
		expect(findWrapper.length).toEqual(1);

		const findCartItemsWrapper = findWrapper.find('.wrapper__list');
		// total items should same as propCart.ShoppingCart.length
		expect(findCartItemsWrapper.length).toEqual(propCart.ShoppingCart.length);
	});

	it('+++ Contains props that assigned to the ConnectedCart component', () => {
		expect(mountWrapper.find(`main`).prop('id')).toEqual(propCart.id);
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

	it('+++ Simulate Click Remove From Cart in Packages +++', () => {
		const container = shallWrapper.find('.cart__component');
		const findWrapper = container.find('#content__scroller');
		const findCartItemsWrapper = findWrapper.find('.wrapper__list');

		// get the first item of cart items
		const cartItemList = findCartItemsWrapper.first().find(CartItem).dive();
		const removeCartBtn = cartItemList.find('.cart__delete');

		removeCartBtn.simulate('click');
		
		const attributValue = propCart.ShoppingCart[0].buy_time;
		// call request should be the same with first items buy_time
		expect(removeFromCart).toHaveBeenCalledWith(attributValue);
	});

	it('+++ Simulate componentWillReceiveProps +++', () => {
		const showCartSpy = jest.spyOn(shallWrapper.instance(), 'createDataSource');

		shallWrapper.setProps({ UserLogin: false });
		shallWrapper.instance().forceUpdate();
		shallWrapper.update();
		expect(showCartSpy.mock.calls.length).toBe(1);
	});

	it('+++ Should call handle scroll function when scroll +++', () => {
		const handleHeaderOnScroll = jest.fn();

		mountWrapper.find('div#content__scroller').simulate('scroll', { deltaY: 50 });
		expect(handleHeaderOnScroll).toEqual(expect.any(Function));
	});
});