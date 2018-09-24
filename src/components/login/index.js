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

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameValue: null,
			passwordValue: null
		};

		this.handleUsernameField = this.handleUsernameField.bind(this);
		this.handlePasswordField = this.handlePasswordField.bind(this);
		this.handleEnterForm = this.handleEnterForm.bind(this);
		this.initSignin = this.initSignin.bind(this);
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
			const requestUserData = {
				username: usernameValue,
				password: passwordValue
			};

			this.props.loginFetch(requestUserData);
		} else {
			alert('Invalid username or password');
		}
	}

	handleUsernameField = (evt) => {
		let usernameValue = evt.target.value;
		usernameValue = usernameValue.replace(/(<([^>]+)>)/ig, '');
		
		this.setState({
			usernameValue: validateEmail(usernameValue) ? usernameValue : null
		});
	};

	handlePasswordField = (evt) => {
		let passwordValue = evt.target.value;
		passwordValue = passwordValue.replace(/(<([^>]+)>)/ig, '');

		this.setState({ passwordValue });
	};

	render() {
		const usernameProps = {
			type: 'text',
			id: 'username',
			name: 'username',
			maxLength: 50,
			minLength: 6,
			autoComplete: 'off',
			onChange: this.handleUsernameField,
			onKeyPress: this.handleEnterForm
		};
		const passwordProps = {
			type: 'password',
			id: 'password',
			name: 'password',
			maxLength: 50,
			minLength: 6,
			autoComplete: 'off',
			onChange: this.handlePasswordField,
			onKeyPress: this.handleEnterForm
		};
		const buttonProps = {
			className: 'button__sign__in',
			onClick: this.initSignin,
			value: 'Sign in'
		};

		return (
			<div className={`float__container`}>
				<Header />
				<main className={`login__component`}>
					<div className={`content__wrapper`}>
						<form id={this.props.formId} className={`sign__in__form`}>
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

export const validateEmail = (data) => {
	const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEmail.test(data);
};

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { loginFetch })(Login));