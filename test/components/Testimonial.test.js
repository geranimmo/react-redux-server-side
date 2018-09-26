import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import TestimonialSlider from '../../src/components/testimonial';
import Slider from 'react-slick';
import { TestimonialCard } from '../../src/components/common/TestimonialCard';
import reducers from '../../src/components/reducers';
import ListTestimonials from '../../src/assets/json/testimonials__.json';

describe('>>> T E S T I M O N I A L  L I S T ---- Test & Snapshot <<<', () => {
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	let mountWrapper;

	beforeEach(() => {
		mountWrapper = mount(
			<Provider store={store}>
				<Router>
					<TestimonialSlider
						testimonialList={ListTestimonials}
					/>
				</Router>
			</Provider>
		);
	});

	it('+++ Render Sliders component +++', () => {
		const finder = mountWrapper.find('.testimonial__container');
		expect(finder.length).toEqual(1);

		const sliderContentWrapper = finder.find('.testimonial__content__wrapper');
		expect(sliderContentWrapper.length).toEqual(1);
        
		const sliderContent = sliderContentWrapper.find(Slider);
		expect(sliderContent.length).toEqual(1);

		// total slider content should be 4
		const sliderCardInner = sliderContent.find(TestimonialCard);
		expect(sliderCardInner.length).toEqual(4);

		// total slider should be 1
		const sliderContents = mountWrapper.find(Slider);
		expect(sliderContents.length).toEqual(1);
	});

	it('+++ Capturing Snapshot of TestimonialSlider component +++', () => {
		const renderedValue = renderer.create(
			<Provider store={store}>
				<Router>
					<TestimonialSlider testimonialList={ListTestimonials}/>
				</Router>
			</Provider>
		).toJSON();
		
		expect(renderedValue).toMatchSnapshot();
	});
});