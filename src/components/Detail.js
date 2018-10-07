import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

class DetailComponent extends React.Component {
    render() {
        const { InitialData } = this.props;
        const structureData = {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "http://www.example.com",
            "name": InitialData.title,
            "image": InitialData.image
        };

        return (
            <div>
                <Helmet
					title={ InitialData.title }
					script={[
						{ type: "application/ld+json", content: structureData }
					]}
				/>
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

export default withRouter(connect(mapStateToProps, {})(DetailComponent));