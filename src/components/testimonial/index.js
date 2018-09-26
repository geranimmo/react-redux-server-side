import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Slider from "react-slick";
import { TestimonialCard } from '../common';
import './testimonial.less';

class TestimonialSlider extends Component {
	render() {
		return (
			<div className={`testimonial__container`}>
				<div className={`testimonial__wrapper`}>
					<div className={`section__title`}>Testimonials</div>
					<div className={`testimonial__content__wrapper`}>
						<Slider
							infinite={false}
							dots={false}
							arrows={false}
							slidesToShow={1}
							adaptiveHeight={true}
						>
							{ this.props.testimonialList.map((item, index) => {
								return (
									<TestimonialCard
										key={index}
										className={`testimonial__list`}
									>
										<div className={`info__user`}>
											<div className={`user__photo`}>
												<img src={item.user_photo} alt={item.user_name}/>
											</div>
											<div className={`user__description`}>
												<span className={`user__name`}>
													{item.user_name}
												</span>
												<span className={`company__name`}>
													{item.company_name}
												</span>
											</div>
											<div className={`user_testimonial`}>
												<h1>{item.testimonial_title}</h1>
												<h2>{item.testimonial_description}</h2>
											</div>
										</div>
									</TestimonialCard>
								);
							}) }
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, {})(TestimonialSlider));