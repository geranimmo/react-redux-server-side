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
			totalCartDiscount: 0,
			headerScrollY: 0
		};

		this.handleHeaderOnScroll = this.handleHeaderOnScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleHeaderOnScroll);
	}

	componentWillMount() {
		this.props.getTotalCost();
		this.props.getTotalDiscount();
		this.createDataSource(this.props);
		window.addEventListener('scroll', this.handleHeaderOnScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleHeaderOnScroll);
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
    
    handleHeaderOnScroll = () => {
    	this.setState({ headerScrollY: window.scrollY });
    };

    render() {
    	const {
    		myCartList,
    		totalCartDiscount,
    		totalCartCost,
    		headerScrollY
    	} = this.state;

    	return (
    		<div className={`main__container`}>
    			<Header
    				headerScrollY={headerScrollY}
    				onCart={true}
    			/>
    			<main id={this.props.id} className={`cart__component`}>
    				<div
    					id={`content__scroller`}
    					onScroll={this.handleHeaderOnScroll}
    				>
    					<div className={`cart__empty ${myCartList.length ? 'hidden' : ''}`}>Your Cart Still Empty</div>
    					{ myCartList.map((item, index) => {
    						return (
    							<div
    								key={index}
    								className={`wrapper__list list__${index}`}
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