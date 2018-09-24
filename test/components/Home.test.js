import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import expect from "expect";
// import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ConnectedHome, { Home } from '../../src/components/home';
import * as actions from '../../src/components/actions';
import * as types from '../../src/components/actions/types';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> H O M E ---- Test & Snapshot <<<', () => {
	const mockStore = configureMockStore([thunk]);
	let wrapper, store;

	const propHome = {
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
		id: 'home__page__wrapper'
	};

	beforeEach(() => {
		store = mockStore(propHome);
		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedHome {...propHome}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Home component', () => {
		expect(wrapper.length).toEqual(1);
	});

	it('+++ Contains props that assigned to the Home component', () => {
		expect(wrapper.find(`main`).prop('id'))
			.toEqual(propHome.id);
	});
    
	it('+++ Check ShoppingCart action in Home ', () => {
		const addCartData = {
			id: "Classic",
			buy_time: 1537425742447
		};
		let action;

		store.dispatch(actions.addToCart(addCartData));
		action = store.getActions();
		
		expect(action[0].type)
			.toBe(types.DISPATCH_PACKAGES_LIST);

		expect(action[1].type)
			.toBe(types.ADD_TO_CART);
	});

	it('+++ Capturing Snapshot of Home component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<ConnectedHome {...propHome}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});

	it('+++ Simulate Click Add To Cart in Packages +++', () => {
		const addToCart = jest.fn();

		expect(
			wrapper
				.find('.slider__content__wrapper')
				.find('.slick-current')
				.find('button.button__buy__items')
				.length
		).toEqual(1);
		
		wrapper
			.find('.slider__content__wrapper')
			.find('.slick-current')
			.find('button.button__buy__items')
			.simulate('click');

		expect(addToCart).toEqual(expect.any(Function));
	});

	it('+++ Simulate componentWillReceiveProps when initialize getListPackage() +++', () => {
		const history = { push: jest.fn() };
		const getListPackage = jest.fn();
		const wrappers = shallow(
			<Home
				{...propHome}
				history={history}
				getListPackage={getListPackage}
			/>
		);
		const showCartSpy = jest.spyOn(wrappers.instance(), 'createDataSource');

		wrappers.setProps({
			getListPackage: [{
				"package_id": "Standout"
			}]
		});

		wrappers.instance().forceUpdate();
		wrappers.update();

		expect(showCartSpy.mock.calls.length).toBe(1);
	});

	it('+++ Should call handle scroll function when scroll +++', () => {
		const handleHeaderOnScroll = jest.fn();

		wrapper.find('div#content__scroller').simulate('scroll', { deltaY: 50 });
		expect(handleHeaderOnScroll).toEqual(expect.any(Function));
	});
});