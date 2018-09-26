import { DISPATCH_TESTIMONIAL_LIST } from './types';
import ListTestimonials from '../../../src/assets/json/testimonials__.json';

export const getListTestimonial = () => {
	return (dispatch) => {
		dispatch({
			type: DISPATCH_TESTIMONIAL_LIST,
			payload: ListTestimonials
		});
	};
};