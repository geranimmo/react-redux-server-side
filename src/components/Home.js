import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class HomeComponent extends React.Component {
    render() {
        const structureData = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "http://www.example.com",
            "name": 'My Title'
        };

        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <Helmet
					title={ 'My Title' }
					script={[
						{ type: "application/ld+json", content: structureData }
					]}
				/>
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