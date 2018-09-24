import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import expect from "expect";
import { BrowserRouter as Router } from 'react-router-dom';
// import renderer from 'react-test-renderer';
import ConnectedHome, { Home } from '../../src/components/home';
// import { Button } from '../../src/components/common/Button';
// import * as actions from '../../src/components/actions';
// import * as types from '../../src/components/actions/types';
import reducers from '../../src/components/reducers';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> H O M E ---- Test & Snapshot <<<', () => {
	let store, mountWrapper;

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
		store = createStore(reducers, {}, applyMiddleware(thunk));
		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<ConnectedHome {...propHome}/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render the Home component +++', () => {
		const finder = mountWrapper.find('div.main__container');
		expect(finder.length).toEqual(1);
	});

	it('+++ Initialize componentDidMount() if not login route to Login +++', () => {
		const history = { push: jest.fn() };
		const shallWrapper = shallow(
			<Home
				history={history}
				UserLogin={false}
			/>
		);

		shallWrapper.update();
		expect(history.push).toHaveBeenCalledWith('/');
	});

	it('+++ Initialize componentDidMount() if login route to Home +++', () => {
		const getListPackage = jest.fn();
		const shallWrapper = shallow(
			<Home
				getListPackage={getListPackage}
				UserLogin={true}
			/>
		);

		shallWrapper.update();
		expect(getListPackage).toHaveBeenCalled();
	});
    
	// it('+++ Check ShoppingCart action in Home ', () => {
	// 	const addCartData = {
	// 		id: "Classic",
	// 		buy_time: 1537425742447
	// 	};
	// 	let action;

	// 	store.dispatch(actions.addToCart(addCartData));
	// 	action = store.getActions();
		
	// 	expect(action[0].type)
	// 		.toBe(types.DISPATCH_PACKAGES_LIST);

	// 	expect(action[1].type)
	// 		.toBe(types.ADD_TO_CART);
	// });

	// it('+++ Capturing Snapshot of Home component +++', () => {
	// 	const renderedValue = renderer.create(
	// 		<Provider store={store}>
	// 			<Router>
	// 				<ConnectedHome {...propHome}/>
	// 			</Router>
	// 		</Provider>
	// 	).toJSON();
		
	// 	expect(renderedValue).toMatchSnapshot();
	// });

	// it('+++ Simulate Click Add To Cart in Packages +++', () => {
	// 	const finder = wrapper.find('.slider__content__wrapper');
	// 	expect(finder.length).toEqual(1);

	// 	const findActiveSlide = finder.find('.slick-current');
	// 	expect(findActiveSlide.length).toEqual(1);

	// 	const findActionButton = findActiveSlide.find('button');

	// 	findActionButton.simulate('click');
	// 	expect(addToCart).toHaveBeenCalledWith(
	// 		expect.objectContaining({ id: expect.anything() })
	// 	);

	// 	// const findInputPassword = findFormWrapper.find('input[name="password"]');
	// 	// expect(findInputPassword.length).toEqual(1);

	// 	// const findSubmitButton = findFormWrapper.find('button');

	// 	// expect(
	// 	// 	wrapper
	// 	// 		.find('.slider__content__wrapper')
	// 	// 		.find('.slick-current')
	// 	// 		.find('button.button__buy__items')
	// 	// 		.length
	// 	// ).toEqual(1);
		
	// 	// wrapper
	// 	// 	.find('.slider__content__wrapper')
	// 	// 	.find('.slick-current')
	// 	// 	.find(Button)
	// 	// 	.dive()
	// 	// 	.simulate('click');

	// 	// wrapper.instance().forceUpdate();
	// 	// wrapper.update();

	// 	// expect(addToCart).toHaveBeenCalledWith(
	// 	// 	expect.objectContaining({
	// 	// 		id: expect.anything()
	// 	// 	})
	// 	// );
	// });

	// it('+++ Simulate componentWillReceiveProps +++', () => {
	// 	const history = { push: jest.fn() };
	// 	const getListPackage = jest.fn();
	// 	const wrappers = shallow(
	// 		<Home
	// 			{...propHome}
	// 			history={history}
	// 			getListPackage={getListPackage}
	// 		/>
	// 	);
	// 	const showCartSpy = jest.spyOn(wrappers.instance(), 'createDataSource');

	// 	wrappers.setProps({
	// 		getListPackage: [{
	// 			"package_id": "Standout"
	// 		}]
	// 	});

	// 	wrappers.instance().forceUpdate();
	// 	wrappers.update();

	// 	expect(showCartSpy.mock.calls.length).toBe(1);
	// });

	// it('+++ Should call handle scroll function when scroll +++', () => {
	// 	const handleHeaderOnScroll = jest.fn();

	// 	wrapper.find('div#content__scroller').simulate('scroll', { wrapper: {deltaY: 100 }});
	// 	expect(handleHeaderOnScroll).toEqual(expect.any(Function));
	// });
});