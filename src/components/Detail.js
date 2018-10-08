import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchInitialData } from '../actions';

class DetailComponent extends React.Component {
    constructor(props) {
        super(props);

        let InitialData;
        if (typeof window !== 'undefined') {
            InitialData = window.__PRELOADED_STATE__;
            delete window.__PRELOADED_STATE__;
        } else {
            InitialData = props.staticContext.data;
        }

        this.state = {
            InitialData,
            loading: InitialData ? false : true
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        if (!this.state.InitialData) {
            this.fetchData(this.props.match.params);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDateSource(nextProps);
    }

    createDateSource(state) {
        const { InitialData } = state;
        this.setState({
            InitialData,
            loading: false
        });
        
    }

    fetchData(params) {
        this.setState({
            loading: true
        });

        this.props.fetchInitialData(params);
    }

    render() {
        const { InitialData, loading } = this.state;

        if ( loading ) {
            return <h1>LOADING...</h1>;
        }
        
        return (
            <div>
                <Helmet>
                    <title>{ InitialData.reward_name }</title>
                    <script type="application/ld+json">
                        { JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebSite",
                            "url": "http://www.example.com",
                            "name": `${InitialData.reward_name}`,
                            "image": `${InitialData.reward_picture}`
                        }) }
                    </script>
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