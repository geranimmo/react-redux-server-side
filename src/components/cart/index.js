import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from '../header';
import { CartItem, CartFooter } from '../common';
import {
	removeFromCart,
	getTotalCost,
	getTotalDiscount
} from '../actions';
import './cart.less';

export class Cart extends Component {
	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		} else {
			this.props.getTotalCost();
			this.props.getTotalDiscount();
		}
		
		document.addEventListener('scroll', this.handleScroll, true);
	}
    
    handleScroll = () => {
    	let targetElm = document.getElementById("content__scroller").getBoundingClientRect();
    	let targetOffsetTop = targetElm.top;
    	let header = document.getElementById("header");
		
    	if (targetOffsetTop < 0) {
    		header.classList.add("header__on__scrolled");
    	} else {
    		header.classList.remove("header__on__scrolled");
    	}
    }

    render() {
    	const {
    		ShoppingCart,
    		TotalCost,
    		TotalDiscount,
    		removeFromCart
    	} = this.props;

    	return (
    		<div className={`main__container`}>
    			<Header onCart={true} />
    			<main id={this.props.id} className={`cart__component`}>
    				<div
    					id={`content__scroller`}
    					onScroll={this.handleScroll.bind(this)}
    				>
    					<div className={`cart__empty ${ShoppingCart.length ? 'hidden' : ''}`}>Your Cart Still Empty</div>;
    					{ ShoppingCart.map((item, index) => {
    						return (
    							<div key={index}>
    								<CartItem
    									id={`Cart__${item.id}__${index}__${item.buy_time}`}
    									className={`cart__list__wrapper`}
    									removeCartItems={
    										() => removeFromCart(item.buy_time)
    									}
    									item={item}
    								/>
    							</div>
    						);
    					}) }
    				</div>
    			</main>
    			<CartFooter
    				className={`cart__footer`}
    				totalCartCost={TotalCost}
    				totalCartDiscount={TotalDiscount}
    				myCartList={ShoppingCart}
    			/>
    		</div>
    	);
    }
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, {
	removeFromCart,
	getTotalCost,
	getTotalDiscount
})(Cart));