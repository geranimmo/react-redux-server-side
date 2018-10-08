import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchInitialData } from '../actions';

class DetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'DETAIL | React Redux Server Side',
            image: null
        };
    }
    componentDidMount() {
        const { fetchInitialData, match } = this.props;
        fetchInitialData(match.params);
    }

    componentWillMount() {
        this.createDateSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDateSource(nextProps);
    }

    createDateSource(state) {
        const { InitialData } = state;
        this.setState({
            title: InitialData.reward_name,
            image: InitialData.reward_picture
        });
    }

    render() {
        const { title, image } = this.state;
        const schemaOrg = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "http://www.example.com",
            "name": title,
            "image": image
        };

        return (
            <div>
                <Helmet>
                    <title>{ title }</title>
                    <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
                </Helmet>
                <main>
                    <h1>Detail Page is Open</h1>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps, { fetchInitialData })(DetailComponent));