import { combineReducers } from 'redux';
import LoginReducer from './LoginReducers';
import ProfileReducer from './ProfileReducers';
import ShoppingCartReducer from './ShoppingCartReducers';
import PackageReducer from './PackageReducers';
import TotalCostReducer from './TotalCostReducers';
import TotalDiscountReducer from './TotalDiscountReducers';

export default combineReducers({
	UserLogin: LoginReducer,
	Profile: ProfileReducer,
	ShoppingCart: ShoppingCartReducer,
	Packages: PackageReducer,
	TotalCost: TotalCostReducer,
	TotalDiscount: TotalDiscountReducer
});
