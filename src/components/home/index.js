import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getListPackage } from '../actions';
import Header from '../header';
import PackageSlider from '../packages';
import './home.less';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			packagesList: [],
			headerScrollY: 0
		};

		this.handleHeaderOnScroll = this.handleHeaderOnScroll.bind(this);
	}

	componentDidMount() {
		if (!this.props.UserLogin) {
			this.props.history.push('/');
		} else {
			this.props.getListPackage();
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
			packagesList: state.Packages
		});
	}
	
	handleHeaderOnScroll = () => {
		this.setState({ headerScrollY: window.scrollY });
	}

	render() {
		const { headerScrollY } = this.state;

		return (
			<div className={`main__container`}>
				<Header headerScrollY={headerScrollY}/>
				<main id={this.props.id} className={`home__component`}>
					<div
						id={`content__scroller`}
						onScroll={this.handleHeaderOnScroll}
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