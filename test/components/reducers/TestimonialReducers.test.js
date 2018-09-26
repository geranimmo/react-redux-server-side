import TestimonialReducer from '../../../src/components/reducers/TestimonialReducers';
import { DISPATCH_TESTIMONIAL_LIST } from '../../../src/components/actions/types';
import ListTestimonials from '../../../src/assets/json/testimonials__.json';

describe('>>> R E D U C E R S ---- Test TestimonialReducers <<<', () => {
	it('+++ Reducer DISPATCH_TESTIMONIAL_LIST should be return what is requested +++', () => {
		expect(
			TestimonialReducer([], {
				type: DISPATCH_TESTIMONIAL_LIST,
				payload: ListTestimonials
			}))
			.toEqual(ListTestimonials);
	});
});