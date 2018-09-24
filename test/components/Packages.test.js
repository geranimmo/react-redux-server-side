import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import PackageSlider from '../../src/components/packages';
import Slider from 'react-slick';
import { Button } from '../../src/components/common/Button';
import reducers from '../../src/components/reducers';
import ListPackages from '../../src/assets/json/packages__.json';

describe('>>> P A C K A G E S  L I S T ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	let mountWrapper, addToCart;

	beforeEach(() => {
		addToCart = jest.fn();
		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<PackageSlider
						addToCart={addToCart}
						packagesList={ListPackages}
					/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render all Sliders component +++', () => {
		const finder = mountWrapper.find('.slider__container');
		expect(finder.length).toEqual(1);

		const sliderNavWrapper = finder.find('.slider__nav__wrapper');
		expect(sliderNavWrapper.length).toEqual(1);
		const sliderNavContent = sliderNavWrapper.find(Slider);
		expect(sliderNavContent.length).toEqual(1);

		const sliderContentWrapper = finder.find('.slider__content__wrapper');
		expect(sliderContentWrapper.length).toEqual(1);
		const sliderContent = sliderContentWrapper.find(Slider);
		expect(sliderContent.length).toEqual(1);

		// total sliders should be 2
		const sliderContents = mountWrapper.find(Slider);
		expect(sliderContents.length).toEqual(2);
	});

	it('+++ Should show Button addToCart +++', () => {
		const finder = mountWrapper.find('.slider__container');
		const sliderContentWrapper = finder.find('.slider__content__wrapper');
		const sliderContent = sliderContentWrapper.find(Slider);
		const buttonWrapper = sliderContent.find('.slick-current');
		const buttonAddToCart = buttonWrapper.find(Button);
		expect(buttonAddToCart.length).toEqual(1);
	});

	// it('+++ Should initialize addToCart when Button clicked in active slide +++', () => {
	// 	const finder = mountWrapper.find('.slider__container');
	// 	const sliderContentWrapper = finder.find('.slider__content__wrapper');
	// 	const sliderContent = sliderContentWrapper.find(Slider);
	// 	const buttonWrapper = sliderContent.find('.slick-current');
	// 	const buttonAddToCart = buttonWrapper.find(Button);
		
	// 	buttonAddToCart.simulate('click');
	// 	expect(addToCart).toBe(
	// 		expect.anything()
	// 	);
	// });

	it('+++ Capturing Snapshot of PackageSlider component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<PackageSlider packagesList={ListPackages}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});