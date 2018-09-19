import {
	PACKAGES_LIST_FETCH,
	PACKAGES_LIST_FETCH_SUCCESS,
	PACKAGES_LIST_FETCH_FAILED
} from './types';
import ListPackages from '../../assets/json/packages__.json';

export const packageFetch = () => {
	return (dispatch) => {
		dispatch({ type: PACKAGES_LIST_FETCH });

		if (ListPackages) {
			packageFetchSuccess(dispatch, ListPackages);
		} else {
			packageFetchFailed(dispatch);
		}
	};
};

const packageFetchSuccess = (dispatch, datas) => {
	dispatch({
		type: PACKAGES_LIST_FETCH_SUCCESS,
		payload: datas
	});
};

const packageFetchFailed = (dispatch) => {
	dispatch({ type: PACKAGES_LIST_FETCH_FAILED });
};