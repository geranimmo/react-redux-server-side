import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getListPackage } from '../actions';
import Header from '../header';
import PackageSlider from '../packages';
import './home.less';

export class Home extends Component {
	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		} else {
			this.props.getListPackage();
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
			packagesList: state.Packages
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
		return (
			<div className={`main__container`}>
				<Header />
				<main id={this.props.id} className={`home__component`}>
					<div
						id={`content__scroller`}
						onScroll={this.handleScroll.bind(this)}
						className={`content__wrapper`}
					>
						<PackageSlider {...this.state} />;
					</div>
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default withRouter(connect(mapStateToProps, { getListPackage })(Home));