import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../header';
import { CartItem, CartFooter } from '../common';
import { removeFromCart } from '../actions';
import './cart.less';

export class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			myCartList: [],
			totalCartDiscount: 0,
			totalCartCost: 0
		};
	}
    
	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		}
		
		document.addEventListener('scroll', this.handleScroll, true);
	}
    
	componentWillMount() {
		if (this.props.UserLogin) {
			const { ShoppingCart, Packages } = this.props;
			const myCartArr = _.map(ShoppingCart, (item) => {
				return _.merge(item, _.find(Packages, { 'package_id' : item.id }));
			});

			this.setState({ myCartList: myCartArr });

			setTimeout(() => {
				this.populatePromoItems();
				this.populateTotalCost();
			}, 0);
		}
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
	
	removeCartItems = (data) => {
		if (this.props.UserLogin) {
			this.props.removeFromCart(data);

			const updateCartList = this.state.myCartList.filter(e => e.buy_time !== data);

			this.setState({ myCartList: updateCartList });
			
			setTimeout(() => {
				this.populatePromoItems();
				this.populateTotalCost();
			}, 0);
		}
	};

	populateTotalCost() {
		const { myCartList } = this.state;
		let totalCost = 0;
	
		if ( myCartList.length > 0 ) {
			for ( let i = 0; i < myCartList.length; i++ ) {
				totalCost = parseFloat((totalCost + myCartList[i].package_price).toFixed(2));
			}
		}
	
		this.setState({ totalCartCost: totalCost });
	}

	populatePromoItems = () => {
		const { myCartList } = this.state;
		const { client_special } = this.props.Profile;
		let totalDiscount = 0;
	
		if ( client_special.length > 0 ) {
			for ( let i = 0; i < client_special.length; i++ ) {
				let getInCartPromoItems = [];
				
				if ( client_special[i].types === 'free__items' ) {
					// CALCULATE FREE-FOR-SAME-AD
					getInCartPromoItems = filterPromoById(client_special[i].package_id, myCartList);
	
					if (getInCartPromoItems.length > 0) {
						let pricePerItem = getInCartPromoItems[0].package_price;
						let getTotalFreeItems = Math.floor(filterPromoById(client_special[i].package_id, myCartList).length / client_special[i].minimum_items);
						totalDiscount = parseFloat((getTotalFreeItems * pricePerItem).toFixed(2));
					}
				} else if ( client_special[i].types === 'discount__items' ) {
					// CALCULATE DISC-FOR-MIN-BUY
					getInCartPromoItems = filterPromoById(client_special[i].package_id, myCartList);
					
					if (getInCartPromoItems.length >= client_special[i].minimum_items) {
						let discountPrice = client_special[i].discount_price;
						totalDiscount = parseFloat((discountPrice * getInCartPromoItems.length).toFixed(2));
					}
				}
			}
		}
	
		this.setState({ totalCartDiscount: totalDiscount });
	};

	render() {
    	const { myCartList } = this.state;

    	return (
    		<div className={`main__container`}>
    			<Header onCart={true} />
    			<main id={this.props.id} className={`cart__component`}>
    				<div
    					id={`content__scroller`}
    					onScroll={this.handleScroll.bind(this)}
    				>
    					<div className={`cart__empty ${myCartList.length ? 'hidden' : ''}`}>Your Cart Still Empty</div>;
    					{ myCartList.map((item, index) => {
    						return (
								<div key={index}>
									<CartItem
										id={`Cart__${item.id}__${index}__${item.buy_time}`}
										className={`cart__list__wrapper`}
										removeCartItems={this.removeCartItems.bind(this, item.buy_time)}
										item={item}
									/>
								</div>
							);
    					}) }
    				</div>
    			</main>
    			<CartFooter className={`cart__footer`} {...this.state}/>
    		</div>
    	);
	}
}

export const filterPromoById = (id, datas) => {
	return datas.filter(obj => obj.package_id === id);
};

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { removeFromCart })(Cart));