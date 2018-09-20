import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import _ from 'lodash';
import { removeFromCart } from '../actions';
import Header from '../header';
import { CartFooter } from '../common';
import './cart.less';

class Cart extends Component {
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
		const { ShoppingCart, Packages } = this.props;

		const myCartArr = _.map(ShoppingCart, (item) => {
			return _.merge(item, _.find(Packages, { 'package_id' : item.id }));
		});

		this.setState({
			myCartList: myCartArr
		});
        
		if (this.props.UserLogin) {
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

    populatePromoItems() {
    	const { client_special } = this.props.Profile;
    	const { myCartList } = this.state;
        
    	if (client_special.length > 0) {
    		let totalDiscount = 0;

    		for ( let i = 0; i < client_special.length; i++ ) {
    			let getInCartPromoItems = [];
                
    			if ( client_special[i].types === 'free__items' ) { // CALCULATE FREE-FOR-SAME-AD
    				getInCartPromoItems = this.filterArrayById(client_special[i].package_id, myCartList);

    				if (getInCartPromoItems.length > 0) {
    					let pricePerItem = getInCartPromoItems[0].package_price;
    					let getTotalFreeItems = Math.floor(this.filterArrayById(client_special[i].package_id, myCartList).length / client_special[i].minimum_items);
    					totalDiscount = parseFloat((getTotalFreeItems * pricePerItem).toFixed(2));
    				}
    			} else if ( client_special[i].types === 'discount__items' ) { // CALCULATE DISC-FOR-MIN-BUY
    				getInCartPromoItems = this.filterArrayById(client_special[i].package_id, myCartList);
                    
    				if (getInCartPromoItems.length >= client_special[i].minimum_items) {
    					let discountPrice = client_special[i].discount_price;
    					totalDiscount = parseFloat((discountPrice * getInCartPromoItems.length).toFixed(2));
    				}
    			}
    		}
            
    		this.setState({
    			totalCartDiscount: totalDiscount
    		});
    	}
    }

    filterArrayById(id, datas) {
    	return datas.filter(obj => obj.package_id === id);
    }

    removeFromCart = (data) => {
    	this.props.removeFromCart(data);
    	this.setState({
    		myCartList: this.state.myCartList.filter(e => e.buy_time !== data)
    	});
        
    	if (this.props.UserLogin) {
    		setTimeout(() => {
    			this.populatePromoItems();
    			this.populateTotalCost();
    		}, 0);
    	}
    };
    
    renderBuyTime(data) {
    	const humanizeDate = new Intl.DateTimeFormat('en-US', {
    		year: 'numeric',
    		month: '2-digit',
    		day: '2-digit',
    		hour: '2-digit',
    		minute: '2-digit',
    		second: '2-digit'
    	}).format(data);
    	return humanizeDate;
    }

    renderTrimDescription(data) {
    	return data.substring(0,80)+'...';
    }

    renderCartCollection() {
    	const { myCartList } = this.state;

    	if ( myCartList.length > 0 ) {
    		return (
    			<div
    				id={`content__scroller`}
    				onScroll={this.handleScroll.bind(this)}
    			>
    				{ myCartList.map((item, idx) => {
    					return (
    						<div
    							key={idx}
    							id={`Cart${item.id}__${idx}__${item.buy_time}}`}
    							className={`cart__list__wrapper`}
    						>
    							<div className={`cart__info__wrapper`}>
    								<div className={`cart__info`}>
    									<h1>
    										{item.package_name}
    										<label className={`info__recommended ${item.package_recommend ? '' : 'hidden'}`}>RECOMMENDED</label>
    									</h1>
    									<h2>{this.renderTrimDescription(item.package_description)}</h2>
    									<span className={`info__datetime`}>
    										{this.renderBuyTime(item.buy_time)}
    									</span>
    									<span className={`info__price`}>${item.package_price}</span>
    								</div>
    							</div>
    							<div
    								className={`cart__delete`}
    								onClick={this.removeFromCart.bind(this, item.buy_time)}
    							>
    								<svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
    									<path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/>
    								</svg>
    							</div>
    						</div>
    					);
    				}) }
    			</div>
    		);
    	}
    	return <div className={`cart__empty`}>Your Cart Still Empty</div>;
    }

    renderCartFooter() {
    	if ( this.state.myCartList.length > 0 ) {
    		return (
    			<CartFooter
    				className={`cart__footer`}
    				{...this.state}
    			/>
    		);
    	}
    	return null;
    }

    render() {
    	return (
    		<div className={`main__container`}>
    			<Header onCart={true} />
    			<main className={`cart__component`}>
    				{ this.renderCartCollection() }
    			</main>
    			{ this.renderCartFooter() }
    		</div>
    	);
    }
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { removeFromCart })(Cart));