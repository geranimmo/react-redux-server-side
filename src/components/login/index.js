import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {
	InputField,
	Button
} from '../common';
import Header from '../header';
import './login.less';
import { loginFetch } from '../actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameValue: null,
			passwordValue: null
		};
	}
	
	componentWillMount() {
		if (this.props.UserLogin) {
			this.props.history.push('/home');
		}
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource(state) {
		if (state.UserLogin) {
			this.props.history.push('/home');
		}
	}

	handleEnterForm = (e) => {
		if (e.key === "Enter") { this.initSignin(); }
	};

	initSignin() {
		const { usernameValue, passwordValue } = this.state;

		if (usernameValue && passwordValue) {
			this.props.loginFetch({
				username: usernameValue,
				password: passwordValue
			});
		} else {
			alert('Something Wrong With Your Username or Password');
		}
	}

	handleUsernameField = (evt) => {
		let usernameValue = evt.target.value;
		usernameValue = usernameValue.replace(/(<([^>]+)>)/ig, '');
		
		this.setState({
			usernameValue: this.validateEmail(usernameValue) ? usernameValue : null
		});
	};

	handlePasswordField = (evt) => {
		let passwordValue = evt.target.value;
		passwordValue = passwordValue.replace(/(<([^>]+)>)/ig, '');

		this.setState({ passwordValue });
	};

	validateEmail = (data) => {
		const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return regEmail.test(data);
	};

	render() {
		const usernameProps = {
			type: 'text',
			id: 'username',
			name: 'username',
			maxLength: 50,
			minLength: 6,
			autoComplete: 'off',
			onChange: this.handleUsernameField.bind(this),
			onKeyPress: this.handleEnterForm.bind(this)
		};
		const passwordProps = {
			type: 'text',
			id: 'password',
			name: 'password',
			maxLength: 50,
			minLength: 6,
			autoComplete: 'off',
			onChange: this.handlePasswordField.bind(this),
			onKeyPress: this.handleEnterForm.bind(this)
		};
		const buttonProps = {
			className: 'button__sign__in',
			onClick: this.initSignin.bind(this),
			value: 'Sign in'
		};

		return (
			<div className={`float__container`}>
				<Header />
				<main className={`login__component`}>
					<div className={`content__wrapper`}>
						<form className={`sign__in__form`}>
							<h1>Sign in</h1>
							<div className={`form__wrapper`}>
								<label htmlFor="username">Email Address</label>
								<InputField {...usernameProps}/>
							</div>
							<div className={`form__wrapper`}>
								<label htmlFor="password">Password</label>
								<InputField {...passwordProps}/>
							</div>
							<div className={`form__wrapper`}>
								<Button {...buttonProps}/>
							</div>
							<div className={`form__wrapper`}>
								Don't have account? <b>Sign up</b>
							</div>
						</form>
					</div>
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { loginFetch })(Login));