import { combineReducers } from 'redux';
import LoginReducer from './LoginReducers';
import ProfileReducer from './ProfileReducers';
import ShoppingCartReducer from './ShoppingCartReducers';
import PackageReducer from './PackageReducers';

export default combineReducers({
	UserLogin: LoginReducer,
	Profile: ProfileReducer,
	ShoppingCart: ShoppingCartReducer,
	Packages: PackageReducer
});
