import { combineReducers } from 'redux';
import LoginReducer from './LoginReducers';
import ProfileReducer from './ProfileReducers';
import CartReducer from './CartReducers';
import BuyHistoryReducer from './BuyHistoryReducers';
import PackageReducer from './PackageReducers';

export default combineReducers({
	UserLogin: LoginReducer,
	Profile: ProfileReducer,
	ShoppingCart: CartReducer,
	BuyHistory: BuyHistoryReducer,
	Packages: PackageReducer
});
