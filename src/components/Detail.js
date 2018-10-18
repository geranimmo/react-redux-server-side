import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
    fetchInitialData,
    setInitialData
} from '../actions';

class DetailComponent extends React.Component {
    constructor(props) {
        super(props);

        let datas;
        if (typeof window !== 'undefined') {
            datas = window.__PRELOADED_STATE__;
            delete window.__PRELOADED_STATE__;
        } else {
            datas = props.staticContext.data;
        }
        
        this.state = {
            datas,
            loading: datas ? false : true
        };
        this.fetchingData = this.fetchingData.bind(this);
        
        // this is for testing if the server receive
        // the initial datas for SSR purpose
        // do not do this in production environment
        console.log(datas);
    }

    componentDidMount() {
        const { match, setInitialData } = this.props;
        const { datas } = this.state;
    
        if (!datas) {
            this.fetchingData(match.params);
        } else {
            setInitialData(datas);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource(state) {
        const { match, InitialData } = state;

        if (match.params.id !== InitialData.id) {
            this.fetchingData(match.params);
        } else {
            this.setState({
                datas: InitialData,
                loading: false
            });
        }
    }

    fetchingData(datas) {
        this.props.fetchInitialData(datas);
        this.setState({
            loading: true
        });
    }

    render() {
        const { datas, loading } = this.state;

        if ( loading ) {
            return <h1>LOADING...</h1>;
        }
        
        return (
            <div>
                <Helmet>
                    <title>{ datas.name }</title>
                    <script type="application/ld+json">
                        { JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebSite",
                            "url": "http://www.example.com",
                            "name": `${datas.name}`,
                            "image": `${datas.cover_url}`
                        }) }
                    </script>
                </Helmet>
                <main>
                    <img src={datas.cover_url} alt={datas.name} width="200" height="200"/>
                    <h1>{datas.name}</h1>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps, {
    fetchInitialData,
    setInitialData
})(DetailComponent));