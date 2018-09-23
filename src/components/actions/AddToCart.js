import { ADD_TO_CART } from './types';
import _ from 'lodash';

export const addToCart = (datas) => {
	return (dispatch, getState) => {
		const { Packages } = getState();
		let DateTime = new Date().getTime();
		const requestedDatas = [{
			id: datas.id,
			buy_time: datas.date ? datas.date : DateTime
		}];
		const populateItemCart = _.map(requestedDatas, (item) => {
			return _.merge(item, _.find(Packages, { 'package_id' : item.id }));
		});
		
		dispatch({
			type: ADD_TO_CART,
			payload: populateItemCart[0]
		});
	};
};