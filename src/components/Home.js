import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class HomeComponent extends React.Component {
    render() {
        const schemaOrg = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "http://www.example.com",
            "name": 'My Title'
        };

        return (
            <div>
                <Helmet>
                    <title>My Title</title>
                    <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
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
}

export default withRouter(connect(mapStateToProps, {})(HomeComponent));