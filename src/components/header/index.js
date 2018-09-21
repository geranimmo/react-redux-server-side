import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './header.less';

export class Header extends Component {
	showCart() {
		this.props.history.push('/cart');
	}

	closeCart() {
		this.props.history.push('/home');
	}

	renderClientLogo() {
		const { Profile } = this.props;

		if (Profile.client_logo) {
			return (
				<div className={`client__logo__wrapper`}>
					<img
						src={Profile.client_logo}
						alt={Profile.business_name}
					/>
				</div>
			);
		}
	}

	renderCartNotification() {
		const { ShoppingCart } = this.props;
		const cartTotal = ShoppingCart.length > 9 ? '9+' : ShoppingCart.length;

		if ( ShoppingCart.length > 0 ) {
			return <div className={`cart__notif`}>{cartTotal}</div>;
		}
		return null;
	}

	renderRightNavigation() {
		const { onCart } = this.props;

		return (
			<nav className={`nav__right`}>
				<div
					id={`openCartView`}
					className={`menu__btn__icon ${onCart ? 'hidden' : ''}`}
					onClick={this.showCart.bind(this)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/>
					</svg>
					{ this.renderCartNotification() }
				</div>
				<div
					id={`closeCartView`}
					className={`menu__btn__icon ${onCart ? '' : 'hidden'}`}
					onClick={this.closeCart.bind(this)}
				>
					<svg className={`icon__close`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
					</svg>
				</div>
			</nav>
		);
	}

	render() {
		const { UserLogin } = this.props;

		return (
			<header
				id={`header`}
				className={UserLogin ? 'header__active' : ''}
			>
				<nav className={`nav__left`}>
					<NavLink to={UserLogin ? '/home' : '/'}>
						<div className={`seek__logo`} />
					</NavLink>
					{ UserLogin ? this.renderClientLogo() : '' }
				</nav>
				{ UserLogin ? this.renderRightNavigation() : '' }
			</header>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, {})(Header));