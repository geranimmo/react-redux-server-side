import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Login from './login';
import Home from './home';
import Cart from './cart';

export class RouterComponent extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login}/>
					<Route exact path="/home" component={Home}/>
					<Route exact path="/cart" component={Cart}/>
				</Switch>
			</Router>
		);
	}
}

export default RouterComponent;
