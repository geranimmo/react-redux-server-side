import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {
	getListPackage,
	getListTestimonial
} from '../actions';
import Header from '../header';
import PackageSlider from '../packages';
import TestimonialSlider from '../testimonial';
import './home.less';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packagesList: [],
			testimonialList: [],
			headerScrollY: 0
		};

		this.handleHeaderOnScroll = this.handleHeaderOnScroll.bind(this);
	}

	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		} else {
			this.props.getListPackage();
			this.props.getListTestimonial();
		}
		
		window.addEventListener('scroll', this.handleHeaderOnScroll);
	}

	componentWillMount() {
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
			packagesList: state.Packages,
			testimonialList: state.Testimonials
		});
	}
	
	handleHeaderOnScroll = () => {
		this.setState({ headerScrollY: window.scrollY });
	}

	render() {
		const {
			packagesList,
			testimonialList,
			headerScrollY
		} = this.state;

		return (
			<div className={`main__container`}>
				<Header headerScrollY={headerScrollY}/>
				<main
					id={this.props.id}
					className={`home__component`}
					onScroll={this.handleHeaderOnScroll}
				>
					<div className={`content__wrapper`}>
						<PackageSlider packagesList={packagesList} />
					</div>
					<TestimonialSlider testimonialList={testimonialList}/>
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, {
	getListPackage,
	getListTestimonial
})(Home));