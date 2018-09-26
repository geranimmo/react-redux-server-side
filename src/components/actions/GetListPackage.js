import { DISPATCH_PACKAGES_LIST } from './types';
import ListPackages from '../../../src/assets/json/packages__.json';

export const getListPackage = () => {
	return (dispatch) => {
		dispatch({
			type: DISPATCH_PACKAGES_LIST,
			payload: ListPackages
		});
	};
};