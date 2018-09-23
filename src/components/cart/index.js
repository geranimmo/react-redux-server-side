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
	constructor(props) {
		super(props);
		this.state = {
			myCartList: [],
			totalCartCost: 0,
			totalCartDiscount: 0
		};
	}

	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		} else {
			this.props.getTotalCost();
			this.props.getTotalDiscount();
		}
		
		document.addEventListener('scroll', this.handleScroll, true);
	}

	componentWillMount() {
		this.createDataSource(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	createDataSource(state) {
		this.setState({
			myCartList: state.ShoppingCart,
			totalCartCost: state.TotalCost,
			totalCartDiscount: state.TotalDiscount
		});
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
    		myCartList,
    		totalCartDiscount,
    		totalCartCost
    	} = this.state;

    	return (
    		<div className={`main__container`}>
    			<Header onCart={true} />
    			<main id={this.props.id} className={`cart__component`}>
    				<div
    					id={`content__scroller`}
    					onScroll={this.handleScroll.bind(this)}
    				>
    					<div className={`cart__empty ${myCartList.length ? 'hidden' : ''}`}>Your Cart Still Empty</div>
    					{ myCartList.map((item, index) => {
    						return (
    							<div
    								key={index}
    								className={`wrapper__list${index}`}
    								id={`Cart__${item.id}__${index}__${item.buy_time}`}
    							>
    								<CartItem
    									className={`cart__list__wrapper`}
    									removeCartItems={
    										() => this.props.removeFromCart(item.buy_time)
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
    				totalCartCost={totalCartCost}
    				totalCartDiscount={totalCartDiscount}
    				myCartList={myCartList}
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