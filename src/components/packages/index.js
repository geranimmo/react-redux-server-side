import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Slider from "react-slick";
import { Button } from '../common';
import { addToCart } from '../actions/AddToCart';
import './packages.less';

class PackageSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navSlider: null,
			navContent: null
		};
	}

	componentDidMount() {
		this.setState({
			navSlider: this.sliderNav,
			navContent: this.sliderContent
		});
	}

	initBuyAd(data) {
		const datas = { id: data }; // object required for test case
		this.props.addToCart(datas);
	}

	render() {
		const buttonProps = {
			className: 'button__buy__items',
			value: 'Buy Ad'
		};

		return (
			<div className={`slider__container`}>
				<div className={`slider__nav__wrapper`}>
					<Slider
						asNavFor={this.state.navSlider}
						ref={slider => (this.sliderContent = slider)}
						dots={false}
						arrows={false}
						slidesToShow={3}
						swipeToSlide={true}
						focusOnSelect={true}
					>
						{ this.props.packagesList.map((item, idx) => {
							return (
								<div key={idx} id={`nav${item.package_id}`} className={`slider__card__nav ${item.package_recommend ? 'nav__recommended' : ''}`}>
									<h1 className={`no__margin`}>{item.package_name}</h1>
								</div>
							);
						}) }
					</Slider>
				</div>
				<div className={`slider__content__wrapper`}>
					<Slider
						asNavFor={this.state.navContent}
						ref={slider => (this.sliderNav = slider)}
						dots={false}
						arrows={false}
						slidesToShow={1}
					>
						{ this.props.packagesList.map((item, idx) => {
							return (
								<div key={idx} id={item.package_id} className={`section__carousel`} itemProp="itemListElement" itemScope itemType="http://schema.org/Product">
									<div className={`slider__content`}>
										<div className={`slider__card__body`}>
											<img className={`slider__images`} src={`../../assets/images/${item.package_image}`} alt={item.package_name}/>
											<h2 className={`no__margin__top block width__100`}>
												{item.package_description}
											</h2>
											<span className={`label__info ${item.package_recommend ? '' : 'hidden'}`}>RECOMMENDED</span>
											<span className={`pricing block width__100`}>${item.package_price}</span>
											<Button onClick={this.initBuyAd.bind(this, item.package_id)} {...buttonProps}/>
										</div>
									</div>
								</div>
							);
						}) }
					</Slider>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { addToCart })(PackageSlider));