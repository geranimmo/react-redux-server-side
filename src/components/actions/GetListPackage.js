import { DISPATCH_PACKAGES_LIST } from './types';
import ListPackages from '../../assets/json/packages__.json';

export const getListPackage = () => {
	return (dispatch) => {
		dispatch({
			type: DISPATCH_PACKAGES_LIST,
			payload: ListPackages
		});
	};
};