import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class HomeComponent extends React.Component {
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
    }

    componentWillMount() {
        this.setState({
            InitialData: {
                name: 'HOME | React Redux Server Side Render',
                cover_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFzbVT9vuJj7b1LZbFBsQue6yaG8U4LrEg2fAr6T8KzivlYb4'
            },
            loading: false
        });
    }

    render() {
        const { InitialData, loading } = this.state;

        if ( loading ) {
            return <h1>LOADING...</h1>;
        }
        
        return (
            <div>
                <Helmet>
                    <title>{ InitialData.name }</title>
                    <script type="application/ld+json">
                        { JSON.stringify({
                            "@context": "http://schema.org",
                            "@type": "WebSite",
                            "url": "http://www.example.com",
                            "name": `${InitialData.name}`,
                            "image": `${InitialData.cover_url}`
                        }) }
                    </script>
                </Helmet>
                <main>
                    <h1>Home Page is Open</h1>
                </main>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps, {})(HomeComponent));